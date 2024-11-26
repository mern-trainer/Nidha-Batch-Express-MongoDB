const { Router } = require("express")
const controller = require("../Controllers/user.controller")

const userRouter = Router()

userRouter.post("/user", controller.createUser)
userRouter.get("/user", controller.loginUser)

module.exports = userRouter