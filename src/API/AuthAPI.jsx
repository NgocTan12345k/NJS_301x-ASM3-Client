import axiosClient from "./axiosClient";

const AuthAPI = {
  getAllData: () => {
    const url = "/auth";
    return axiosClient.get(url);
  },

  getDetailData: (id) => {
    const url = `/auth/${id}`;
    return axiosClient.get(url);
  },

  postSignUp: (data) => {
    const url = "/auth/signup";
    return axiosClient.post(url, data);
  },
  postSignIn: (data) => {
    const url = "/auth/login";
    return axiosClient.post(url, data);
  },

  deleteSession: () => {
    const url = "/auth/deleteSession";
    return axiosClient.get(url);
  },
};

export default AuthAPI;
