const path = require('path');
const studentRoutes = require('./routes/student-routes');
const thesesRoutes = require('./routes/theses-routes');
const adminRoutes = require('./routes/admin-routes');
//const chatbotRoutes = require('./routes/chatbot-routes');
const ivRoutes = require('./routes/articles-routes');


module.exports = (app) => {

    app.use('/student', studentRoutes);
    app.use('/admin', adminRoutes);
    app.use('/theses', thesesRoutes);
    //app.use('/chatbot', chatbotRoutes);
    app.use('/articles', ivRoutes);

    /***********************************************************************************************
     * MAIN
     */
    const staticRoot = path.resolve(__dirname, '../public');
    app.get('/*', function(req, res) {
        res.sendFile('index.html', { root: staticRoot });   // load the single view file (angular will handle the page changes on the front-end)
    });

};