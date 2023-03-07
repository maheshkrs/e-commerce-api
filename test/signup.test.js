
var expect = require('chai').expect;
const chai = require('chai');
var request = require('request');
const app = require('../dbconnection');
const chaiHttp = require('chai-http')
const assert = require('assert');
chai.use(chaiHttp)
const server = require('../dbconnection');
const { log } = require('console');

// describe('Signup', () => {
//     it('signup user success', (done) => {
//       const data = {
//              "username": "rashmi",
//               "userpassword": "1234"
//         };
//       chai.request(app).post('/api/v1/users/signup').send(data).end((err, res) => {
         
//            expect(res.statusCode).to.equal(200);
//         })
//         done()
//      });

   


// });

// describe('Signup user exists', () => {
//     it('should return 409 User exists', (done) => {
//         const data = {
//             "username": "Mahesh",
//             "userpassword": "1234"
//         };
//         chai.request(app).post('/api/v1/users/signup').send(data).end((err, res) => {
//            expect(res.statusCode).to.be.equal(409);
//             done();
//         })
//     });


// });

