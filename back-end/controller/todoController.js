const todoModel = require("../model/todo");

exports.createTodo = async (req, res) => {
  try {
    const Todo = new todoModel(req.body);
    await Todo.save();
    return res.status(200).send(Todo);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

exports.readTodo = async (req, res) => {
  try {
    const Todo = await todoModel.find();
    res.json(Todo);
    return res.status(200);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

exports.readById = async (req, res) => {
  const { id } = req.params;
  try {
    const Todo = await todoModel.findById(id);
    if (!Todo) {
      return res.status(404).send("Todo not found");
    }
    res.json(Todo);
    return res.status(200);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const Todo = await todoModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).send("Updated");
  } catch (error) {
    return res.status(401).send("Not completed");
  }
};
exports.deleteTodo = async (req, res) => {
  try {
    const Todo = await todoModel.findByIdAndDelete(req.params.id);
    return res.send("deleted");
  } catch (error) {
    return res.send(error.message);
  }
};
