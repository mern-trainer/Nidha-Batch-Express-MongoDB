const { Router } = require("express")
const controller = require("../Controllers/cart.controller")

const cartRouter = Router()

cartRouter.post("/", controller.addToCart)
cartRouter.get("/", controller.getCart)

module.exports = cartRouter