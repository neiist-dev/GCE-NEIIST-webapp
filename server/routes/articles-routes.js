const articlesServices = require('../services/articles-services');
const express = require('express');
const router = express.Router();
const ba_logger = require('../log/ba_logger');
const passport = require('passport');
const UtilsRoutes = require('./utils-routes');


router.get('/getArticles/'/*, passport.authenticate('jwt', {session: false})*/, async (req, res) => {

    try {
        const articles = await articlesServices.getArticles();
        let responseData = {};
        responseData.number = articles.length;
        responseData.articles = articles;
        UtilsRoutes.replySuccess(res, responseData, "Articles from Medium");
    } catch (e) {
        ba_logger.ba("BA|GET_ARTICLES|ERROR");
        UtilsRoutes.replyFailure(res,e,"Error at get articles");
        throw new Error(e);
    }
});

module.exports = router;