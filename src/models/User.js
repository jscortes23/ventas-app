const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

new UserSchema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

exports.Schema = mongoose.model('User', UserSchema);