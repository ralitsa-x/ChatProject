import React, { useEffect, useState } from "react";
import { Col, Button, Modal, Form } from "react-bootstrap";
import SideContent from "../components/SideContent";
import ChatContainer from "../components/ChatContainer";
import UsersContainer from "../components/UserContainer";
import { useIdentityContext } from "../utils/UseIdentitycontext";
import * as userService from "../services/UserService";
import * as channelService from "../services/ChannelService";
import * as messageService from "../services/MessageService";
import { chatTypes, roles, views } from "../utils/Constants";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [channels, setChannels] = useState([]);
  const [friends, setFriends] = useState([]);
  const [channelMembers, setChannelMembers] = useState([]);
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  const [view, setView] = useState(views.CHANNELS);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const { user } = useIdentityContext();

  useEffect(() => {
    async function fetchData() {
      try {
        
        const result = await userService.getUsers();
        const users = result.data;
        console.log(users);
        const currentUserId = users.find((u) => user.id === u.id);
        console.log(currentUserId);

        if (currentUserId) {
          setFriends(currentUserId.friendshipsInitiatedUsers);
        }

        const channels = await channelService.getChannels(currentUserId);
        setChannels(channels);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [user]);

  const handleSelect = async (id, type) => {
    try {
      const currentUserId = user;

      if (type === chatTypes.FRIEND) {
        const smallerId = Math.min(currentUserId, id);
        const largerId = Math.max(currentUserId, id);
        const channelName = `${smallerId}-${largerId}`;

        const channel = channels.find((ch) => ch.name === channelName);
        if (channel) {
          setSelectedChannelId(channel.id);
          const messages = await messageService.getMessages(channel.id);
          setMessages(messages);

          const members = await channelService.getChannelMembers(channel.id);
          setChannelMembers(members);
        }
      } else if (type === chatTypes.CHANNEL) {
        setSelectedChannelId(id);
        const messages = await messageService.getMessages(id);
        setMessages(messages);

        const members = await channelService.getChannelMembers(id);
        setChannelMembers(members);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = async (content) => {
    try {
      if (!selectedChannelId) {
        return;
      }

      const messagePayload = {
        content,
        channelId: selectedChannelId,
        userId: user.id,
      };
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...messagePayload, user, timestamp: new Date().toISOString() },
      ]);
      await messageService.sendMessage(messagePayload);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleCreateChannel = async () => {
    try {
      console.log("User:", user); // Add this for debugging
  console.log("User ID:", user?.id); 
      const newChannel = await channelService.createChannel(
        user.id,
        newChannelName
      );
      setChannels((prevChannels) => [...prevChannels, newChannel]);
      setShowCreateChannelModal(false);
      setNewChannelName("");
      handleSelect(newChannel.id, chatTypes.CHANNEL);
      setView(views.CHANNELS);
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };

  const handleFindFriends = () => {
    setView(views.USERS);
  };

  const handleChannels = () => {
    setView(views.CHANNELS);
  };

  const handleDeleteChannel = async () => {
    try {
      if (!selectedChannelId) {
        return;
      }

      await channelService.deleteChannel(selectedChannelId, user.id);
      setChannels((prevChannels) =>
        prevChannels.filter((channel) => channel.id !== selectedChannelId)
      );
      setSelectedChannelId(null);
      setMessages([]);
      setChannelMembers([]);
    } catch (error) {
      console.error("Error deleting channel:", error);
    }
  };

  useEffect(() => {
    if (selectedChannelId) {
      const interval = setInterval(async () => {
        try {
          const messages = await messageService.getMessages(selectedChannelId);
          setMessages(messages);
        } catch (error) {
          console.error(error);
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [selectedChannelId]);

  return (
    <div className="d-flex w-100">
      <Col sm={2}>
        <SideContent
          channels={channels}
          friends={friends}
          onSelect={handleSelect}
          onFindFriends={
            view === views.CHANNELS ? handleFindFriends : handleChannels
          }
          onCreateChannel={() => setShowCreateChannelModal(true)}
          view={view}
        />
      </Col>
      <Col sm={10}>
        {view === views.CHANNELS ? (
          <ChatContainer
            channelName={
              channels.find((ch) => ch.id === selectedChannelId)?.name
            }
            channelMembers={channelMembers}
            isOwner={channelMembers.some(
              (u) => u.id === user.id && u.role.id === roles.OWNER
            )}
            isAdmin={channelMembers.some(
              (u) => u.id === user.id && u.role.id === roles.ADMIN
            )}
            messages={messages}
            friends={friends}
            onSendMessage={handleSendMessage}
            onDeleteChannel={handleDeleteChannel}
          />
        ) : (
          <UsersContainer friends={friends} />
        )}
      </Col>

      <Modal
        show={showCreateChannelModal}
        onHide={() => setShowCreateChannelModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="channelName">
            <Form.Label>Channel Name</Form.Label>
            <Form.Control
              type="text"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
              placeholder="Enter channel name"
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowCreateChannelModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateChannel}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;