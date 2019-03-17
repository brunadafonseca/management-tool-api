const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/projects', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('Successfully connected to MongoDB!')
})

module.exports = mongoose
