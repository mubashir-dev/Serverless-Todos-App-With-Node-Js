const Todo = require('../models/todo.model');

async function create(req, res) {
  try {
    const { title, description, status } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const todo = new Todo({ title, description, status, user: req.user.id });
    const savedTodo = await todo.save();
    return res.status(201).json(savedTodo);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

async function findAll(req, res) {
  try {
    const todos = await Todo.find({ user: req.user.id }).populate('user', ['-password', '-__v']).select('-__v').sort({ createdAt: -1 });
    return res.status(200).json(todos);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

async function findOne(req, res) {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id).populate('user', ['-password', '-__v']).select('-__v');
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    return res.status(200).json(todo);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });
    return res.status(200).json(updatedTodo);
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) return res.status(404).json({ message: 'Todo not found' });
    return res.status(200).json({ message: 'Todo deleted', id: deletedTodo._id });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
};  