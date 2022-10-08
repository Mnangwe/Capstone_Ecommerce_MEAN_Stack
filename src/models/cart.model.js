const mongoose = require("mongoose")

let schema = new mongoose.Schema({
        userId: String,
        products: Array
    }, { timestamps: true })

schema.method("toJSON", function(){
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

const Cart = mongoose.model("cart", schema)
module.exports = Cart