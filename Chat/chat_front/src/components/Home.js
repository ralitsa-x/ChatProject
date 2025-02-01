import React, { useEffect, useState } from "react";
import { Col, Button, Modal, Form, Row, Container, Card } from "react-bootstrap";
import SideContent from "../components/SideContent";
import ChatContainer from "../components/ChatContainer";
import { useIdentityContext } from "../utils/UseIdentitycontext";
import * as userService from "../services/UserService";
import * as channelService from "../services/ChannelService";
import * as messageService from "../services/MessageService";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [channels, setChannels] = useState([]);
  const [friends, setFriends] = useState([]);
  const [channelMembers, setChannelMembers] = useState([]);
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const { user } = useIdentityContext();

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await userService.getUsers();
        const users = result.data;
        const currentUserId = users.find((u) => user.id === u.id);

        const resF = await userService.getFriendsToUser(currentUserId.id);
        const friends = resF.data;
        if (Array.isArray(friends)) {
          setFriends(friends);
        }

        const res = await channelService.getChannels(currentUserId);
        const channels = res.data;
        if (Array.isArray(channels)) {
          setChannels(channels);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [user]);

  const handleSelect = async (channelName) => {
    try {
      const currentUserId = user.id;

      const channel = channels.find((ch) => ch.name === channelName);
      if (channel) {
        setSelectedChannelId(channel.id);
        const messages = await messageService.getMessages(channel.id);
        setMessages(messages);
        const members = await channelService.getChannelMembers(channel.id);
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
      const newChannel = await channelService.createChannel(
        user.id,
        newChannelName
      );
      setChannels((prevChannels) => [...prevChannels, newChannel]);
      setShowCreateChannelModal(false);
      setNewChannelName("");
      handleSelect(newChannel.id);
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };

  const handleAddFriend = async (friendId) => {
    try {
      await userService.addFriend(user.id, friendId);

      const updatedUsers = await userService.getUsers();
      const currentUser = updatedUsers.find((u) => u.id === user.id);

      if (currentUser) {
        setFriends(currentUser);
      }

      const updatedChannels = await channelService.getChannels(user.id);
      setChannels(updatedChannels);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
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
    <Container fluid className="p-4">
      <Row className="g-4">
        <Col md={3} className="">
          <Card className="h-100"> 
            <Card.Header className="bg-black text-white">
              <h4>Channels & Friends</h4>
            </Card.Header>
            <Card.Body>
              <SideContent
                channels={channels}
                friends={friends}
                onSelect={handleSelect}
                onFindFriends={handleAddFriend}
                onCreateChannel={() => setShowCreateChannelModal(true)}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={9}>
          <Card className="h-100">
            <Card.Header className="bg-success text-white">
              <h4>Chat</h4>
            </Card.Header>
            <Card.Body className="d-flex flex-column">
              <ChatContainer
                channelName={
                  channels ? channels.find((c) => c.id === selectedChannelId) : null
                }
                channelMembers={channelMembers}
                isOwner={channelMembers.some(
                  (u) => u.id === user.id && u.role.id === "OWNER"
                )}
                isAdmin={channelMembers.some(
                  (u) => u.id === user.id && u.role.id === "ADMIN"
                )}
                messages={messages}
                friends={friends}
                onSendMessage={handleSendMessage}
                onDeleteChannel={handleDeleteChannel}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
