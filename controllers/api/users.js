const router = require('express').Router();
const { User, Thought } = require('../../models');

// finds all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate({
      path: 'friends',
      select: '-__v',
    });
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
  const user = await User.find();

  res.json();
});
// update a user
router.put('/:id', async (req, res) => {
  const updateUser = await User.findOneAndUpdate();
  res.json();
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
  const deleted = await User.deleteOne();
  res.json();
});
// FRIEND related routes

// new friend
// router.post('/:id/friends');
module.exports = router;
