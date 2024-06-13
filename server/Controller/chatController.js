const chatModel = require('../models/chatmodel');

module.exports.getChat = async (req, res) => {
    try {
        const chat = await chatModel.find();
        res.send(chat);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while retrieving chats.");
    }
};

module.exports.saveChat = async (req, res) => {
    try {
        const { from, to, message } = req.body;

        if (!from || !to || !message) {
            return res.status(400).send("All fields (from, to, message) are required.");
        }

        const newChat = await chatModel.create({ from, to, message });
        console.log("Added successfully");
        res.send(newChat);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while saving the chat.");
    }
};

module.exports.updateChat = async (req, res) => {
    try {
        const { id } = req.params;
        const { from, to, message } = req.body;

        if (!id || !from || !to || !message) {
            return res.status(400).send("ID and all fields (from, to, message) are required.");
        }

        console.log("update is called");
        const updatedChat = await chatModel.findByIdAndUpdate(id, { from, to, message }, { new: true });

        if (!updatedChat) {
            return res.status(404).send("Chat not found.");
        }

        res.send("Updated successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while updating the chat.");
    }
};

exports.deleteChat = async (req, res) => {
    const messageId = req.params.id;
  
    try {
      // Example: Delete a message by its ID from MongoDB
      const deletedMessage = await chatModel.findByIdAndDelete(messageId);
  
      if (!deletedMessage) {
        return res.status(404).json({ error: 'Message not found' });
      }
  
      // Respond with success message if deleted
      res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
      console.error('Error deleting message:', error);
      res.status(500).json({ error: 'An error occurred while deleting the message' });
    }
  };