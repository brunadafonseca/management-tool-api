const mongoose = require('../config/database')
const { Schema } = mongoose

const cardSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  // listId: { type: Schema.Types.ObjectId, ref: 'lists' },
})

const listSchema = new Schema({
  title: { type: String, required: true },
  cards: [cardSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const projectSchema = new Schema({
  title: { type: String, required: true },
  lists: [listSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('projects', projectSchema)
