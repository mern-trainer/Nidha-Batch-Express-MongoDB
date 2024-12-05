const Todo = require("../Models/todo.model")

const getList = async (req, res) => {
    try {
        const response = await Todo.find()
        return res.status(200).send({ status: true, message: "List fetched", response });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

const create = async (req, res) => {
    try {
        const { body } = req
        const response = await Todo.create(body)
        if (!response?._id) {
            return res.status(400).send({ status: false, message: "Error happend" });
        }
        return res.status(201).send({ status: true, message: "Task Created", response });
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

const remove = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(404).send({
            status: false,
            message: "Id not found!"
        })
    }
    const response = await Todo.deleteOne({ _id: id });
    if (response?.deletedCount == 0) {
        return res.status(404).send({
            status: false,
            message: "Task does not exist!"
        })
    }
    return res.status(200).send({
        status: true,
        message: "Task removed"
    })
}

const update = async (req, res) => {
    try {
        const { id, ...restData } = req.body
        const response = await Todo.updateOne({ _id: id }, { $set: restData });
        if (response.matchedCount == 0) {
            return res.status(404).send({
                status: false,
                message: "Task does not exist!"
            })
        }
        if (response.matchedCount == 1 && response.modifiedCount == 1) {
            return res.status(200).send({
                status: true,
                message: "Updated"
            })
        }
        return res.status(200).send({
            message: "No Changes"
        })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

module.exports = {
    getList,
    create,
    remove,
    update
}