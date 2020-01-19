const express = require("express");
const morgan = require("morgan");
const connect = require("../connect");
const { json, urlencoded } = require("body-parser");
const app = express();
const Todo = require("./todo");

app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/todo/:id", async (req, res) => {
  const todoId = req.params.id; //anything with a colon in front of it is called a parameter and you need to access it with params
  try {
    const todo = await Todo.findById(todoId)
      .lean()
      .exec();
    res.status(200).json(todo);
  } catch (e) {
    res.status(500).send();
  }
});

app.get("/todos", async (req, res) => {
  try {
    res.status(200).json(
      await Todo.find({})
        .lean()
        .exec()
    );
  } catch (e) {
    res.status(500).send();
  }
});

app.post("/todo", async () => {
  const todoToCreate = req.body.todo;
  try {
    const todo = await Todo.create(todoToCreate);
    res.status(201).json(todo.toJSON()); //toJSON actually sends back an object
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

connect(/**add mongo url here */)
  .then(() =>
    app.listen(4000, () => {
      console.log("server on http://localhost:4000");
    })
  )
  .catch(e => console.error(e));
