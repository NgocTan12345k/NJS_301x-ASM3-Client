import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import HistoryAPI from "../../API/HistoryAPI";
import convertMoney from "../../convertMoney";

function DetailHistory(props) {
  const { id } = useParams();

  // console.log("id-->", id);

  const [cart, setCart] = useState([]);

  const [information, setInformation] = useState({});

  useEffect(() => {
    const getOrderDetail = async () => {
      // const response = await HistoryAPI.getDetail(id);
      // console.log(response.cart);
      const res = await axios.get(
        `http://localhost:3500/api/order/getOrderDetail/${id}`
      );
      //   console.log("res-->", res);
      const data = res && res.data ? res.data : [];
      setInformation(data);

      // setCart(response.cart);

      // console.log(response);
    };
    const getCartByUser = async () => {
      const idUser = localStorage.getItem("id_user");
      console.log("idUser-->", idUser);
      const res = await axios.get(
        `http://localhost:3500/api/carts?idUser=${idUser}`
      );
      // console.log("res-->", res);
      const data = res && res.data ? res.data : [];
      setCart(data);
    };
    getOrderDetail();
    getCartByUser();
  }, [id]);

  return (
    <div className="container">
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
            <div className="col-lg-6">
              <h1 className="h2 text-uppercase mb-0">Detail Order</h1>
            </div>
            <div className="col-lg-6 text-lg-right">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                  <li className="breadcrumb-item active">Detail</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <div className="p-5">
        <h1 className="h2 text-uppercase">Information Order</h1>
        <p>ID User: {information.idUser}</p>
        <p>Full Name: {information.userName}</p>
        <p>Phone: {information.phone}</p>
        <p>Address: {information.address}</p>
        <p>Total: {convertMoney(information.total)} VND</p>
      </div>

      <div className="table-responsive pt-5 pb-5">
        <table className="table">
          <thead className="bg-light">
            <tr className="text-center">
              <th className="border-0" scope="col">
                {" "}
                <strong className="text-small text-uppercase">
                  ID Product
                </strong>
              </th>
              <th className="border-0" scope="col">
                {" "}
                <strong className="text-small text-uppercase">Image</strong>
              </th>
              <th className="border-0" scope="col">
                {" "}
                <strong className="text-small text-uppercase">Name</strong>
              </th>
              <th className="border-0" scope="col">
                {" "}
                <strong className="text-small text-uppercase">Price</strong>
              </th>
              <th className="border-0" scope="col">
                {" "}
                <strong className="text-small text-uppercase">Count</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {cart &&
              cart.map((value) => (
                <tr className="text-center" key={value.idProduct}>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">{value.idProduct}</h6>
                  </td>
                  <td className="pl-0 border-0">
                    <div className="media align-items-center justify-content-center">
                      <Link
                        className="reset-anchor d-block animsition-link"
                        to={`/detail/${value.idProduct}`}
                      >
                        <img src={value.img} alt="..." width="200" />
                      </Link>
                    </div>
                  </td>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">{value.nameProduct}</h6>
                  </td>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">
                      {convertMoney(value.priceProduct)} VND
                    </h6>
                  </td>
                  <td className="align-middle border-0">
                    <h6 className="mb-0">{value.count}</h6>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DetailHistory;