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

    router.post("/", 
        [
            // authJwt.verifyToken,
            // authJwt.verifyIsUser
        ], 
        cart.create
    )

    router.get("/",
        [
            // authJwt.verifyToken,
            // authJwt.isModerator
        ],
        cart.findAll
    )

    router.get("/userCart",
        [
            authJwt.verifyToken
        ], 
        cart.findUserCart
    )

    router.get("/userCart/:id",
        [
            // authJwt.verifyToken
        ], 
        cart.findOneCart
    )

    router.put("/:id", cart.update)

    router.put("/:id/product/:productId", 
        [
            authJwt.verifyToken,
            // authJwt.verifyIsUser
        ],
        cart.updateOneProduct
    )

    router.delete("/:id", cart.delete)


    app.use("/api/cart/", router)
}