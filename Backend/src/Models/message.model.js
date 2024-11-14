import mongoose from "mongoose";
const { Schema, model } = mongoose;

const messageSchema = new Schema({
  text: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Message = model('Message', messageSchema);
// module.exports = Message;
