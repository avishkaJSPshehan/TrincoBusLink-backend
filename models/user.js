const  mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    role:String,
    password:String
})

const UserModel = mongoose.model("user",UserSchema)
module.exports = UserModel