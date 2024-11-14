import mongoose from "mongoose";
const { Schema, model } = mongoose;

const chatSchema = new Schema({
  userIDs: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  seenBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  lastMessage: { type: String, default: null },
  receiver:{
    type:Schema.Types.ObjectId,
    ref:'User'
  }
},{timestamps:true});

export const Chat = model('Chat', chatSchema);
