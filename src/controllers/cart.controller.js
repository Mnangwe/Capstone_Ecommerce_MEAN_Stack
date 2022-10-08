const db = require("../models")
const Cart = db.cart


exports.create = (req, res) => {

    if(!req.body){
        return res.status(400).send("Your cart cannot be empty!")
    }
    const cart = new Cart( req.body )

    cart.save(cart)
        .then(data => {
            res.status(201).send(data)
        })
        .catch(err => {
            res.status(500).send({
                msg: err.message || "Something wrong while creating cart!"
            })
        })
} 

exports.findAll = (req, res) => {
    
    Cart.find()
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({
                msg: err.message
            })
        })
}

exports.findOne = (req, res) => {
    Cart.findOne({ userId: req.userId })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({
                msg: err.message
            })
        })
}

exports.getProductCart = (req, res) => {
    const id = req.params.id

    Cart.findOne({products: {}})
        .then(data => {
            console.log(data)
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                msg: err.message
            })
        })
}

exports.update = (req, res) => {
    if(!req.body.quantity){
        res.status(400).send({
            msg: "You forgot to change the quantity."
        })
        return
    }

    const id = req.params.id

    let cart = Cart.findOne({userId: req.userId})
    console.log(cart)
    if(cart){
        for(let i = 0; i < cart.products.length; i++){
            if(cart.products[i].productId === id){
                cart.products[i].quantity = req.body.quantity
            }
        }
    }

    cart.save(cart)
        .then(data => {
            if(!data){
                res.status(400).send({
                    msg: `Could not find product with id=${id}`
                })
            } else {
                
                res.status(200).send(data)
            }
        })
        .catch(err => {
            res.status(500).send({
                msg: err.message
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id

    Cart.findByIdAndRemove(id)
        .then(data => {
            if(!data) res.status(400).send({
                msg: `Cannot delete cart with id=${id}. Maybe it was not found.`
            }) 
            else {
                res.status(204).send({
                    msg: "Cart was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                msg: `Could not delete cart with id=${id}.`
            })
        })
}