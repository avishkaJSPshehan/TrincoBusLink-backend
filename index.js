require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const UserModel = require("./models/user"); // Replace with the actual path to your user model
// const BusModel = require("./models/buses"); // Replace with the actual path to your buses model

const userRouter = require("./routes/user");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

// Connect to MongoDB (replace with your actual MongoDB connection string)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// // User Login Route
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   UserModel.findOne({ email: email }) // Assuming your `UserModel` has an email field
//     .then((user) => {
//       if (user) {
//         if (user.password === password) { // Replace with your actual password validation logic if needed
//           res.json({ message: "success", username: user.name }); // Add any additional user information if necessary
//         } else {
//           res.json("The password is incorrect");
//         }
//       } else {
//         res.json("No record existed");
//       }
//     });
// });

// // Search Buses Route (Customize as per your actual bus searching logic)
// app.post("/", (req, res) => {
//   const { departure, arrival } = req.body;

//   // Search for buses matching the departure and arrival locations
//   BusModel.find({
//     departure: departure,
//     arrival: arrival,
//   })
//     .then((buses) => {
//       if (buses.length > 0) {
//         res.json(buses); // Return the list of buses found
//       } else {
//         res.status(404).json("No buses found for the specified locations");
//       }
//     })
//     .catch((error) => {
//       console.error("Error retrieving buses:", error);
//       res.status(500).json("An error occurred while searching for buses");
//     });
// });

// // User Registration Route (Replace with your actual user registration logic)
// app.post("/signin", (req, res) => {
//   UserModel.create(req.body)
//     .then((user) => res.json(user)) // Customize the response with any additional user details if required
//     .catch((err) => res.json(err));
// });

// // Bus CRUD Routes
// // 1. Create a new bus (Customize as per your actual fields)
// app.post("/admin-dashboard", (req, res) => {
//   const newBus = new BusModel(req.body); // Assuming req.body contains all necessary fields for creating a bus
//   newBus
//     .save()
//     .then((bus) => res.status(201).json(bus)) // Respond with the newly created bus data
//     .catch((err) => res.status(500).json({ message: "Failed to create bus", err }));
// });

// // 2. Get all buses (Adjust if you need filtering, pagination, etc.)
// app.get("/admin-dashboard", (req, res) => {
//   BusModel.find()
//     .then((buses) => res.status(200).json(buses)) // Respond with the list of all buses
//     .catch((err) => res.status(500).json({ message: "Failed to get buses", err }));
// });

// // 3. Update a bus by ID (Make sure to handle your actual update fields)
// app.put("/admin-dashboard/:id", (req, res) => {
//   const busId = req.params.id;
//   BusModel.findByIdAndUpdate(busId, req.body, { new: true }) // Update the bus with new data from req.body
//     .then((updatedBus) => res.status(200).json(updatedBus)) // Respond with the updated bus data
//     .catch((err) => res.status(500).json({ message: "Failed to update bus", err }));
// });

// // 4. Delete a bus by ID (Confirm if any additional checks are needed before deletion)
// app.delete("/admin-dashboard/:id", (req, res) => {
//   const busId = req.params.id;
//   BusModel.findByIdAndDelete(busId) // Find the bus by its ID and delete it
//     .then(() => res.status(200).json({ message: "Bus deleted successfully" }))
//     .catch((err) => res.status(500).json({ message: "Failed to delete bus", err }));
// });

// Start the server (Ensure the port number doesn't conflict with any other services)
app.listen(3001, () => {
  console.log("Server is running on port 3001!!!");
});
