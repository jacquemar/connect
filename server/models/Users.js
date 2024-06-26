const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    mail:{
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true
    },
    photoProfilURL: {
        type: String,
        default: ''
    },
    banniereURL: {
        type: String,
        default: ''
    },
    nomComplet: {
        type: String,
        default: ''
    },
    titre: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    facebook: {
        type: String,
        default: ''
    },
    instagram: {
        type: String,
        default: ''
    },
    snapchat: {
        type: String,
        default: ''
    },
    youtube: {
        type: String,
        default: ''
    },
    tiktok: {
        type: String,
        default: ''
    },
    twitter: {
        type: String,
        default: ''
    },
    whatsapp: {
        type: String,
        default: ''
    },
    pinterest: {
        type: String,
        default: ''
    },
    linkedin: {
        type: String,
        default: ''
    },
    behance: {
        type: String,
        default: ''
    },
    telegram: {
        type: String,
        default: ''
    },
    service1: {
        type: String,
        default: ''
    },
    service2: {
        type: String,
        default: ''
    },
    service3: {
        type: String,
        default: ''
    },
    service4: {
        type: String,
        default: ''
    },
    visitscount: {
        type: Number,
        default: 0
    },
    vcardDownloadsCount: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: 'user'
    },
});

module.exports = mongoose.model('Users', userSchema);
