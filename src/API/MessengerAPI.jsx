import axiosClient from "./axiosClient";

const MessengerAPI = {
  getMessage: (query) => {
    const url = `/messenger/${query}`;
    return axiosClient.get(url);
  },

  postMessage: (query) => {
    const url = `/messenger/send${query}`;
    return axiosClient.post(url);
  },

  postConversation: (query) => {
    const url = `/messenger/conversation${query}`;
    return axiosClient.post(url);
  },

  deleteMessenger: (roomId) => {
    const url = `/messenger/deleteMessenger${roomId}`;
    return axiosClient.delete(url);
  },
};

export default MessengerAPI;
