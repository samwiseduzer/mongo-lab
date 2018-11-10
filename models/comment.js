import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const CommentSchema = new Schema(
  {
    user: {
      type: String,
      required: [true, "User is required"],
      unique: false,
      select: true
    },
    text: {
      type: String,
      required: [true, "Text is required"],
      unique: false,
      select: true
    }
  },
  { timestamps: true }
);

CommentSchema.plugin(uniqueValidator);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

export default Comment;
