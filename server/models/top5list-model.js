const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerEmail: { type: String, required: true },
        userName: { type: String },
        likes: { type: Number },
        dislikes: { type: Number },
        comments: {type: [{userName: {type: String}, text: {type: String}}]},
        published: { type: String },
        views: { type: Number }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
