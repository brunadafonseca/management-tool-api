const mongoose = require('../config/database')
const { Schema } = mongoose

const defaultPhases = [
  { title: 'Flowcharts', id: 1 },
  { title: 'Wireframes', id: 2 },
  { title: 'Prototype', id: 3 },
  { title: 'Development', id: 4 },
  { title: 'Test', id: 5 },
  { title: 'Launch', id: 6 },
]

const tileSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  phaseId: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const projectSchema = new Schema({
  title: { type: String, required: true },
  phases: { type: Array, default: defaultPhases },
  tiles: [tileSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('projects', projectSchema)
