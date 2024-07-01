const mongoose = require('mongoose');

const demandeSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        require: true
    },
    nom:{
        type: String,
        default: ''
    },
    prenom:{
        type: String,
        default: ''
    },
    phoneNumber:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    status:{
        type:String,
        enum: ['pending','approved','rejected'],
        default:'pending',
    },
    date:{
        type:String,
        required:true
    }


});

module.exports = mongoose.model('Demandes', demandeSchema)