import axiosClient from "./axiosClient";

const CheckoutAPI = {
  postOrder: (data) => {
    const url = "/order/postOrder";
    return axiosClient.post(url, data);
  },
};

export default CheckoutAPI;
