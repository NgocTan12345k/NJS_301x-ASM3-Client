import axiosClient from "./axiosClient";

const OrderAPI = {
  getOrder: (idUser) => {
    const url = `/order/getOrder?idUser=${idUser}`;
    return axiosClient.get(url);
  },
  getOrderDetail: (id) => {
    const url = `/order/getOrderDetail/${id}`;
    return axiosClient.get(url);
  },
};

export default OrderAPI;
