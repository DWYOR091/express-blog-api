const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    updateBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
}, { timestamps: true })

const Category = mongoose.model('category', categorySchema)

module.exports = Category