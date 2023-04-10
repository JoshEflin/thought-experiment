const router = require('express').Router();
const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../../models');

// get thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();

    console.log(thoughts);
    res.json(thoughts);
  } catch (e) {
    res.status(500).json(e, { message: 'no one is using their noggin!' });
  }
});
// get thought by ID
router.get('/:id', async (req, res) => {
  try {
    const thoughts = await Thought.findOne(ObjectId(req.params.id));

    console.log(thoughts);
    res.json(thoughts);
  } catch (e) {
    res
      .status(500)
      .json(e, { message: 'Not a creature was stirring, not even a thought' });
  }
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
    const addToUser = await User.findOneAndUpdate(
      {
        username: req.body.username,
      },
      {
        $addToSet: {
          thoughts: newThought._id,
        },
      }
    );

    res.status(200).json(newThought);
  } catch (e) {
    console.log(e);
    res.status(500).json(e, { message: 'failed to think' });
  }
});
// update thought
router.put('/:id', async (req, res) => {
  try {
    const updatedthought = await Thought.findOneAndUpdate(
      {
        _id: ObjectId(req.params.id),
      },
      {
        thoughtText: req.body.thoughtText,
      }
    );
    res.json(updatedthought);
  } catch (e) {
    res.status(500).json(e, { message: ' stop overthinking' });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const deletedthought = await Thought.findOneAndDelete({
      _id: ObjectId(req.params.id),
    });
    res.json(deletedthought);
  } catch (e) {
    res.status(500).json(e, { message: 'whoopsiedaises' });
  }
});
router.post('/reactions/:id/', async (req, res) => {
  try {
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
  } catch (e) {
    res.status(500).json(e, { message: ' you left them speechless' });
  }
});
router.delete('/:id/reactions/:reactionId', async (req, res) => {
  try {
    const deletedReaction = await Thought.findByIdAndUpdate(
      { _id: ObjectId(req.params.id) },
      {
        $pull: { reactions: { reactionId: req.params.reactionId } },
      }
    );
    res.json(deletedReaction);
  } catch (e) {
    res.status(500).json(e, { message: 'no bueno, this route is insane-o' });
  }
});
module.exports = router;
