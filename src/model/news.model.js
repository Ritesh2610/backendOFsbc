import mongoose, { Schema } from "mongoose";

const NewsShema = new Schema({
    title:
    {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "USER"
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

export const News = mongoose.model('News', NewsShema)
