const router = require('express').Router();
const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../../models');

// finds all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('friends').populate('thoughts');
    // .populate
    //   {
    //   path: 'reaction',
    //   populate: { path: 'thought' },
    //   select: '-__v',
    // }
    console.log(users);
    if (users) {
      res.status(200).json(users);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// finds single user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.find(
      { _id: ObjectId(req.params.id) }
      // || { username: `${req.params.id}` }
    );

    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json(e, { message: 'whoopsies, we couldnt find this user' });
  }
});
// update a user
router.put('/:id', async (req, res) => {
  const updateUser = await User.findOneAndUpdate(
    {
      _id: ObjectId(req.params.id),
    },
    {
      username: req.body.username,
      email: req.body.email,
    }
  );
  res.status(200).json(updateUser);
});
// create a new user
router.post('/', async (req, res) => {
  const data = req.body;
  try {
    const newUser = await User.create({
      username: data.username,
      email: data.email,
    });
    res.status(200).json(newUser);
  } catch (e) {
    console.log(e);
    res.status(500).json(e, {
      message: 'something went wrong in the creation of this user',
    });
  }
});
// delete user

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.deleteOne({
      _id: ObjectId(req.params.id),
    });
    res.status(200).json(deleted);
  } catch (e) {
    console.log(e);
    res.status(500).json(e, {
      message: 'something went wrong...',
    });
  }
});

// FRIEND related routes

// new friend
router.post('/:id/:friendID', async (req, res) => {
  try {
    const newFriend = await User.findOneAndUpdate(
      {
        _id: ObjectId(req.params.id),
      },
      {
        $addToSet: { friends: ObjectId(req.params.friendID) },
      },
      {
        new: true,
      }
    );

    res.status(200).json(newFriend);
  } catch (e) {
    console.log(e);
    res.status(500).json(e, { message: 'something went wrong' });
  }
});

router.delete('/:id/:friendID', async (req, res) => {
  try {
    const deleteFriend = await User.findOneAndUpdate(
      {
        _id: ObjectId(req.params.id),
      },
      {
        $pull: { friends: ObjectId(req.params.friendID) },
      },
      {
        new: false,
      }
    );
    console.log(deleteFriend);
    res.json(deleteFriend);
  } catch (e) {
    console.log(e);
    res.status(500).json(e, {
      message: 'nope',
    });
  }
});
module.exports = router;
