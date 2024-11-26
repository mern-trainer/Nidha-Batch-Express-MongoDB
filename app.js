require("dotenv").config()

const express = require("express")

const todoRouter = require("./Routes/todo.route")
const userRouter = require("./Routes/user.route")

const app = express()

app.use(express.json())

app.use("/v1", todoRouter)
app.use("/v2", userRouter)

app.listen(process.env.PORT, (error) => {
    if (error) {
        return process.exit(1)
    }
    console.log("Server running on port", process.env.PORT)
})