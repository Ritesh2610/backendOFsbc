import mongoose, { Schema, mongo } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const PDF_Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    file_path: {
        type: String,
        required: true
    },
    original_name: {
        type: String,
        required: true
    },
    pagename: {
        type: String,
        required: true
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: "USER"
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});

PDF_Schema.plugin(mongooseAggregatePaginate)

export const PDF = mongoose.model('PDF', PDF_Schema)