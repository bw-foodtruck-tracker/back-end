const router = require('express').Router();

const dinerAuthRouter = require('../auth/diner-auth-router.js');
const operatorAuthRouter = require('../auth/operator-auth-router.js');


router.use('/auth/operator', operatorAuthRouter);
router.use('/auth/diner', dinerAuthRouter);


router.get('/', (req,res) => {
    res.json({api: 'working'})
});

module.exports = router;