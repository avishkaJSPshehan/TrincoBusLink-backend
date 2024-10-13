const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require('./models/user')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/testDatabase");

app.post('/signin', (req,res) => {
    UserModel.create(req.body)
    .then(uses => res.json(uses))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is running!!!")
})