const router = require('express').Router();
const { User, Thought } = require('../../models');

router.get('/', (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
});
module.exports = router;
