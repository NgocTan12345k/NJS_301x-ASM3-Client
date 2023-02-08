import axiosClient from "./axiosClient";
const UserAPI = {
  getId_userByRoomId: (roomId) => {
    const url = `/users/${roomId}`;
    return axiosClient.get(url);
  },
};

export default UserAPI;
