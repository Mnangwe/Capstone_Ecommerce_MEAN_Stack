module.exports = app => {

    const users = require("../controllers/user.controller.js")
    const { authJwt } = require("../middlewares")

    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next();
    })

    const router = require("express").Router()

    router.get("/",
        [
            authJwt.verifyToken,
            authJwt.isModerator,
            authJwt.isAdmin
        ], 
        users.findAll
    )

    router.get("/:id", 
        [
            authJwt.verifyToken,
            authJwt.verifyIsUser
        ],
        users.findOne
    )

    router.put("/:id", 
        [
            authJwt.verifyToken,
            authJwt.verifyIsUser
        ],
        users.update
    )

    router.put("/role/:id",
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        users.updateRoles
    )

    router.delete("/:id", 
        [
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        users.delete
    )

    router.get("/stat",
        [
            authJwt.verifyToken,
            authJwt.isModerator
        ],
        users.stats
    )

    app.use("/api/users", router)
}