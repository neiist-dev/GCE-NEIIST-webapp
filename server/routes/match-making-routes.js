const express = require('express');
const router = express.Router();

const DBAccess = require('./../mongodb/accesses/mongo-access');
const Utils = require('../mongodb/accesses/utils-accesses');
const UtilsRoutes = require('../routes/utils-routes');

const mongoose = require('mongoose');
const passport = require('passport');
let onlyCompany = [];


router.post('/newThesisProposal', passport.authenticate('jwt',{session:false}), (req,res,next) => {
});


module.exports = router;