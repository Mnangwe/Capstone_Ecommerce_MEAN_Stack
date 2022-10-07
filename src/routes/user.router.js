module.exports = app => {

    const users = require("../controllers/user.controller.js")

    const router = require("express").Router()

    router.get("stat", users.stats)

    app.use("api/users", router)
}