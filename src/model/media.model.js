import mongoose, { Schema } from "mongoose";

const MediaShema = new Schema({
  title: { type: String, require: true },
  thumbnal: { type: String, require: true },
  Image: { type: Array, require },
  text: { type: String, require: true },
  createdBy: { type: String, require: true },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const Media = mongoose.model('Media',MediaShema)
