import axiosClient from "./axiosClient";

const ProductAPI = {
  updateProductQuantity: (data) => {
    const url = "/product/updateQuantity";
    return axiosClient.put(url, data);
  },
  getProductDetail: (id) => {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },

  getAllProduct: () => {
    const url = "/product/getAllProducts";
    return axiosClient.get(url);
  },
};

export default ProductAPI;
