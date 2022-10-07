const db = require("../models")
const ROLES = db.ROLES
const User = db.user

const checkDuplicates = (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if(err) {
            res.status(500).send({ msg: err })
            return
        }

        if(user) {
            res.status(400).send({ msg: "Failed! username already in use." })
            return
        }
    })

    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if(err) {
            res.status(500).send({ msg: err })
        }

        if(user) {
            res.status(400).send({ msg: "Failed! email already in use."})
            return
        }
    })

    next()
}

const checkRoles = (req, res, next) => {
    if(req.body.roles) {
        for(let i = 0; i < req.body.roles.length; i++) {
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    msg: `Failed! Role ${req.body.roles[i]} does not exit!`
                })
                return
            }
        }
    }

    next()
}

const verifySignup = {
    checkDuplicates,
    checkRoles
}

module.exports = verifySignup