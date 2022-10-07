const db = require("../models")
const Cart = db.cart

exports.create = (req, res) => {
    
    const cart = new Cart( req.body )

    cart.save(cart)
        .then(data => {
            res.status(200).send(data)
        })
} 