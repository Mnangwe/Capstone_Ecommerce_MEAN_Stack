module.exports = app => {
    const products = require("../controllers/product.controller.js")
    const { authJwt } = require("../middlewares")

    const router = require("express").Router();

    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )

        next()
    })

    router.post("/", 
        [
            authJwt.verifyToken,
            authJwt.isModerator
        ], 
        products.create
    )

    router.get("/", 
        [
            authJwt.verifyToken
        ],
        products.findAll
    )

    router.get("/:id",
        [ authJwt.verifyToken],
        products.findOne
    )

    router.put("/:id", 
        [
            authJwt.verifyToken,
            // authJwt.isAdmin
        ],
        products.update
    )

    router.delete("/:id",
        [ 
            authJwt.verifyToken,
            authJwt.isAdmin
        ], 
        products.delete
    )


    app.use("/api/products", router)
}