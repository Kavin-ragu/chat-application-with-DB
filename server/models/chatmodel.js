
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  from: String,
  to: String,
  message: String
});

const ChatModel = mongoose.model('Chat', chatSchema);

module.exports = ChatModel;