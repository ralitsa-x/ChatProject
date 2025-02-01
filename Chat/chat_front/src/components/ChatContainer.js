import React, { useEffect, useState } from "react";
import { Col, Row, Button, Modal } from "react-bootstrap";

const ChatContainer = ({
  channelName,
  channelMembers,
  isOwner,
  isAdmin,
  messages,
  friends,
  onSendMessage,
  onRemoveGuest,
  onPromoteToAdmin,
  onAddGuestMember,
  onChangeChannelName,
  onDeleteChannel,
}) => {
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [nonMembers, setNonMembers] = useState([]);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedChannelName, setEditedChannelName] = useState(channelName);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const memberIds = channelMembers.map((member) => member.id);
        const filteredUsers = friends.filter(
          (user) => !memberIds.includes(user.id)
        );
        setNonMembers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    if (showModal) {
      fetchUsers();
    }
  }, [showModal, channelMembers, friends]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleInvite = (guestId) => {
    onAddGuestMember(guestId);
    setShowModal(false);
  };

  const handleSaveName = () => {
    onChangeChannelName(editedChannelName);
    setIsEditingName(false);
  };

  return (
    <div className="">
      <div className="w-3/4 h-full flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4">
           {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <strong>
                  <span>{msg.user.email}: </span>
                </strong>
                <span>{msg.content}</span>
              </div>
              ) 
            )
          }
        </div>
      </div>
      <div className="p-3 position-absolute bottom-0 start-0 w-100">
        <form onSubmit={handleSubmit} className="flex">
          <div class="input-group mb-3">
            <input 
              type="text" 
              class="form-control" 
              placeholder="Enter your message..." 
              aria-describedby="basic-addon2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}/>
            <div class="input-group-append">
              <Button 
                class="btn btn-success ml-5" 
                type="submit">Send
              </Button>
            </div>
          </div>
        </form> 
      </div>
    </div>
  );
};

export default ChatContainer;