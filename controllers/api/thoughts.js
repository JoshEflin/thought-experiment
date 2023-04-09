const router = require('express').Router();
const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../../models');

// get thoughts
router.get('/', async (req, res) => {
  const thoughts = await Thought.find();

  console.log(thoughts);
  res.json(thoughts);
});
// get thought by ID
router.get('/:id', async (req, res) => {
  const thoughts = await Thought.findOne(ObjectId(req.params.id));

  console.log(thoughts);
  res.json(thoughts);
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
// update thought
router.put('/:id', async (req, res) => {
  console.log(req.body);
  const updatedthought = await Thought.findOneAndUpdate(
    {
      _id: ObjectId(req.params.id),
    },
    {
      thoughtText: req.body.thoughtText,
    }
  );
  res.json(updatedthought);
});

router.post('/reactions/:id/', async (req, res) => {
  const newReaction = await Thought.findOneAndUpdate(
    {
      _id: ObjectId(req.params.id),
    },
    {
      $addToSet: {
        reactions: {
          reactionBody: req.body.reactionBody,
        },
      },
    },
    {
      new: true,
    }
  );
  res.json(newReaction);
});
module.exports = router;
