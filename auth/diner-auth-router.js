const router = require('express').Router();

const bcrypt = require('bcryptjs');

const Users = require('../diners/diners-model');


router.post('/register', validateUserInfo, checkForUsername, checkPassword, checkEmail, (req, res) => {
    const user = req.body;

    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    
    Users.add(user)
        .then(user => {
            // const token = genToken(user);
            res.status(201).json({user: user});
        })
        .catch(err => {
            res.status(500).json(err.message);
        })
        
});



/// Check for Username


function checkForUsername(req, res, next) {
    let { username } = req.body;
    Users.findBy({username})
        .first()
        .then(item => {
            if(item) {
                res.status(400).json({error: "username already exists"})
            } else {
                next();
            }
    })    
}

/// Validate UserInfo

function validateUserInfo(req, res, next) {
    const postData = req.body;
    if(postData.username === "") {
        res.status(400).json({ message: "username can not be empty" });
    }  else if (!postData.password && !postData.email) {
        res.status(400).json({ message: 'missing password and email field'})
    } else if (!postData.email) {
        res.status(400).json({ message: 'missing email field'})
    } else if (!postData.password){
        res.status(400).json({ message: 'missing password field'})
    } else {
        next();
    }
}

/// Check Secure Password

function checkPassword(req, res, next) { 

    let { password } = req.body;
    const secureCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/;
        if(password.match(secureCheck)) { 
            next()
        } else { 
            res.status(400).json({ message: 'please enter a correct password'})
        }
} 

/// Check Valid Email

function checkEmail(req, res, next) {
    let {email} = req.body;
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(email.match(emailFormat)) {
        next()
    } else {
        res.status(400).json({ message: 'please enter a correct email address'})
    }
}


module.exports = router;