import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import alertify from "alertifyjs";
import { addCart } from "../Redux/Action/ActionCart";
import CartAPI from "../API/CartAPI";
import queryString from "query-string";
import convertMoney from "../convertMoney";
import ProductAPI from "../API/ProductAPI";

function Detail(props) {
  const [detail, setDetail] = useState({});

  const dispatch = useDispatch();

  //id params cho từng sản phẩm
  const { id } = useParams();

  //id_user được lấy từ redux
  const id_user = useSelector((state) => {
    return state.Cart.id_user;
  });

  //listCart được lấy từ redux
  // const listCart = useSelector((state) => state.Cart.listCart);
  // console.log("listCart-->", listCart);

  const [product, setProduct] = useState([]);

  // id_user đã đăng nhập
  // const idUser = useSelector((state) => state.Session.idUser);

  useEffect(() => {
    //Hàm này để lấy dữ liệu chi tiết sản phẩm
    const getProductDetail = async () => {
      try {
        const response = await ProductAPI.getProductDetail(id);
        setDetail(response);
      } catch (error) {
        console.log(error);
      }
      // const res = await axios.get(`http://localhost:3500/api/product/${id}`);
      // const response = res && res.data ? res.data : [];
      // console.log("res-->", res);
    };
    const getAllProducts = async () => {
      try {
        const response = await ProductAPI.getAllProduct();
        setProduct(response);
      } catch (error) {
        console.log(error);
      }
      // const res = await axios.get(
      //   "http://localhost:3500/api/product/getAllProducts"
      // );
      // const data = res && res.data ? res.data : [];
    };
    getProductDetail();
    getAllProducts();
  }, [id]);

  //Phần này là để thay đổi số lượng khi mua sản phẩm
  const [text, setText] = useState(1);
  const onChangeText = (e) => {
    setText(e.target.value);
  };

  //Tăng lên 1 đơn vị
  const upText = () => {
    const value = parseInt(text) + 1;

    setText(value);
  };

  //Giảm 1 đơn vị
  const downText = () => {
    const value = parseInt(text) - 1;

    if (value === 0) return;

    setText(value);
  };

  //Phần này dùng để xem review hay description
  const [review, setReview] = useState("description");
  const handlerReview = (value) => {
    setReview(value);
  };

  // console.log("detail-->", detail);
  //Hàm này là Thêm Sản Phẩm
  const addToCart = () => {
    let id_user_cart = "";

    if (localStorage.getItem("id_user")) {
      id_user_cart = localStorage.getItem("id_user");
    } else {
      id_user_cart = id_user;
    }

    // console.log("id_user_cart-->", id_user_cart);

    if (localStorage.getItem("id_user")) {
      console.log("Bạn Đã Đăng Nhập!");

      if (detail.quantity === 0) {
        alert("Products in stock are out of stock!");
        return;
      } else {
        console.log("text-->", text);
        const data = {
          idUser: id_user_cart,
          idProduct: detail._id,
          nameProduct: detail.name,
          priceProduct: detail.price,
          count: text,
          img: detail.img1,
        };
        const action = addCart(data);
        dispatch(action);
        // console.log("data.quantity", data.quantity);
        if (text > detail.quantity) {
          alert(
            "You cannot order more products than the number of products left in stock"
          );
          return;
        } else {
          // const updateQuantity = parseInt(detail.quantity) - parseInt(text);
          // console.log("updateQuantity-->", updateQuantity);
          const fetchPost = async () => {
            const params = {
              idUser: id_user_cart, //localStorage.getItem('id_user')
              idProduct: detail._id, // Lấy idProduct
              count: text, // Lấy số lượng
            };

            const query = "?" + queryString.stringify(params);
            const response = await CartAPI.postAddToCart(query);
            console.log("response-->", response);
          };
          // const updateProduct = () => {
          //   fetch(`http://localhost:3500/api/product/update/${id}`, {
          //     method: "PUT",
          //     headers: { "Content-Type": "application/json" },
          //     body: JSON.stringify({ quantity: updateQuantity }),
          //   })
          //     .then((res) => {
          //       return res.json();
          //     })
          //     .then((data) => {
          //       if (data) {
          //         alertify.set("notifier", "position", "bottom-left");
          //         alertify.success("Bạn Đã Thêm Hàng Thành Công!");
          //         setDetail(data);
          //       } else {
          //         alert("Update Product unsuccessful!");
          //       }
          //     })
          //     .catch((error) => {
          //       console.log(error);
          //     });
          // };
          // updateProduct();
          fetchPost();
        }
      }
    } else {
      // const action = addCart(data);
      // console.log("action-->", action);
      // dispatch(action);
      alert("You need to be logged in to continue shopping");
      window.location.assign("https://njs-301x-asm3-client.vercel.app/signin");
    }

    // alertify.set("notifier", "position", "bottom-left");
    // alertify.success("Bạn Đã Thêm Hàng Thành Công!");

    // if (detail.quantity === 0) {
    //   alert("Products in stock are out of stock!");
    //   return;
    // } else {
    //   const data = {
    //     idUser: id_user_cart,
    //     idProduct: detail._id,
    //     nameProduct: detail.name,
    //     priceProduct: detail.price,
    //     count: text,
    //     img: detail.img1,
    //   };
    //   console.log("data.quantity", data.quantity)
    //   if (data.quantity > detail.quantity) {
    //     alert("You cannot order more products than the number of products left in stock")
    //     return;
    //   } else {
    //     const action = addCart(data);

    //     dispatch(action);

    //     if (localStorage.getItem("id_user")) {
    //       console.log("Bạn Đã Đăng Nhập!");

    //       const fetchPost = async () => {
    //         const params = {
    //           idUser: id_user_cart, //localStorage.getItem('id_user')
    //           idProduct: detail._id, // Lấy idProduct
    //           count: text, // Lấy số lượng
    //         };

    //         const query = "?" + queryString.stringify(params);

    //         const response = await CartAPI.postAddToCart(query);
    //         console.log("response-->", response);

    //       };
    //       fetchPost();
    //     } else {
    //       window.location.href("/signin");
    //     }
    //     alertify.set("notifier", "position", "bottom-left");
    //     alertify.success("Bạn Đã Thêm Hàng Thành Công!");
    //   }

    // }

    // const data = {
    //   idUser: id_user_cart,
    //   idProduct: detail._id,
    //   nameProduct: detail.name,
    //   priceProduct: detail.price,
    //   count: text,
    //   img: detail.img1,
    // };

    // const action = addCart(data);
    // // const actionAddUser = addUser(data.idUser);
    // // console.log("action-->", action);
    // dispatch(action);
    // // console.log("data-->", data);
    // // console.log("x-->", localStorage.getItem("id_user"));

    // if (localStorage.getItem("id_user")) {
    //   console.log("Bạn Đã Đăng Nhập!");

    //   const fetchPost = async () => {
    //     const params = {
    //       idUser: id_user_cart, //localStorage.getItem('id_user')
    //       idProduct: detail._id, // Lấy idProduct
    //       count: text, // Lấy số lượng
    //     };

    //     // console.log("params-->", params);

    //     const query = "?" + queryString.stringify(params);

    //     // console.log("query-->", query);

    //     const response = await CartAPI.postAddToCart(query);
    //     console.log("response-->", response);
    //     // const action = addCart(data);
    //     // console.log("action-->", action);
    //     // dispatch(action);
    //   };
    //   fetchPost();
    // } else {
    //   // const action = addCart(data);
    //   // console.log("action-->", action);
    //   // dispatch(action);
    //   window.location.href("/signin");
    // }

    // alertify.set("notifier", "position", "bottom-left");
    // alertify.success("Bạn Đã Thêm Hàng Thành Công!");
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-6">
            <div className="row m-sm-0">
              <div className="col-sm-2 p-sm-0 order-2 order-sm-1 mt-2 mt-sm-0">
                <div
                  className="owl-thumbs d-flex flex-row flex-sm-column"
                  data-slider-id="1"
                >
                  <div className="owl-thumb-item flex-fill mb-2 mr-2 mr-sm-0">
                    <img className="w-100" src={detail.img1} alt="..." />
                  </div>
                  <div className="owl-thumb-item flex-fill mb-2 mr-2 mr-sm-0">
                    <img className="w-100" src={detail.img2} alt="..." />
                  </div>
                  <div className="owl-thumb-item flex-fill mb-2 mr-2 mr-sm-0">
                    <img className="w-100" src={detail.img3} alt="..." />
                  </div>
                  <div className="owl-thumb-item flex-fill mb-2 mr-2 mr-sm-0">
                    <img className="w-100" src={detail.img4} alt="..." />
                  </div>
                </div>
              </div>

              <div
                id="carouselExampleControls"
                className="carousel slide col-sm-10 order-1 order-sm-2"
                data-ride="carousel"
              >
                <div className="carousel-inner owl-carousel product-slider">
                  <div className="carousel-item active">
                    <img
                      className="d-block w-100"
                      src={detail.img1}
                      alt="First slide"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block w-100"
                      src={detail.img2}
                      alt="Second slide"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block w-100"
                      src={detail.img3}
                      alt="Third slide"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block w-100"
                      src={detail.img4}
                      alt="Third slide"
                    />
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <br></br>
            <h1>{detail.name}</h1>
            <br></br>
            <p className="text-muted lead">{convertMoney(detail.price)} VND</p>
            <br></br>
            <p className="text-small mb-4">{detail.short_desc}</p>
            <ul className="list-unstyled small d-inline-block">
              <li className="mb-3 bg-white text-muted">
                <strong className="text-uppercase text-dark">Category:</strong>
                <a className="reset-anchor ml-2">{detail.category}s</a>
              </li>
            </ul>
            <div className="row align-items-stretch mb-4">
              <div className="col-sm-5 pr-sm-0">
                <div className="border d-flex align-items-center justify-content-between py-1 px-3 bg-white border-white">
                  <span className="small text-uppercase text-gray mr-4 no-select">
                    Number of orders
                  </span>
                  <div className="quantity">
                    <button
                      className="dec-btn p-0"
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fas fa-caret-left" onClick={downText}></i>
                    </button>
                    <input
                      className="form-control border-0 shadow-0 p-0"
                      type="text"
                      value={text}
                      onChange={onChangeText}
                    />
                    <button
                      className="inc-btn p-0"
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fas fa-caret-right" onClick={upText}></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-sm-3 pl-sm-0">
                <a
                  href="/cart"
                  className="btn btn-dark btn-sm btn-block d-flex align-items-center justify-content-center px-0 text-white"
                  onClick={addToCart}
                >
                  Add to cart
                </a>
              </div>

              <br></br>
              <br></br>
            </div>
            <ul className="list-unstyled small d-inline-block">
              <li className="mb-3 bg-white text-muted">
                <strong className="text-uppercase text-dark">
                  The remaining amount:
                </strong>
                <a className="reset-anchor ml-2">{detail.quantity}</a>
              </li>
            </ul>
          </div>
        </div>

        <br />
        <ul className="nav nav-tabs border-0">
          <li className="nav-item">
            <a
              className="nav-link fix_comment"
              onClick={() => handlerReview("description")}
              style={
                review === "description"
                  ? { backgroundColor: "#383838", color: "#ffffff" }
                  : { color: "#383838" }
              }
            >
              Description
            </a>
          </li>
          {/* <li className='nav-item'>
						<a
							className='nav-link fix_comment'
							onClick={() => handlerReview('review')}
							style={
								review === 'review'
									? { backgroundColor: '#383838', color: '#ffffff' }
									: { color: '#383838' }
							}>
							Reviews
						</a>
					</li> */}
        </ul>
        <div className="tab-content mb-5">
          {review === "description" ? (
            <div className="tab-pane fade show active">
              <div className="pt-4 pb-4 bg-white">
                <h6 className="text-uppercase">Product description </h6>
                <br></br>
                <p
                  className="text-muted text-small mb-0"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {detail.long_desc}
                </p>
              </div>
            </div>
          ) : (
            <div className="tab-pane fade show active">
              <div className="p-4 p-lg-5 bg-white">
                <div className="row">
                  {/* <div className="col-lg-8">
                    {list_comment &&
                      list_comment.map((value) => (
                        <div className="media mb-3" key={value._id}>
                          <img
                            className="rounded-circle"
                            src="https://img.icons8.com/color/36/000000/administrator-male.png"
                            alt=""
                            width="50"
                          />
                          <div className="media-body ml-3">
                            <h6 className="mb-0 text-uppercase">
                              {value.fullname}
                            </h6>
                            <p className="small text-muted mb-0 text-uppercase">
                              dd/mm/yyyy
                            </p>
                            <ul className="list-inline mb-1 text-xs">
                              <li className="list-inline-item m-0">
                                <i className={value.star1}></i>
                              </li>
                              <li className="list-inline-item m-0">
                                <i className={value.star2}></i>
                              </li>
                              <li className="list-inline-item m-0">
                                <i className={value.star3}></i>
                              </li>
                              <li className="list-inline-item m-0">
                                <i className={value.star4}></i>
                              </li>
                              <li className="list-inline-item m-0">
                                <i className={value.star5}></i>
                              </li>
                            </ul>
                            <p className="text-small mb-0 text-muted">
                              {value.content}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div> */}
                </div>
              </div>
            </div>
          )}
        </div>
        <h2 className="h5 text-uppercase mb-4">Related products</h2>
        <div className="row">
          {product &&
            product
              .filter(
                (el) => el.category === detail.category && el._id !== detail._id
              )
              .map((value) => (
                <div className="col-lg-3 col-sm-6" key={value._id}>
                  <div className="product text-center skel-loader">
                    <div className="d-block mb-3 position-relative">
                      <Link to={`/detail/${value._id}`}>
                        <img
                          className="img-fluid w-100"
                          src={value.img1}
                          alt="..."
                        />
                      </Link>
                      <div className="product-overlay">
                        <ul className="mb-0 list-inline"></ul>
                      </div>
                    </div>
                    <h6>
                      <Link
                        className="reset-anchor"
                        to={`/detail/${value._id}`}
                      >
                        {value.name}
                      </Link>
                    </h6>
                    <p className="small text-muted">
                      {convertMoney(value.price)} VND
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}

export default Detail;
