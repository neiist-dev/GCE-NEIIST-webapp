const express = require('express');
const router = express.Router();
const UtilsRoutes = require('./utils-routes');
const multer = require('multer');
const ba_logger = require('../log/ba_logger');
const Utils = require('../mongodb/accesses/utils-accesses');
const passport = require('passport');
const DBAccess = require('../mongodb/accesses/mongo-access');
const ERROR = "Não foi possível concluir o registo. Contacte a administração.";

//If you wish to save signups as a file
const fs = require('fs');
const path = require('path');


//Others, related with student
router.post('/signupHashCode', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    //Not needed now,Admin only

    if(!UtilsRoutes.roleIs(req,'Admin'))    {
        UtilsRoutes.replyFailure(res,"","Fechado");
        return;
    }

    const teamName = req.body.signup.teamName;
    const teamCaptain = req.body.signup.teamCaptain;
    const teamContactEmail = req.body.signup.teamContactEmail;
    const teamContactPhone = req.body.signup.teamContactPhone;
    const newsletter = req.body.signup.newsletter;
    const participantsNumber = req.body.signup.participantsNumber;
    //const nomeAluno = req.user.name;
    const emailAluno = req.user.email;

    DBAccess.signup.addPreSignup(teamName, teamCaptain,teamContactEmail,
                                teamContactPhone,participantsNumber,newsletter,emailAluno,  (err) => {
        if (err)  {
            console.log(err);
            return UtilsRoutes.replyFailure(res,err,ERROR);
        }  else {
            ba_logger.ba("BA|"+ "GHC|" + emailAluno + "|" + participantsNumber + "|" + new Date().toJSON().slice(0,16).replace(/-/g,'/')+ "h");
            return UtilsRoutes.replySuccess(res,"","");
        }
    });



    /* Save as a file
    fileContent =
        "[EQUIPA]:" + teamName + "\n" +
        "[RESPONSÁVEL]:" + teamCaptain + "\n" +
        "[EMAIL]:" + teamContactEmail + "\n" +
        "[TELEMÓVEL]:" + teamContactPhone + "\n" +
        "[NEWSLETTER]:" + newsletter + "\n" +
        "[PARTICIPANTES]:" + participantsNumber + "\n" +
        "[QUANDO]:" + Utils.time + "\n\n" +
        "=================" +  "\n" +
        "=DADOS DE QUEM FEZ A INSCRIÇÃO=" + "\n" +
        "[NOME]:"  + nomeAluno + "\n" +
        "[EMAIL]:" + emailAluno;



    const filePath = '../files/GoogleHashCode/' + emailAluno + " [" + Date.now() + "].txt";

    fs.writeFile(path.join(__dirname, filePath), fileContent, function (err) {
        if (err) {
            console.log(err);
            return UtilsRoutes.replyFailure(res, err, "Não foi possível enviar completar a inscrição. Contacte a administração");
        }
        ba_logger.ba("Nova Pré-Inscrição:" + teamCaptain + ":" + Utils.utc);
        UtilsRoutes.replySuccess(res, "", "Inscrição efetuado com sucesso");
    });
    */

});

//To pre-signup Google Hash Code
router.post('/saveCVHashCode', passport.authenticate('jwt', {session: false}), function (req, res) {
    //TODO Add auth headers on front-end
    if(!UtilsRoutes.roleIs(req,'Student'))    {
        UtilsRoutes.replyFailure(res,"","Só os estudantes podem inscrever-se");
        return;
    }

    //TODO Allow this possibility, when it is time
    return false;
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname.replace('routes', '') + '/files/GoogleHashCode/CV');
        },
        filename: function (req, file, cb) {
            if(!file.originalname.match(/\.(pdf)$/))    {
                let error = new Error();
                error.code = "filetype";
                return cb(error);
            } else {
                //The original file name is overrriden. (file.originalname)
                cb(null, "CV_" + Date.now() + "_" + file.originalname);
            }
        }
    });

    //CV is the name of the file model name in the front end
    //Filesize limit is 2mb
    var upload = multer({
        storage: storage,
        limits: { fileSize: 2000000 }
    }).single('file');

    upload(req, res, function (err) {

        if (err)    {
            console.log(err);
            if (err.code === "LIMIT_FILE_SIZE") {
                UtilsRoutes.replyFailure(res,"", 'O CV tem de ser menor que 2MB. Faça upload novamente.');
            } else if (err.code === 'filetype') {
                UtilsRoutes.replyFailure(res,"", 'O CV tem de ser do tipo PDF. Faça upload novamente.');
            } else  {
                UtilsRoutes.replyFailure(res,"", 'O ficheiro não pode ser enviado. Contacte a administração');
            }

        } else {
            console.log(req.file);
            if(!req.file)   {
                UtilsRoutes.replyFailure(res,"", 'Ocorreu um erro interno. Contacte a administração');
            } else  {
                UtilsRoutes.replySuccess(res,"", 'O seu CV foi guardado com sucesso. Obrigado!');
                ba_logger.ba("GoogleHashCode:CV_" + req.file.originalname);
            }
        }
    });
});

module.exports = router;