const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const db = require("./src/models")
const dbConfig = require("./src/config/db.config");
const Role = db.role

db.mongoose.connect(
    dbConfig.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connected with MongoDB!")
        initial()
    })
    .catch(err => {
        console.error("Connection error", err)
        process.exit()
})

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if( !err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if(err) {
                    console.log("error", err)
                }
                console.log("added 'user' to roles collection")
            })

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err)
                }
                console.log("added 'moderator' to roles collection")
            })

            new Role({
                name: "admin"
            }).save(err => {
                if(err) {
                    console.log("error", err)
                }
                console.log("added 'admin' in roles collection")
            })
        }
    })
}

app.set('port', process.env.PORT || 3000) 

app.get('/', (req, res, next) => {
    res.send('<h1>Hello world<h1>');
})

require("./src/routes/cart.router")(app)
require("./src/routes/product.router")(app)
require("./src/routes/auth.router")(app)
require("./src/routes/user.router")(app)

app.listen(app.get('port'), () => {
    console.info(`Server listen on port ${app.get('port')}`);
})