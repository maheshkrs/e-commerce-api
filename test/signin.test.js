
var expect = require('chai').expect;
const chai = require('chai');
var request = require('request');
const app = require('../dbconnection');
const chaiHttp = require('chai-http')
const assert = require('assert');
chai.use(chaiHttp)
const server = require('../dbconnection');
const { log } = require('console');

describe('Signin', () => {
    it('signin user success', (done) => {
        const data = {
            "user": "admin@zerozilla.com",
            "password": "Admin@123"
        }
        chai.request(app).post('http://192.81.213.186:3001/auth/login').send(data).end((err, res) => {
            console.log("response",res);
            console.log("error", err);
            // expect(res.s).to.equal(200);
        })
        done()
    });
    // it('signin user returns if password wrong', (done) => {    testing 
    //     const data = {
    //         "username": "rashmi",
    //         "userpassword": "123433"
    //     };
    //     chai.request(app).post('/api/v1/users/signin').send(data).end((err, res) => {
    //         expect(res.statusCode).to.equal(401);
    //     })
    //     done()
    // });
    // it('signin user returns user doesnot exist', (done) => {
    //     const data = {
    //         "username": "maheshkkkkk",
    //         "userpassword": "1234"
    //     };
    //     chai.request(app).post('/api/v1/users/signin').send(data).end((err, res) => {
    //         expect(res.statusCode).to.equal(404);
    //     })
    //     done()
    // });
});


// describe('Signin', () => {
//     it('signin user returns if password wrong', (done) => {
//         const data = {
//             "username": "rashmi",
//             "userpassword": "123433"
//         };
//         chai.request(app).post('/api/v1/users/signin').send(data).end((err, res) => {
//             expect(res.statusCode).to.equal(401);
//         })
//         done()
//     });
// });


