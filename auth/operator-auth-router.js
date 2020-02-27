const router = require('express').Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const Users = require('../operators/operators-model');

const secrets = require('../config/secrets.js');

router.post('/register', validateUserInfo, checkForUsername, checkPassword, (req, res) => {

    
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

router.post('/login', validateLogin, (req,res) => {
    let { username, password} = req.body;

    Users.findBy({username})
        .first()
        .then(user => {
            console.log(user)
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = genToken(user);
                res.status(200).json({username: user.username, token: token})
            } else {
                res.status(401).json({message: "Invalid credentials"})
            }
        })
        .catch( err=> {
            res.status(500).json(err)
        })
})



/// Helper function

function genToken(user) {
    const payload = {
        userid: user.id,
        username: user.username
    }

    const options = { expiresIn: '1h' };
    const token = jwt.sign(payload, secrets.jwtSecret, options);

  return token;
}

/// Validate User

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

function checkPassword(req, res, next) { 

    let { password } = req.body;
    var secureCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/;
        if(password.match(secureCheck)) { 
            next()
        } else { 
            res.status(400).json({ message: 'please enter a correct password'})
        }
} 

function validateLogin(req, res, next) {
    const postData = req.body;
    if(!postData) {
        res.status(400).json({ message: "missing user data" });
      } else if (!postData.username) {
        res.status(400).json({ message: 'missing username field'})
      } else if (!postData.password) {
          res.status(400).json({ message: 'missing password field'})
      } else {
        next();
      }
}

module.exports = router;