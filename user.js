const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fname:{type:String, required:true},
    lname:{type:String, required:true},
    email:{
        type:String,
        required:true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    username:{type:String, required:true},
    password:{type:String, required:true},
    address:{type:String, required:true},
   // country:{type:String, required:true},
    state:{type:String, required:true},
    city:{type:String, required:true},
    postalcode:{type:Number, required:true},
    phone:{type:Number, required:true}


});


module.exports = mongoose.model('User', userSchema);