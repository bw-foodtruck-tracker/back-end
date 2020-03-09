const loginRouter = require('./login-router.js');
const supertest = require('supertest');

describe.skip('login model', () => {
    it('token is being passed', async () => {
        beforeAll(done => {
          supertest(loginRouter)
            .post('/api/auth/login/')
            .send({
              username: "matheew",
              password: "Herman16&"
            })
            .end((err, res) => {
              token = res.body.token,
              done();
            })
        }) 
    })
    
    
})