const { cart } = require("../models")
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

exports.findUserCart = (req, res) => {
    Cart.find({ userId: req.userId })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({
                msg: err.message
            })
        })
}

exports.findOneCart = (req, res) => {

    const id = req.params.id

    Cart.findById(id)
        .then(data => {
            if(!data) res.status(404).send({
                msg: `Could not find cart with id=${id}. Maybe the cart does not exist.`
            })
           else res.status(200).send(data)
        })
        .catch( err => res.status(500).send({ msg: err.message }))
}   

// UPDATE CART
exports.update = (req, res) => {
    if(!req.body.quantity){
        res.status(404).send({
            msg: "You can't update empty quantity field."
        })
        return
    }

    const id = req.params.id

    Cart.findByIdAndUpdate(id, req.body.quantity, { useFindAndModify: false })
        .then(data => {
            if(!data) return res.status(404).send({
                msg: `You cannot update cart with id=${id}. Maybe it was not found.`
            }) 
            else return res.status(202).send({
                msg: "Your cart is updated successfully!"
            })
        })
        .catch( err => res.status(500).send({ msg: err.message }))
}


// UPDATE PRODUCT
exports.updateOneProduct = async (req, res) => {
    if(!req.body.quantity){
        res.status(400).send({
            msg: "You forgot to change the quantity."
        })
        return
    }

    const id = req.params.id
    const prodId = req.params.productId
    console.log(req.userId)
    let cart = await Cart.findById(id)
    // console.log(cart)
    if(cart){
        let v = cart.products.find(ele => prodId == ele.productId)
        console.log(v)
        // let qty = cart.products[v].quantity
        
        await cart.updateOne({ $pull: { products: v }})
        await cart.updateOne({ $push: { products: { productsId: prodId, quantity: req.body.quantity }}})
        res.status(200).send(cart)
    }

}

// DELETE CART
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

exports.deleteOneProdct = async (req, res) => {
    const id = req.params.id
    const prodId = req.params.productId
    let cart = await Cart.findById(id)
    
    if(cart){
        let v = cart.products.find(ele => prodId == ele.productId)
        console.log(v)
        // let qty = cart.products[v].quantity
        
        await cart.updateOne({ $pull: { products: v }})
    }
}