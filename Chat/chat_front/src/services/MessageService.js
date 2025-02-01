import axios from "axios";
import { globalConstants } from "../utils/Constants";

const baseUrl = globalConstants.BASE_URL;

export async function getMessages(channel) {
  try {
    const response = await axios.get(
      `${baseUrl}/channels/${channel.id}/messages`
    );

    if (response.data.code === 200 || response.data.code === 201) {
      return response.data;
    } else {
      throw new Error("Failed to fetch messages");
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function sendMessage(messagePayload) {
  try {
    const response = await axios.post(`${baseUrl}/messages`, messagePayload);
    if (response.data.code === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch messages");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}