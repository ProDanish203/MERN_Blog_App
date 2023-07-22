import mongoose from "mongoose";

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    summary: {
        type: String,
        required: [true, "Summary is required"],
    },
    content: {
        type: String,
        required: [true, "Blog Content is required"],
    },
    banner: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true });

export default mongoose.model("blog", BlogSchema);