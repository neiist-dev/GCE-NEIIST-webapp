const sinon = require('sinon');
const chai = require('chai');
const expect = require('chai').expect;
const assert = require('chai').assert;

const studentRoutes = require('../routes/student-routes');

let req = {
    body: {},
};

let res = {
    sendCalledWith: '',
    send: function(arg) {
        this.sendCalledWith = arg;
    }
};



describe('Students route', () => {
    it('Teacher should be able to login', () => {
    });

});