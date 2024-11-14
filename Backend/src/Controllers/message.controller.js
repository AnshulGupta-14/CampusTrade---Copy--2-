import {Chat} from '../Models/chat.model.js';
import {Message} from '../Models/message.model.js';

export const addMessage = async (req, res) => {
  console.log(req.params);
  
  const tokenUserId = req.user;
  const chatId = req.params.chatId;
  const text = req.body.text;

  if(!chatId) {
    console.log("Am");
    return;
  }

  try {
    // Find the chat that includes the current user (tokenUserId) and matches the chatId
    const chat = await Chat.findOne({
      _id: chatId,
      userIDs: { $in: [tokenUserId] }, // Ensure the current user is part of the chat
    });

    if (!chat) return res.status(404).json({ message: "Chat not found!" });

    // Create a new message in the Message model
    const message = new Message({
      text,
      chatId,
      userId: tokenUserId,
    });

    await message.save(); // Save the new message to the database

    // Update the chat with the new message and mark the current user as having seen it
    chat.messages.push(message);
    chat.seenBy = [tokenUserId]; // Set `seenBy` to include only the current user (for now)
    chat.lastMessage = text; // Update the last message with the new text
    await chat.save(); // Save the updated chat document

    res.status(200).json(message); // Return the created message
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add message!" });
  }
};
