import React, { useEffect, useState } from "react";
import ListCart from "./Component/ListCart";
import alertify from "alertifyjs";
import { Link, Redirect } from "react-router-dom";
import CartAPI from "../API/CartAPI";
import queryString from "query-string";
import convertMoney from "../convertMoney";
import ProductAPI from "../API/ProductAPI";

function Cart(props) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState();
  const [updateListCart, setUpdateListCart] = useState([]);

  //State dùng để Load dữ liệu từ API
  const [loadAPI, setLoadAPI] = useState(false);

  //Hàm này dùng để tính tổng tiền carts
  function getTotal(carts) {
    let sub_total = 0;

    const sum_total = carts.map((value) => {
      return (sub_total +=
        parseInt(value.priceProduct) * parseInt(value.count));
    });

    setTotal(sub_total);
  }

  //Hàm này dùng để load dữ liệu từ API
  //Khi người dùng đã đăng nhập
  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("id_user")) {
        const params = {
          idUser: localStorage.getItem("id_user"),
        };

        const query = "?" + queryString.stringify(params);

        console.log("query-->", query);

        const response = await CartAPI.getCarts(query);

        setCart(response);

        getTotal(response);
      }
    };

    fetchData();

    setLoadAPI(false);
  }, [loadAPI]);

  //Hàm này dùng để truyền xuống cho component con xử và trả ngược dữ liệu lại component cha
  const onDeleteCart = (getUser, getProduct) => {
    console.log("idUser: " + getUser + ", idProduct: " + getProduct);

    if (localStorage.getItem("id_user")) {
      // user đã đăng nhập

      //Sau khi nhận được dữ liệu ở component con truyền lên thì sẽ gọi API xử lý dữ liệu
      const fetchDelete = async () => {
        const params = {
          idUser: getUser,
          idProduct: getProduct,
        };

        const query = "?" + queryString.stringify(params);

        const response = await CartAPI.deleteToCart(query);
        console.log("response-->", response);
      };

      fetchDelete();

      //Sau đó thay đổi state loadAPI và load lại hàm useEffect
      setLoadAPI(true);

      alertify.set("notifier", "position", "bottom-left");
      alertify.error("Bạn Đã Xóa Hàng Thành Công!");
    }
  };

  //Hàm này dùng để redirect đến page checkout
  const [redirect, setRedirect] = useState(false);

  const onCheckout = () => {
    if (updateListCart && updateListCart.length > 0) {
      const idProductList = updateListCart.map((item) => {
        return item.idProduct;
      });
      // console.log("idProductList-->", idProductList);
      const countList = updateListCart.map((item) => {
        return parseInt(item.count);
      });
      console.log("countList", countList);

      const idCartList = updateListCart.map((item) => {
        return item._id;
      });
      const updateProductQuantity = async () => {
        try {
          const data = {
            idProductList: idProductList,
            countList: countList,
          };
          const response = await ProductAPI.updateProductQuantity(data);
          if (response) {
            console.log("response-->", response);
          } else {
            alert("Update Product Quantity unsuccessful!");
          }
        } catch (error) {
          console.log(error);
        }
        // fetch(`http://localhost:3500/api/product/updateQuantity`, {
        //   method: "PUT",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     idProductList: idProductList,
        //     countList: countList,
        //   }),
        // })
        //   .then((res) => {
        //     return res.json();
        //   })
        //   .then((data) => {
        //     if (data) {
        //       console.log("data-->", data);
        //     } else {
        //       alert("Update Product Quantity unsuccessful!");
        //     }
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
      };
      const updateCartCount = async () => {
        try {
          const data = {
            idCartList: idCartList,
            countList: countList,
          };
          const response = await CartAPI.updateCartCount(data);
          if (response) {
            console.log("response-->", response);
          } else {
            alert("Update Cart count unsuccessful!");
          }
        } catch (error) {
          console.log(error);
        }
        // fetch(`http://localhost:3500/api/carts/update`, {
        //   method: "PUT",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     idCartList: idCartList,
        //     countList: countList,
        //   }),
        // })
        //   .then((res) => {
        //     return res.json();
        //   })
        //   .then((data) => {
        //     if (data) {
        //       console.log("data-->", data);
        //     } else {
        //       alert("Update Cart count unsuccessful!");
        //     }
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
      };
      updateCartCount();
      updateProductQuantity();
    } else {
      const idProductList = cart.map((item) => {
        return item.idProduct;
      });
      const countList = cart.map((item) => {
        return parseInt(item.count);
      });
      console.log("countList", countList);
      const idCartList = cart.map((item) => {
        return item._id;
      });
      const updateProductQuantity = async () => {
        try {
          const data = {
            idProductList: idProductList,
            countList: countList,
          };
          const response = await ProductAPI.updateProductQuantity(data);
          if (response) {
            console.log("response-->", response);
          } else {
            alert("Update Product Quantity unsuccessful!");
          }
        } catch (error) {
          console.log(error);
        }
        // fetch(`http://localhost:3500/api/product/updateQuantity`, {
        //   method: "PUT",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     idProductList: idProductList,
        //     countList: countList,
        //   }),
        // })
        //   .then((res) => {
        //     return res.json();
        //   })
        //   .then((data) => {
        //     if (data) {
        //       console.log("data-->", data);
        //     } else {
        //       alert("Update Product Quantity unsuccessful!");
        //     }
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
      };
      const updateCartCount = async () => {
        try {
          const data = {
            idCartList: idCartList,
            countList: countList,
          };
          const response = await CartAPI.updateCartCount(data);
          if (response) {
            console.log("response-->", response);
          } else {
            alert("Update Cart count unsuccessful!");
          }
        } catch (error) {
          console.log(error);
        }
        // fetch(`http://localhost:3500/api/carts/update`, {
        //   method: "PUT",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     idCartList: idCartList,
        //     countList: countList,
        //   }),
        // })
        //   .then((res) => {
        //     return res.json();
        //   })
        //   .then((data) => {
        //     if (data) {
        //       console.log("data-->", data);
        //     } else {
        //       alert("Update Cart count unsuccessful!");
        //     }
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
      };
      updateCartCount();
      updateProductQuantity();
    }

    if (!localStorage.getItem("id_user")) {
      alertify.set("notifier", "position", "bottom-left");
      alertify.error("Vui Lòng Kiểm Tra Lại Đăng Nhập!");
      return;
    }

    if (cart.length === 0) {
      alertify.set("notifier", "position", "bottom-left");
      alertify.error("Vui Lòng Kiểm Tra Lại Giỏ Hàng!");
      return;
    }

    setRedirect(true);
  };

  return (
    <div className="container">
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
            <div className="col-lg-6">
              <h1 className="h2 text-uppercase mb-0">Cart</h1>
            </div>
            <div className="col-lg-6 text-lg-right">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                  <li className="breadcrumb-item active" aria-current="page">
                    Cart
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <h2 className="h5 text-uppercase mb-4">Shopping cart</h2>
        <div className="row">
          <div className="col-lg-8 mb-4 mb-lg-0">
            {cart && cart.length > 0 && (
              <ListCart
                listCart={cart}
                onDeleteCart={onDeleteCart}
                setUpdateListCart={setUpdateListCart}
              />
            )}

            <div className="bg-light px-4 py-3">
              <div className="row align-items-center text-center">
                <div className="col-md-6 mb-3 mb-md-0 text-md-left">
                  <Link className="btn btn-link p-0 text-dark btn-sm" to={`/`}>
                    <i className="fas fa-long-arrow-alt-left mr-2"> </i>
                    Continue shopping
                  </Link>
                </div>
                <div className="col-md-6 text-md-right">
                  {redirect && <Redirect to={"/checkout"} />}
                  <span
                    className="btn btn-outline-dark btn-sm"
                    onClick={onCheckout}
                  >
                    Proceed to checkout
                    <i className="fas fa-long-arrow-alt-right ml-2"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card border-0 rounded-0 p-lg-4 bg-light">
              <div className="card-body">
                <h5 className="text-uppercase mb-4">Cart total</h5>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex align-items-center justify-content-between">
                    <strong className="text-uppercase small font-weight-bold">
                      Subtotal
                    </strong>
                    <span className="text-muted small">
                      {convertMoney(total)} VND
                    </span>
                  </li>
                  <li className="border-bottom my-2"></li>
                  <li className="d-flex align-items-center justify-content-between mb-4">
                    <strong className="text-uppercase small font-weight-bold">
                      Total
                    </strong>
                    <span>{convertMoney(total)} VND</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart;
