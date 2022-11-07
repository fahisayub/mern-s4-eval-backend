const { TodoModel } = require("../models/todo.model");

const getTodo = async (req, res) => {
  let todos = await TodoModel.find();

  res.send({ todos: todos });
};
const addTodo = async (req, res) => {
  let newtodo = req.body;
  let addtodo = await TodoModel.insertMany([newtodo]);
  res.send({ msg: "Todo added successfully", todo: addtodo });
};
const queryTodo = async (req, res) => {
  let query = req.query;
  let todos = TodoModel.find(query);
  res.send({ todos: todos });
};
const updateTodo = async (req, res) => {
  let { id } = req.params;
  let update = req.body;
  let updatetodo = await TodoModel.updateOne({ _id: id }, { ...update });
  res.send({ msg: "todo Updated successfully", updatetodo });
};
const deleteTodo = async (req, res) => {
  let { id } = req.params;
  let deleted = await TodoModel.deleteOne({ _id: id });
  res.send({ msg: "todo Deleted successfully", deleted });
};

const TodoController = {
  getTodo,
  addTodo,
  queryTodo,
  updateTodo,
  deleteTodo,
};

module.exports = {
  TodoController,
};
