const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
    fullName : {type : String, required : true},
    email : {type : String, required : true},
    password : {type : String, required : true},
})

const buyerModel = mongoose.model('buyer',buyerSchema);

module.exports = buyerModel;