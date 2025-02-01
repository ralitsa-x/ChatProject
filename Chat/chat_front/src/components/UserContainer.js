import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import * as userService from "../services/UserService";
import { useIdentityContext } from "../utils/UseIdentitycontext";

const UsersContainer = ({ friends = [], onAddFriend }) => {
  const [users, setUsers] = useState([]);
  const { user } = useIdentityContext();


  useEffect(() => {
    if (!user) return;
  
    async function fetchUsers() {
      try {
        const response = await userService.getUsers();
        console.log("API response:", response);
  
        if (Array.isArray(response.data)) {
          
          const filteredUsers = response.data.filter((u) => {
            const isFriend = friends.some((friend) => friend.id === u.id);
            return !isFriend && u.id !== user.id; 
          });
  
          setUsers(filteredUsers);
        } else {
          console.error("Response is not an array:", response);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  
    if (friends && user) {
      fetchUsers();
    }
  }, [friends.length, user?.id]); 

  return (
    <div className="w-3 h-full bg-light p-4">
      <h2>Find Friends</h2>
      <Row>
        {users.map((user) => (
          <Col key={user.id} sm={6} className="mb-3">
            <div className="p-3 border rounded">
              <strong>{user.email}</strong>
              <Button
                variant="primary"
                size="sm"
                className="ml-2"
                onClick={() => onAddFriend(user)}
              >
                Add Friend
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default UsersContainer;