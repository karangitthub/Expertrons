const mongoose = require('mongoose');

const mentor_schema = new mongoose.Schema({

    email: {
        type: String ,
        required: true
    },
    name: {
        type: String,
        required:true
    },
    tasks: {
        type: Array,
        required: true,
        default : []
    }   

});

module.exports = mongoose.model('Mentor',mentor_schema);