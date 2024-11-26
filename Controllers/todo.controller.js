const { v4: createUUID } = require("uuid")

let todoList = []

const getList = (req, res) => {
    return res.status(200).send({
        message: "List fetched",
        todoList
    })
}

const create = (req, res) => {
    const { body } = req
    const taskObj = {
        id: createUUID(),
        title: body.title
    }
    todoList.push(taskObj)
    return res.status(201).send({
        message: "Task created!"
    })
}

const remove = (req, res) => {
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
}

const update = (req, res) => {
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
}

module.exports = {
    getList,
    create,
    remove,
    update
}