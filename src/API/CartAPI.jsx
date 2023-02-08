import axiosClient from "./axiosClient";

const CartAPI = {
  getCarts: (query) => {
    const url = `/carts${query}`;
    return axiosClient.get(url);
  },

  postAddToCart: (query) => {
    const url = `/carts/add${query}`;
    return axiosClient.post(url);
  },

  deleteToCart: (query) => {
    const url = `/carts/delete${query}`;
    return axiosClient.delete(url);
  },

  putToCart: (query) => {
    const url = `/carts/update${query}`;
    return axiosClient.put(url);
  },

  updateCartCount: (data) => {
    const url = "/carts/update";
    return axiosClient.put(url, data);
  },
  getCartsByUser: (idUser) => {
    const url = `/carts?idUser=${idUser}`;
    return axiosClient.get(url);
  },
};

export default CartAPI;
