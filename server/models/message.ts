const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
  chat_id: String,
  from: { email: String, first_name: String, profile_photo: String },
  timestamp: Date,
  content: String
})

const Message = mongoose.model('Message', MessageSchema)
export = Message
