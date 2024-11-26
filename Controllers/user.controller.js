// bcrypt => package

// encrypt <==> decrypt
// hash => bcrypt

// hellosndflwejrliwjer => salt

const bcrypt = require("bcrypt")
const { v4: getUserId } = require("uuid")

let userList = []

const createUser = async (request, response) => {
    try {
        const userInfo = request.body
        const userIndex = userList.findIndex(user => user.username.toLowerCase() === userInfo.username.toLowerCase())
        if (userIndex > -1) {
            return response.status(409).send({
                message: "username already exist"
            })
        }
        userInfo.id = getUserId()
        userInfo.password = await bcrypt.hash(userInfo.password, 10)
        userList.push(userInfo)
        return response.status(201).send({
            message: "user created",
            userInfo
        })
    } catch (err) {
        console.log(err)
        return response.status(500).send({
            message: "Internal server error"
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