const UserModel = require("../models/user");

exports.addUser = (req, res) => {
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json({ message: "success", user: user });
      } else {
        res.json({ message: "error", error: "The password is incorrect" });
      }
    } else {
      res.json({ message: "error", error: "User not existed" });
    }
  });
};

exports.getUser = (req, res) => {};
