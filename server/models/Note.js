const mongoose = require('mongoose')

const Note = mongoose.model('Note', {
  date: String,
  title: String,
  content: String,
  tag: String,
  recording: String,
  hasRecording: Boolean
})

module.exports = Note
