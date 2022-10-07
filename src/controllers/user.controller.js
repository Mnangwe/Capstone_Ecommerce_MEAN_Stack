const db = require("../models")
const User = db.user
const Role = db.role

exports.findAll = (req, res) => {

  User.find({})
    .then(data => {
      res.status(200).send(data)
    }).catch(err => {
      res.status(500).send({
        msg: err.message
      })
    })
}

exports.findOne = (req, res) => {

  const id = req.params.id

  User.findById(id)
    .then(data => {
      res.status(200).send(data)
    }).catch(err => {
      res.status(500).send({
        msg: err.message
      })
    })
}

exports.update = (req, res) => {
  if(!req.body) {
    res.status(400).send({
      msg: "The content cannot be empty!"
    })
    return
  }
  
  const id = req.params.id

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if(!data) {
        res.status(400).send({
          msg: `Cannot update user with id=${id}. Maybe it was not found.`
        })
      } else {
        res.status(202).send({ msg: "User was updated successfully"})
      }
    })
    .catch(err => {
      res.status(500).send({
        msg: err.message || `Something occured while updating the user with id=${id}.`
      })
    })
}

exports.updateRoles = (req, res) => {
  if(!req.body.roles){
    res.status(400).send({
      msg: "Make sure you added the roles"
    })
    return
  }

  const id = req.params.id

  User.findById(id)
    .then(data => {
      if(!data){
        res.status(400).send({
          msg: `Cannot update user with id=${id}. Maybe the user was not found.`
        })
      } else {
          Role.find({
              name: { $in: req.body.roles }
          }, (err, roles) => {
              if(err) {
                  res.status(500).send({ msg: err })
                  return
              }
              data.roles = roles.map(role => role._id)
              data.save(err => {
                  if(err) {
                      res.status(500).send({ msg: err })
                      return
                  }
                  res.status(202).send({msg: `The roles were updated for ${data.username}` })
              })
          })
      }
      
    })
}

exports.delete = (req, res) => {
  const id = req.params.id

  User.findByIdAndRemove(id)
    .then(data => {
      if(!data) {
        res.status(500).send({
          msg: `Cannot delete a user with id=${id}`
        })
      } else {
        res.status(204).send(data)
      }
    })
    .catch(err => {
      res.status(500).send({
        msg: err.message || `Cannot not delete user with id=${id}.`
      })
    })
}
// User Stats
exports.stats = (req , res) => {
  const date = new Date()
  const lastYear = new Date(date.setFullYear(date.getFullYear()-1))

  User.aggregate([
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