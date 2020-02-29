const router = require('express').Router();

const Operators = require('./operators-model');

const restricted = require('../auth/restricted-middleware.js');
const checkRole = require('../auth/check-role-middleware-operator.js');



router.get('/:id', restricted, checkRole(), (req,res) => {
    
    Operators.findById(req.params.id)
        .then(operator => {
            res.status(201).json(operator)
        })
        .catch(err => {
            res.status(500).json({error: "the operator could not be retrieved"})
        })
})

module.exports = router;
