const express = require('express');
const router = express.Router();
const { create,
  findAll,
  findOne,
  update,
  remove } = require('../controllers/todo.controller');
const { protect } = require('../middlewares/auth.middleware');

router.post('/', protect, create);
router.get('/', protect, findAll);
router.get('/:id', protect, findOne);
router.patch('/:id', protect, update);
router.delete('/:id', protect, remove);

module.exports = router;
