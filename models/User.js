const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const User = new mongoose.Schema({
    username: String,
    password: String,
    lists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'List',
        }
    ],
    followedLists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'List',
        }
    ]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);