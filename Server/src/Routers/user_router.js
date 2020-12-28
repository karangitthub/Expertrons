const express = require('express');
const router = express.Router()
const user_model = require('../Models/user_model');

router.post('/', async(req,res) => {
    console.log('Login request received');
    console.log('Email:',req.body.email);
    console.log('Password:',req.body.password);
    if(req.body.email != undefined && req.body.password != undefined){
        try {
                user_model.findOne({email: req.body.email},function(err, user) {
                if (user != undefined && user.password == req.body.password) {
                    res.status(200).send('Success');
                } else {
                    res.status(204).send('Failed');
                }
              });
       } catch (error) {
           res.send('Error :' + error);
       }
    } else{
        res.send('Error : Username or Password is not provided.');
    }
    
});



module.exports = router;