require('dotenv').config()
const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require('cors')
const app = express()
app.use(cors())

mongoose.connect(process.env.MONGO_URI);

const Todo = mongoose.model("Todo", {
    task: String,
    isChecked: Boolean
});

app.use(formidable())

app.post('/add-task', async (req, res) => {

    const newTodo = new Todo({
        task: req.fields.task,
        isChecked: req.fields.isChecked
    })
    await newTodo.save(req.fields.tasks)
    res.json()
})

app.get('/get-tasks', async (req, res) => {
    const allTasks = await Todo.find()

    res.json(allTasks)
    // console.log(allTasks)
})
app.get("*", (req, res) => {
    res.status(400).json({ error: "Page not found" })
})
const port = process.env.PORT
app.listen(port, () => {
    console.log(`server listining port: ${port}...`)
})