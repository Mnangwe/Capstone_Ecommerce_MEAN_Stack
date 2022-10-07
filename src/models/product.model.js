const mongoose = require("mongoose")

let schema = new mongoose.Schema({
    title: String,
    category: Array,
    price: Number,
    image: String,
    quantity: {
        type: Number,
        default: 1
    }
}, { timestamps: true })

schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id;
    return object
})

const Product = mongoose.model("products", schema)
module.exports = Product
