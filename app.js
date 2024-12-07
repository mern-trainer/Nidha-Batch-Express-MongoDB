require("dotenv").config()

const express = require("express")

const todoRouter = require("./Routes/todo.route")
const userRouter = require("./Routes/user.route")
const config = require("./Config/db")
const cartRouter = require("./Routes/cart.route")

const app = express()

config.connectDB()

app.use(express.json())

app.use("/v1", todoRouter)
app.use("/v2", userRouter)
app.use("/cart", cartRouter)

app.listen(process.env.PORT, (error) => {
    if (error) {
        return process.exit(1)
    }
    console.log("Server running on port", process.env.PORT)
})