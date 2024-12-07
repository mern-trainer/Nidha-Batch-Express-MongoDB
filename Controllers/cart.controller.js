const Cart = require("../Models/cart.model");

const addToCart = async (req, res) => {
    const { id } = req.body

    const response = await fetch(`https://dummyjson.com/products/${id}`)
    if (response) {
        const exist = await Cart.findOne({ id });
        if (exist) {
            await Cart.updateOne({ id }, { $inc: { quantity: 1 } });
            
        } else {
            await Cart.create({ id });
        }
    }
}

const getCart = async () => {
    console.log(await Cart.find())
}

module.exports = {
    addToCart,
    getCart
}