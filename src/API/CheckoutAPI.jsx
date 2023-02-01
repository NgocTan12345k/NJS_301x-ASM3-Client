import axiosClient from "./axiosClient";

const CheckoutAPI = {
  postOrder: (query) => {
    const url = `/api/order/postOrder${query}`;
    return axiosClient.post(url);
  },
};

export default CheckoutAPI;
