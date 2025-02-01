import axios from "axios";
import { globalConstants } from "../utils/Constants";

const baseUrl = globalConstants.BASE_URL;

export async function getChannels(user) {
  try {
    const response = await axios.get(`${baseUrl}/users/${user.id}/channels`);
    if (response.data.code === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch channels");
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getChannelMembers(channel) {
  try {
    const response = await axios.get(
      `${baseUrl}/channels/${channel.id}/members`
    );
    if (response.data.code === 200) {
      return response.data.map((member) => {
        return {
          ...member.user,
          role: member.role,
        };
      });
    }
    throw new Error("Failed to fetch channel members");
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function removeGuest(channelId, ownerId, guestId) {
  try {
    const response = await axios.delete(
      `${baseUrl}/channels/${channelId}/remove`,
      null,
      {
        params: { ownerId, guestId },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function promoteToAdmin(channelId, ownerId, guestId) {
  try {
    await axios.post(
      `${baseUrl}/channels/${channelId}/make-admin`,
      null,
      {
        params: { ownerId, guestId },
      }
    );
    throw new Error("Failed to promote guest to admin");
  } catch (error) {
    console.log(error);
  }
}

export async function addGuest(channelId, userId, guestId) {
  try {
    await axios.post(`${baseUrl}/channels/${channelId}/add`, null, {
      params: { userId, guestId },
    });

    throw new Error("Failed to add guest");
  } catch (error) {
    console.log(error);
  }
}

export async function changeChannelName(channelId, ownerId, newName) {
  try {
    const response = await axios.put(
      `${baseUrl}/channels`,
      { id: channelId, name: newName },
      { params: { ownerId } }
    );

    if (response.data.code === 200) {
      return response.data.message;
    }
    throw new Error("Failed to change channel name");
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createChannel(userId, channelName) {
  try {
    const response = await axios.post(`${baseUrl}/channels?userId=${userId}`, {
      name: channelName,
    });
    if (response.data.code === 201 || response.data.code === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error creating channel:", error);
    throw error;
  }
}

export async function deleteChannel(channelId, userId) {
  try {
    await axios.delete(`${baseUrl}/channels/${channelId}`, {
      params: { userId },
    });
  } catch (error) {
    console.error("Error deleting channel:", error);
    throw error;
  }
}