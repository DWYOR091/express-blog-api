const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String },
    file: { type: mongoose.Types.ObjectId, ref: 'file' },
    category: { type: mongoose.Types.ObjectId, ref: 'category', required: true },
    updateBy: { type: mongoose.Types.ObjectId, ref: 'user', required: true }
}, { timestamps: true })

const Post = mongoose.model('post', postSchema)

module.exports = Post