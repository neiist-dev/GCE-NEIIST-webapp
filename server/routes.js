const path = require('path');
const companyRoutes = require('./routes/company-routes');
const usersRoutes = require('./routes/user-routes');
const studentRoutes = require('./routes/student-routes');
const professorRoutes = require('./routes/professor-routes');
const adminRoutes = require('./routes/admin-routes');
const matchMakingRoutes = require('./routes/match-making-routes');
const generalRoutes = require('./routes/general-routes');

module.exports = function(app, baseDir) {

    app.use('/users', usersRoutes);
    app.use('/student', studentRoutes);
    app.use('/professor', professorRoutes);
    app.use('/company', companyRoutes);
    app.use('/admin', adminRoutes);
    app.use('/match', matchMakingRoutes);
    app.use('/gce', generalRoutes);

    /***********************************************************************************************
     * MAIN
     */
    const staticRoot = path.resolve(__dirname, '../public');
    app.get('/*', function(req, res) {
        res.sendFile('index.html', { root: staticRoot });   // load the single view file (angular will handle the page changes on the front-end)
    });

};