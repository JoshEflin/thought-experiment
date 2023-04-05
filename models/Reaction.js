// Reaction (SCHEMA ONLY)
const { Schema, Types } = require('mongoose');
// reactionId
const reactionSchema = new Schema(
  // Use Mongoose's ObjectId data type
  // Default value is set to a new ObjectId
  {
    reactionID: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get(v) {
        const date = Date(v);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}`;
      },
    },
  }
);
module.exports = reactionSchema;
// reactionBody

// String
// Required
// 280 character maximum
// username

// String
// Required
// createdAt

// Date
// Set default value to the current timestamp
// Use a getter method to format the timestamp on query
// Schema Settings:

// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
