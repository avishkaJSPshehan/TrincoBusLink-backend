const  mongoose = require("mongoose");

const BusSchema = new mongoose.Schema({
    name:String,
    fromLocation:String,
    toLocation:String
})

const BusModel = mongoose.model("buses",BusSchema)
module.exports = BusModel