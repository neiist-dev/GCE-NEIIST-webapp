const DBAccess = require('./../mongodb/accesses/mongo-access');
const Utils = require('../mongodb/accesses/utils-accesses');
const UtilsRoutes = require('../routes/utils-routes');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const ba_logger = require('../log/ba_logger');

const COMP_ADDED = "Company added";
const NOT_COMP = "Not a company";
const DUP_ENTRY = "Company already exists";
const ERROR = "An error concerning DB has occurred.";
const COMPANY_UPDATED = "Company has been updated.";

router.post('/register', function (req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let description = req.body.description;
    let location = req.body.location;
    let contact = req.body.contact;

    DBAccess.companies.addCompany(name, email, password, description,location,contact, (err, addedCompany) => {
        if (err)  {
            if (err.name === 'MongoError' && err.code === 11000)    {
                //Duplicated username or contact
                return UtilsRoutes.replyFailure(res,err,DUP_ENTRY);
            } else  {
                return UtilsRoutes.replyFailure(res,err,ERROR);
            }
        }  else {
            ba_logger.ba("Company:"+ name + ":" + "registered");
            return UtilsRoutes.replySuccess(res,addedCompany,COMP_ADDED);
        }
    });
});

router.put('/update/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    //TODO Do again
    //link has to be /update?id=... to the company info to be updated.
    //Better would be having /company/NAME/update   /company/NAME/proposals/NAME_P/update
    let name = req.body.name;
    let description = req.body.description;
    let location = req.body.location;
    let contact = req.body.contact;
    //let id = req.query.id; //
    let id = req.params.id;
    DBAccess.companies.updateCompany(id, name,description,location,contact,  (err, changedCompany) => {
        if (err)  {
            return UtilsRoutes.replyFailure(res,err,ERROR);
        }  else {
            return UtilsRoutes.replySuccess(res,changedCompany,COMPANY_UPDATED);
        }
    });
});

router.get('/numberOfProposals', /*passport.authenticate('jwt', {session: false}),*/ (req, res, next) => {
    DBAccess.proposals.getNumberOfProposals((err, number) => {
        if (err) {
            return UtilsRoutes.replyFailure(res,err,ERROR);
        } else {
            return UtilsRoutes.replySuccess(res,number,"");
        }
    });
});

router.get('/numberOfCompanies', /*passport.authenticate('jwt', {session: false}),*/ (req, res, next) => {
    DBAccess.companies.getNumberOfCompanies((err, number) => {
        if (err) {
            return UtilsRoutes.replyFailure(res,err,ERROR);
        } else {
            return UtilsRoutes.replySuccess(res,number,"");
        }
    });
});

router.get('/companyNames', /*passport.authenticate('jwt', {session: false}),*/ (req, res, next) => {
    DBAccess.companies.getCompanyNames((err, number) => {
        if (err) {
            return UtilsRoutes.replyFailure(res,err,ERROR);
        } else {
            return UtilsRoutes.replySuccess(res,number,"");
        }
    });
});

router.get('/allProposals', passport.authenticate('jwt', {session: false}), (req, res, next) => {
                DBAccess.proposals.getAllProposals((err, proposals) => {
                    if (err) {
                        throw(err);
                        return UtilsRoutes.replyFailure(res, err, ERROR);
                    } else {
                        return UtilsRoutes.replySuccess(res, proposals, "Proposals");
                    }
                });
            /*}   else    {
            return UtilsRoutes.replyFailure(res, NOT_COMP, "");
        }*/
});

router.get('/proposals', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    if(!UtilsRoutes.roleIs(req,'Company'))    {
        return UtilsRoutes.replyFailure(res, NOT_COMP, "");
    }
    const name = req.user.name;
    DBAccess.proposals.getProposalsByCompanyName(name, (err, proposals) => {
        if (err) {
            return UtilsRoutes.replyFailure(res,err,ERROR);
        } else {
            return UtilsRoutes.replySuccess(res,proposals,"Proposals");
        }
    });
});

router.put('/addProposal', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    UtilsRoutes.requireRole(req, res, 'Company');

    // let company = mongoose.Types.ObjectId(req.body.company); // we can't use this because it seems to generate a unique ObjectId
    let company = req.body.company;
    let description = req.body.description;
    let requirements = req.body.requirements;
    let date_beginning = req.body.date_beginning;
    let date_end = req.body.date_end ;
    let salary = req.body.salary;
    let observations = req.body.observations;
    let vacancies = req.body.vacancies;
    let link = req.body.link;
    let status = req.body.status;

    DBAccess.proposals.addProposal(company, description, requirements, date_beginning, date_end,
                                    salary, observations, vacancies, link, status, new Date(), (err, proposal) => {
          if (err) {
              throw(err);
              return UtilsRoutes.replyFailure(res,err,ERROR);
          } else {
              ba_logger.ba("Company:"+ company + ":" + "added a proposal");
              return UtilsRoutes.replySuccess(res,proposal,"");
          }
      });
});

router.put('/proposals/update', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    UtilsRoutes.requireRole(req, res, 'Company');
    //TODO Do again
    let id = req.body._id;
    let description = req.body.description;
    let requirements = req.body.requirements;
    let date_beginning = req.body.date_beginning;
    let date_end = req.body.date_end ;
    let salary = req.body.salary;
    let observations = req.body.observations;
    let vacancies = req.body.vacancies;
    let link = req.body.link;
    let lastModifiedDate = new Date();

    DBAccess.proposals.updateProposal(id, description, requirements,
        date_beginning, date_end, salary, observations, vacancies,
        link, lastModifiedDate, (err, updatedProposal) => {
        if (err) {
            return UtilsRoutes.replyFailure(res,err);
        } else {
            return UtilsRoutes.replySuccess(res,updatedProposal);
        }
    });
});

router.put('/proposals/delete', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    UtilsRoutes.requireRole(req, res, 'Company');

    let id = req.query.id;
    DBAccess.proposals.invalidateProposal(id, (err, updatedProposal) => {
        if (err) {
            return UtilsRoutes.replyFailure(res,err);
        } else {
            return UtilsRoutes.replySuccess(res,updatedProposal);
        }
    });
});

module.exports = router;