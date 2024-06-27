import mongoose, { Schema } from "mongoose";

const MediaShema = new Schema({
  title: { type: String, require: true },
  thumbnal: { type: String, require: true },
  Image: { type: Array, require:true },
  text: { type: String, require: true },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "USER"
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const Media = mongoose.model('Media', MediaShema)
