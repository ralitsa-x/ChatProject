import axios from "axios";
import { globalConstants } from "../utils/Constants";

const baseUrl = globalConstants.BASE_URL;

export async function getUsers() {
  try {
    const response = await axios.get(`${baseUrl}/users`);

    if (response.data.code === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function addFriend(currentUserId, friendId) {
  try {
    const response = await axios.post(`${baseUrl}/add-friend`, null, {
      params: { currentUserId, friendId },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding friend:", error);
    throw error;
  }
}