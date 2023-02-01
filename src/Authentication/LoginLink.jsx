import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
// import { deleteSession } from "../Redux/Action/ActionSession";
// import { useCookies } from "react-cookie";
import axios from "axios";

function LoginLink(props) {
  const roomId = localStorage.getItem("roomId");
  // const dispatch = useDispatch();
  // const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const onRedirect = () => {
    const deleteMessenger = async () => {
      // console.log("roomIdlog-->", roomId);
      const res = await axios.delete(
        `http://localhost:3500/api/messenger/deleteMessenger/${roomId}`
      );
      const data = res && res.data ? res.data : [];
      console.log("data-->", data);
      if (data === "Delete Messenger success!") {
        localStorage.clear();
        localStorage.setItem("id_temp", "abc999");
      }
    };
    const delete_Session = async () => {
      const res = await axios.get(
        "http://localhost:3500/api/auth/deleteSession"
      );
      const data = res && res.data ? res.data : [];
      console.log("data-->", data);
    };
    delete_Session();
    deleteMessenger();
    // removeCookie("user", { path: "/" });
    // const action = deleteSession("");
    // dispatch(action);
  };

  return (
    <li className="nav-item" onClick={onRedirect}>
      <Link className="nav-link" to="/signin">
        ( Logout )
      </Link>
    </li>
  );
}

export default LoginLink;
