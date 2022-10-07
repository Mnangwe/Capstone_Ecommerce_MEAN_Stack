const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    userId: String,
    products: [
        {
            productId: String,
            quantity: Number
        }
    ],
    amount: Number,
    address: Object,
    status: {
        type: String,
        default: "pending"
    }
}, { timestamps: true })

schema.method("toJSON", function(){
    const { __v, _id, ...object} = this.toObject()
    object.id = _id
    return object
})

const Order = mongoose.model("orders", schema)
module.exports = Order