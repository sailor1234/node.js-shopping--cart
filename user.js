
const mongoose = require('Mongoose');
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname:{type:String, required:true},
   lastname:{type:String},
   email:{type:String, required:true,unique:true},
    username:{type:String, required:true},
    password:{type:String, required:true},
   address:{type:String, required:true},
   country:{type:String, required:true},
   state:{type:String, required:true},
   city:{type:String, required:true},
  postalcode:{type:Number, required:true},
   phone:{type:Number, required:true}  
});
    

module.exports = mongoose.model('User', userSchema);