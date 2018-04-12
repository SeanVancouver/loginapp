var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {type: String, required: true},
    username: {type: String, required: false},
    password: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);
