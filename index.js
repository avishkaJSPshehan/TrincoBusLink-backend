const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require('./models/user')
const BusModel = require('./models/buses')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/testDatabase");


app.post('/login',(req,res) => {
    const {email,password} = req.body;
    UserModel.findOne({email:email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("Success")
            }
            else{
                res.json("The password is incorrect")
            }
        }
        else{
            res.json("No record Existed")
        }
    })
})

app.post('/', (req, res) => {
    const { fromLocation, toLocation, travelDate } = req.body;

    // Search for buses matching the fromLocation and toLocation
    BusModel.find({ 
        fromLocation: fromLocation, 
        toLocation: toLocation 
    })
    .then(buses => {
        // Check if buses were found
        if (buses.length > 0) {
            res.json(buses); // Respond with the list of buses found
        } else {
            res.status(404).json("No buses found for the specified locations"); // No buses found
        }
    })
    .catch(error => {
        console.error("Error retrieving buses:", error);
        res.status(500).json("An error occurred while searching for buses"); // Handle errors
    });
});



app.post('/signin', (req,res) => {
    UserModel.create(req.body)
    .then(uses => res.json(uses))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is running!!!")
})