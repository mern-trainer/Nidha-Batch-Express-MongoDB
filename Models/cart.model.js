const { Schema, model } = require("mongoose")

const cartSchema = new Schema({
    id: { type: String, required: true },
    quantity: { type: Number, default: 1 }
}, {
    timestamps: true
})

const Cart = model("carts", cartSchema)

module.exports = Cart