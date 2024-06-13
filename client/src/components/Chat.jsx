import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chat.css';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [fromUser, setFromUser] = useState('');
  const [toUser, setToUser] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editMessageId, setEditMessageId] = useState(null);

  const baseURL = `http://localhost:3000/api`;

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${baseURL}/get`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    try {
      await axios.post(`${baseURL}/save`, {
        from: fromUser,
        to: toUser,
        message: newMessage,
      });
      setNewMessage('');
      setFromUser('');
      setToUser('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const updateMessage = async () => {
    try {
      if (editMode && editMessageId) {
        await axios.put(`${baseURL}/update/${editMessageId}`, {
          from: fromUser,
          to: toUser,
          message: newMessage
        });
        setEditMode(false);
        setEditMessageId(null);
        setNewMessage('');
        setFromUser('');
        setToUser('');
        fetchMessages();
      }
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const handleSendButtonClick = () => {
    console.log('Send button clicked');
    if (editMode) {
      updateMessage();
    } else {
      sendMessage();
    }
  };

  const handleEditButtonClick = (messageId, from, to, message) => {
    setEditMode(true);
    setEditMessageId(messageId);
    setFromUser(from);
    setToUser(to);
    setNewMessage(message);
  };

  const handleDeleteButtonClick = async (messageId) => {
    try {
      await axios.delete(`${baseURL}/delete/${messageId}`);
      fetchMessages(); // Refresh messages on successful deletion
    } catch (error) {
      console.error('Error deleting message:', error);
      if (error.response) {
        console.log('Response data:', error.response.data); // Log the specific error message from the server
        console.log('Response status:', error.response.status); // Log the HTTP status code
      }
      // Handle the error in the UI (e.g., show a message to the user)
    }
  };
  
  
  
  const cancelEdit = () => {
    setEditMode(false);
    setEditMessageId(null);
    setNewMessage('');
    setFromUser('');
    setToUser('');
  };

  return (
    <div className="chat-container">
      <div><h1>CHAT COMMUNITY</h1></div>
      <div className="input-group">
        <label>From:</label><br />
        <input
          type="text"
          value={fromUser}
          onChange={(e) => setFromUser(e.target.value)}
          placeholder="From"
          required={!editMode}
        /><br />
        <label>To:</label><br />
        <input
          type="text"
          value={toUser}
          onChange={(e) => setToUser(e.target.value)}
          placeholder="To"
          required={!editMode}
        />
        <textarea
          rows={6}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          required={!editMode}
        /><br />
        {editMode ? (
          <div>
            <button className="savebutton" onClick={updateMessage}>Update</button>
            <button className="savebutton" onClick={cancelEdit}>Cancel</button>
          </div>
        ) : (
          <button className="sendbutton" onClick={handleSendButtonClick}>Send</button>
        )}
      </div>
      <div className="messagecontainer">
        {messages.map((message) => (
          <div key={message.id} className="message-card">
            <div className="message-info">
              <div>
                <strong>ID: </strong>{message._id}<br/>
                <strong>From:</strong> {message.from}<br />
                <strong>To:</strong> {message.to}
              </div>
            </div>
            <div className="message-content">
              <strong>Message:</strong><br />
              {message.message}
              <div>
                <button className="ext-but" onClick={() => handleEditButtonClick(message._id, message.from, message.to, message.message)}>Edit</button>
                <button className="ext-but" onClick={() => handleDeleteButtonClick(message._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
