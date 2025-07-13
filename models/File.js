const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: String,
    size: Number,
    mimetype: String,
    url: String,
    public_id: String,
    createdBy: { type: mongoose.Types.ObjectId, ref: 'user', required: true }
})

const File = mongoose.model('file', fileSchema)
module.exports = File