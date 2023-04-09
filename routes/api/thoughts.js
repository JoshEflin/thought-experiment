const router = require('express').Router();
const { User, Thought } = require('../../models');

// get thoughts
router.get('/', async (req, res) => {
  const thought = await Thought.find();
  res.json();
});

// new thought

router.post('/', async (req, res) => {
  const newThought = await Thought.create();
  res.json();
});
module.exports = router;
