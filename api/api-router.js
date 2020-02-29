const router = require('express').Router();

const dinerAuthRouter = require('../auth/diner-auth-router.js');
const operatorAuthRouter = require('../auth/operator-auth-router.js');
const loginAuthRouter = require('../auth/login-router.js');
const operatorRouter = require('../operators/operators-router.js');
const dinerRouter = require('../diners/diners-router.js');


router.use('/auth/operator', operatorAuthRouter);
router.use('/auth/diner', dinerAuthRouter);
router.use('/auth/login', loginAuthRouter);

router.use('/operator', operatorRouter)
router.use('/diner', dinerRouter)




module.exports = router;