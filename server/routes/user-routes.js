const DBAccess = require('./../mongodb/accesses/mongo-access');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dbConfig = require('../../config/db');
const Utils = require('../mongodb/accesses/utils-accesses');
const UtilsRoutes = require('../routes/utils-routes');
const ba_logger = require('../log/ba_logger');
const fs = require('fs');
const path = require('path');


const USER_NOT_FOUND = "Utilizador não encontrado.";
const WRONG_PASSWORD_PART_1 = "Password errada. Tem ";
const WRONG_PASSWORD_PART_2 = " tentativas restantes.";
const WRONG_PASSWORD_INVALIDATE = "Errou todas as tentativas. A sua conta encontra-se invalidada. Por favor contacte a administração";
const USER_INVALID = "A sua conta está invalidada. Por favor contacte a administração";
const USER_UNCONFIRMED = "A sua conta está por confirmar. Por favor contacte a administração, para que se proceda à ativação da conta";

router.post('/login', (req, res, next) => {
    const email = req.body.username;
    const password = req.body.password;
    DBAccess.users.getUserByEmail(email, (err, user) => {
        if (err) {
            throw err;
        }
        if (!user) {
            return UtilsRoutes.replyFailure(res, err, USER_NOT_FOUND);
        }

        if(user.validation === "confirmed") {
            Utils.comparePassword(password, user.password, (err, isMatch) => {
                if (err) {
                    throw err;
                } else if (!isMatch) {
                    remaining_attempts = user.remaining_attempts - 1;
                    if (remaining_attempts === 0) {
                        DBAccess.companies.invalidateCompany(email,(err,user) =>{
                            if (err)    {
                                throw(err);
                            }
                            return UtilsRoutes.replyFailure(res,err,WRONG_PASSWORD_INVALIDATE);
                        });
                    } else  {
                        //decrementar tentativas e notificar user
                        DBAccess.companies.decrementAttempts(email,(err,user) =>{
                            if (err)    {
                                throw(err);
                            }
                            return UtilsRoutes.replyFailure(res,err,WRONG_PASSWORD_PART_1 + user.remaining_attempts + WRONG_PASSWORD_PART_2);
                        });
                    }

                } else {
                    DBAccess.companies.resetAttempts(email,(err,user) =>{
                        if (err)    {
                            throw(err);
                        }
                    });
                    const token = jwt.sign(user, dbConfig.DB_SECRET, {
                        expiresIn: 3600
                    });

                    const TYPE = user.__t;
                    let data =    {
                        success: true,
                        token: 'bearer ' + token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            type: user.__t
                        },
                        type: TYPE
                    };

                    if (TYPE === "Company")  {
                        data.user.location = user.location;
                        data.user.description = user.description;
                        data.user.contact = user.contact;
                    }   else if (TYPE === "Professor")    {
                        //Add corresponding remaining fields
                    }   else {
                        return UtilsRoutes.replyFailure(res, err, "Wrong entity type");
                    }

                    //logger.warn("Login: "+ data.user.type + "," + data.user.name + ", logged in at " + Utils.utc);
                    ba_logger.ba("Login:" + data.user.type + ":" + data.user.name);
                    UtilsRoutes.replySuccess(res, data, "Logged in");
                }

            });
        }
        else if (user.validation === "invalid")  {
            ba_logger.admin("Login:Invalidated user:" + user.name + "tried to login:");
            return UtilsRoutes.replyFailure(res, err, USER_INVALID);
        } else if (user.validation === "unconfirmed")   {
            ba_logger.admin("Login:Unconfirmed user:" + user.name + ":tried to login:");
            return UtilsRoutes.replyFailure(res, err, USER_UNCONFIRMED);
        }

    });
});

router.post('/feedback', (req, res, next) => {

    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const rate = req.body.rate;
    const entity = req.body.entity;
    const type = req.body.type;

    fileContent =   "[TYPE]:" + type + "\n" +
                    "[RATE]:" + rate + "\n" +
                    "[NOME]:" + name + "\n" + "[EMAIL]:" + email + "\n" +
                    "[ENTITY]:" + entity + "\n" +
                    "[MENSAGEM]:" + message + "\n";

    const filePath = '../files/Feedback/' + "Feedback-" + name + "-" + Date.now() + ".txt";

    fs.writeFile(path.join(__dirname, filePath), fileContent, function (err) {
        if (err) {
            return UtilsRoutes.replyFailure(res, err, "Não foi possível enviar o feedback. Contacte a administração");
        }
        ba_logger.ba("Feedback:" + email + ":Gave Feedback:" + Utils.utc);
        UtilsRoutes.replySuccess(res, "", "Feedback foi enviado com sucesso");
    });

});

module.exports = router;