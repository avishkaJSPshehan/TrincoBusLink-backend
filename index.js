const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require('./models/user');
const BusModel = require('./models/buses');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/testDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Login Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("The password is incorrect");
                }
            } else {
                res.json("No record existed");
            }
        });
});

// Search Buses Route
app.post('/', (req, res) => {
    const { departure, arrival } = req.body;
  
    // Search for buses matching the departure and arrival
    BusModel.find({
      departure: departure,
      arrival: arrival
    })
      .then(buses => {
        if (buses.length > 0) {
          res.json(buses); // Respond with the list of buses found
        } else {
          res.status(404).json("No buses found for the specified locations"); // No buses found
        }
      })
      .catch(error => {
        console.error("Error retrieving buses:", error);
        res.status(500).json("An error occurred while searching for buses");
      });
  });
  

// Signin Route
app.post('/signin', (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err));
});

// Get All Buses Route (Fetch from MongoDB)
app.post('/', (req, res) => {
    const { departure, arrival, travelDate } = req.body;

    BusModel.find({
        departure: departure,
        arrival: arrival,
        travelDate: travelDate
    })
    .then(buses => {
        if (buses.length > 0) {
            res.json(buses);
        } else {
            res.status(404).json("No buses found for the specified locations and date");
        }
    })
    .catch(error => {
        console.error("Error retrieving buses:", error);
        res.status(500).json("An error occurred while searching for buses");
    });
});


// Start the server
app.listen(3001, () => {
    console.log("Server is running on port 3001!!!");
});
