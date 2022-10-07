const db = require("../models")
const User = db.user

exports.findAll = (req, res) => {

}

// User Stats
exports.stats = (req , res) => {
  const date = new Date()
  const lastYear = new Date(date.setFullYear(date.getFullYear()-1))

  const data = User.aggregate([
    { $match: {createdAt: { $gte: lastYear } } },
    {
      $project: {
        month: { $month: "$createdAt" },
      },
    },
    {
      $group: {
        _id: "$month", 
        total: { $sum: 1 },
      }
    }
  ]).then(data => {
    res.status(200).send(data)
  }).catch(err => {
    res.status(500).send({
      msg: err.message || "Something occured while retrieving the stat."
    })
  })
}

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };