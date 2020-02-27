const router = require('express').Router();

const dinerAuthRouter = require('../auth/diner-auth-router.js');
const operatorAuthRouter = require('../auth/operator-auth-router.js');
const loginAuthRouter = require('../auth/login-router.js');


router.use('/auth/operator', operatorAuthRouter);
router.use('/auth/diner', dinerAuthRouter);
router.use('/auth/login', loginAuthRouter);


router.get('/', (req,res) => {
    res.send(`<h2>Server ON</h2>`)
});

module.exports = router;