const db = require("../models")
const Product = db.product

exports.create = (req, res) => {
    if(!req.body.title) {
        res.status(400).send({ msg: "Content cannot be empty!"})
        return
    }

    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
        category: req.body.category
    })

    product.save(product)
        .then(data => {
            res.status(201).send(data)
        })
        .catch(err => {
            res.status(500).send({
                msg: err.message || "Something occured while creating the products."
            })
        })
}

exports.findAll = (req, res) => {

    let category = req.query.category
    let condition = category ? { category: { $regex: new RegExp(category), $options: "i" }} : {}

    Product.find(condition)
        .then(data => {
            res.status(200).send(data)
        })
        .catch( err => {
            res.status(500).send({
                msg: err.message || "Something occured trying to retrieve products."
            })
        })
}

exports.findOne = (req, res) => {

    const id = req.params.id

    Product.findById(id)
        .then(data => {
            console.log(data)
            console.log(id)
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({
                msg: err.message || `Something occured trying to get product with an id=${id}. Maybe it doesn't exist`
            })
        })
}

exports.update = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            msg: "The content cannot be empty!"
        })
        return
    }

    const id = req.params.id

    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if(!data) {
                res.status(400).send({
                    msg: `Cannot update product with id=${id}. Maybe it was not found.`
                })
            } else {
                res.status(202).send({ msg: "Product was updated successfully!"})
            }
        })
        .catch(err => {
            res.status(500).send({
                msg: `Error updating product with id=${id}.`
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id

    Product.findByIdAndRemove(id)
        .then(data => {
            if(!data) res.status(400).send({
                msg: `Cannot delete product with id=${id}. Maybe it was not found.`
            }) 
            else {
                res.status(204).send({
                    msg: "Product was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                msg: `Could not delete product with id=${id}.`
            })
        })
}