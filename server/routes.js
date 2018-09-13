const path = require('path');
const usersRoutes = require('./routes/user-routes');
const studentRoutes = require('./routes/student-routes');
const thesisRoutes = require('./routes/thesis-routes');
const adminRoutes = require('./routes/admin-routes');
const generalRoutes = require('./routes/events');

module.exports = (app) => {

    app.use('/users', usersRoutes);
    app.use('/student', studentRoutes);
    app.use('/admin', adminRoutes);
    app.use('/gce', generalRoutes);
    app.use('/thesis', thesisRoutes);

    /***********************************************************************************************
     * MAIN
     */
    const staticRoot = path.resolve(__dirname, '../public');
    app.get('/*', function(req, res) {
        res.sendFile('index.html', { root: staticRoot });   // load the single view file (angular will handle the page changes on the front-end)
    });

};