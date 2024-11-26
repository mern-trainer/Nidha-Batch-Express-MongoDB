const { Router } = require("express")
const controller = require("../Controllers/todo.controller")

const todoRouter = Router()

todoRouter.post("/todo", controller.create)
todoRouter.get("/todo", controller.getList)
todoRouter.delete("/todo/:id?", controller.remove)
todoRouter.patch("/todo", controller.update)

module.exports = todoRouter