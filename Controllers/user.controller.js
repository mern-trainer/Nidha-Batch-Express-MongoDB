const bcrypt = require("bcrypt")
const User = require("../Models/user.model")
const jwt = require("jsonwebtoken")
require("dotenv").config()

// token create

let userList = []

const createUser = async (request, response) => {
    try {
        const userInfo = request.body
        const userNameExist = await User.findOne({ username: userInfo.username });
        if (userNameExist) {
            return response.status(409).send({
                message: "username already exist"
            })
        }
        const emailExist = await User.findOne({ email: userInfo.email });
        if (emailExist) {
            return response.status(409).send({
                message: "email already exist"
            })
        }
        userInfo.password = await bcrypt.hash(userInfo.password, 10)
        const res = await User.create(userInfo)
        if (!res._id) {
            return response.status(500).send({ message: "Error happend" });
        }
        res.password = null
        const token = jwt.sign({ sub: res }, process.env.JWT_KEY, {
            expiresIn: "3d"
        })
        return response.status(201).send({
            message: "user created",
            res,
            token
        })
    } catch (err) {
        console.log(err)
        return response.status(500).send({
            message: err
        })
    }
}

const loginUser = async (request, response) => {
    try {
        const { username, password } = request.query
        const user = userList.find(u => u.username.toLowerCase() === username)
        if (!user) {
            return response.status(404).send({
                message: "user not found"
            })
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return response.status(401).send({
                message: "Invalid credentials"
            })
        }
        return response.status(200).send({ message: "logged in", user })
    } catch (err) {
        console.log(err)
        return response.status(500).send({
            message: "Internal server error"
        })
    }
}

module.exports = {
    createUser, loginUser
}