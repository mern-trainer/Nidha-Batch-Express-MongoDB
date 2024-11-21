require("dotenv").config()

const express = require("express")
const { v4: createUUID } = require("uuid")

const app = express()

app.use(express.json())

let todoList = []

app.post("/todo", (req, res) => {
    const { body } = req
    const taskObj = {
        id: createUUID(),
        title: body.title
    }
    todoList.push(taskObj)
    return res.status(201).send({
        message: "Task created!"
    })
})

app.get("/todo", (req, res) => {
    return res.status(200).send({
        message: "List fetched",
        todoList
    })
})

app.delete("/todo/:id?", (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(404).send({
            message: "Id not found!"
        })
    }
    todoList = todoList.filter(todo => todo.id !== id)
    return res.status(200).send({
        message: "Task removed"
    })
})

app.patch("/todo", (req, res) => {
    const { id, title } = req.body
    const index = todoList.findIndex(todo => todo.id === id)
    if (index === -1) {
        return res.status(404).send({
            message: "Not found!"
        })
    }
    todoList[index].title = title
    return res.status(200).send({
        message: "Updated",
        response: todoList[index]
    })
})

app.listen(process.env.PORT, (error) => {
    if (error) {
        return process.exit(1)
    }
    console.log("Server running on port", process.env.PORT)
})