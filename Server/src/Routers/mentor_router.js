const express = require('express');
const router = express.Router()
const mentor_model = require('../Models/mentor_model');

router.get('/', async(req,res) => {
    try {
         console.log('Fetch all mentors');
         const mentors = await mentor_model.find();
         res.json(mentors);
    } catch (error) {
        res.send('Error :' + error);
    }
});

router.get('/:id', async(req,res) => {
    try {
         console.log('Fetch single mentor');
         const mentor = await mentor_model.findOne({email : req.params.id});
         res.json(mentor);
    } catch (error) {
        res.send('Error :' + error);
    }
});

router.post('/', async(req,res) => {
    try {
    var mentor = await mentor_model.findOne({email : req.body.email});
    if(mentor == null){
        mentor = new mentor_model({
            name: req.body.name,
            email: req.body.email,
            tasks: req.body.tasks
        });
        const mentor_resp = await mentor.save();
        res.json(mentor_resp);
    }else{
        res.status(204).send();
    }
    } catch (error) {
        res.send('Error :' + error);
    }
});

router.delete('/:id', async(req,res) => {
    try {
        console.log('Delete mentor:' + req.params.id);
         await mentor_model.deleteOne({email : req.params.id});
         res.status(200).send('Delete successfull');
    } catch (error) {
        res.send('Error on Update:' + error);
    }
});

router.put('/:id', async(req,res) => {
    try {
         const a1 = await mentor_model.updateOne({email : req.params.id},{
            name: req.body.name,
            email: req.body.email,
            tasks: req.body.tasks
        });
         res.json(a1);
        
    } catch (error) {
        res.send('Error on Update:' + error);
    }
});



module.exports = router;