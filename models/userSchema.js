const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String
    },
    age: {
        type: Number
    },
    uid: {
        type: Number
    },
    loan: {
        type: Number
    },
    interest: {
        type: Number
    },
    duration: {
        type: Number
    },
    monthly: {
        type: Number
    },
    userData: [
        {
            date: String,
            credit: Number,
            paid: Number
        }
    ]
})

const member = mongoose.model('MEMBER', userSchema);
module.exports = member;