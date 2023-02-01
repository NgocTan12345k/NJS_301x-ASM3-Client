import axiosClient from "./axiosClient";

const MessengerAPI = {
  getMessage: (query) => {
    const url = `/api/messenger/${query}`;
    return axiosClient.get(url);
  },

  postMessage: (query) => {
    const url = `/api/messenger/send${query}`;
    return axiosClient.post(url);
  },

  postConversation: (query) => {
    const url = `/api/messenger/conversation${query}`;
    return axiosClient.post(url);
  },
};

export default MessengerAPI;
