const router = require('express').Router();
const { User, Thought } = require('../../models');

// get thoughts
router.get('/', async (req, res) => {
  const thought = await Thought.find();
  res.json();
});

// new thought

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const newThought = await Thought.create({
      thoughtText: data.thoughtText,
      username: data.username,
    });
    res.status(200).json(newThought);
  } catch (e) {
    console.log(e);
    res.status(500).json(e, { message: 'failed to think' });
  }
});
module.exports = router;
