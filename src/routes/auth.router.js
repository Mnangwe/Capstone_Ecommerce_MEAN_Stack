module.exports = app => {
    const authenticate = require("../controllers/auth.controller.js")
    const { verifySignup } = require("../middlewares")
    

    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })

    const router = require("express").Router()

    router.post("/signup",
        [
            verifySignup.checkDuplicates,
            verifySignup.checkRoles
        ],
        authenticate.signup
    )

    router.post("/signin", authenticate.signin)


    app.use("/api/auth/", router)

}