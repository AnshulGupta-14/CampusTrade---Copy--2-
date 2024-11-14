import { Chat } from "../Models/chat.model.js";
import { User } from "../Models/user.model.js";
import { Message } from "../Models/message.model.js";

export const getChats = async (req, res) => {
  const tokenUserId = req.user;

  try {
    // Find chats where the user is part of the chat
    const chats = await Chat.find({
      userIDs: { $in: [tokenUserId] }, // Find chats that contain the current user
    });

    // Populate receiver data for each chat

    for (const chat of chats) {
      console.log(tokenUserId._id, chat.userIDs[0]);
      let receiver;
      if (tokenUserId._id.equals(chat.userIDs[0])) {
        console.log("Anshu");

        receiver = await User.findById(chat.userIDs[1]).select(
          "fullname avatar"
        ); // Fetch receiver info
      } else {
        receiver = await User.findById(chat.userIDs[0]).select(
          "fullname avatar"
        );
      }

      chat.receiver = receiver;
    }

    res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chats!" });
  }
};

export const getChat = async (req, res) => {
  const tokenUserId = req.user;
  const receiver = req.params.id;

  try {
    const chat = await Chat.findOne({
      userIDs: { $all: [tokenUserId, receiver] },
    }).populate("messages"); // Populate messages for the chat

    // if (!chat) {
    //   return res.status(404).json({ message: 'Chat not found!' });
    // }

    // Update the `seenBy` field to mark the current user as having seen the chat
    if (chat) {
      chat.seenBy.push(tokenUserId);
      await chat.save();
    }

    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

export const addChat = async (req, res) => {
  const tokenUserId = req.user;

  try {
    const { receiverId } = req.body;

    // Create a new chat with two participants
    const newChat = new Chat({
      userIDs: [tokenUserId, receiverId],
      receiver: receiverId,
    });

    await newChat.save();

    res.status(200).json(newChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add chat!" });
  }
};

export const readChat = async (req, res) => {
  const tokenUserId = req.user;

  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      userIDs: { $in: [tokenUserId] },
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found!" });
    }

    // Set `seenBy` to only include the current user
    chat.seenBy = [tokenUserId];
    await chat.save();

    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to read chat!" });
  }
};
