const { Schema, model } = require('mongoose');
const { Thought } = require('./Thought');

// username

// String
// Unique
// Required
// Trimmed
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 15,
    },
    // email

    // String
    // Required
    // Unique
    // Must match a valid email address (look into Mongoose's matching validation)
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please fill a valid email address',
      ],
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  if (this.friends) {
    return this.friends.length;
  }
});

const User = model('user', userSchema);
module.exports = { User };
// thoughts

// Array of _id values referencing the Thought model
// friends

// Array of _id values referencing the User model (self-reference)
// Schema Settings:

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
