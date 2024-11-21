// NodeJs => Framework [express.js]

// => Middleware
// => Easy Routing
require("dotenv").config()

const express = require("express")
// import express from "express"

const app = express()

app.get("/cart/:user_id/:product_id", (request, response) => {
    return response.status(200).send(request.params)
})

app.listen(process.env.PORT, (error) => {
    if (error) {
        return process.exit(1)
    }
    console.log("Server running on port", process.env.PORT)
})