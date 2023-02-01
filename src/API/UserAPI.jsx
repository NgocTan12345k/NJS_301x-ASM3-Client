import axiosClient from "./axiosClient";

const UserAPI = {
  getAllData: () => {
    const url = "/auth";
    return axiosClient.get(url);
  },

  getDetailData: (id) => {
    const url = `/auth/${id}`;
    return axiosClient.get(url);
  },

  postSignUp: (query) => {
    const url = `/auth/signup/${query}`;
    return axiosClient.post(url);
  },
};

export default UserAPI;
