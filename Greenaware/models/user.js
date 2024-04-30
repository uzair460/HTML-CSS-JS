const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const GreenawareSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    forename: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    address: String,
    category: {
        type: String,
        enum: ['support', 'observer'],
        required: true
    },
    accountStatus: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active'
    },
    accountBalance: {
        type: Number,
        default: 0
    },
    cardNumber: String,
    cardHolderName: String,
    cardType: {
        type: String,
        enum: ['Visa', 'Mastercard']
    },
    cardCVV: String,
    notificationPreference: {
        type: String,
        enum: ['text', 'email'],
        default: 'email'
    }
});

// Plugin passport-local-mongoose to User schema
GreenawareSchema.plugin(passportLocalMongoose);

// Create model from schema
const Greenaware = mongoose.model('Greenaware', GreenawareSchema);

module.exports = Greenaware;
