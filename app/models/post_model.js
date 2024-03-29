import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field
const PostSchema = new Schema({
  title: String,
  content: String,
  tags: String,
  cover_url: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

// create PostModel class from schema
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
