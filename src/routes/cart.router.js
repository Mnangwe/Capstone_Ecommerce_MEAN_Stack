module.exports = app => {

    const cart = require("../controllers/cart.controller.js")
    const { authJwt } = require("../middlewares")

    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })

    const router = require("express").Router()

    router.post("/:id", 
        [
            authJwt.verifyToken,
            // authJwt.verifyIsUser
        ], 
        cart.create
    )

    router.get("/",
        [
            authJwt.verifyToken,
            authJwt.isModerator
        ],
        cart.findAll
    )

    router.get("/userCart",
        [
            authJwt.verifyToken
        ], 
        cart.findOne
    )

    router.get("/:id", cart.getProductCart)

    router.put("/:id", 
        [
            authJwt.verifyToken,
            // authJwt.verifyIsUser
        ],
        cart.update
    )


    app.use("/api/cart/", router)
}