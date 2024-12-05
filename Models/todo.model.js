const { Schema, model } = require("mongoose")

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Todo = model("todos", schema)

module.exports = Todo