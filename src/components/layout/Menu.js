import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/index";
import { useHistory } from "react-router-dom";
import logout1 from "../auth/logout.js";
import axios from "../../axios";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

export default function SimpleMenu() {
  const resetRedux = async () => {};
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const logout = () => {
    localStorage.removeItem("");
    localStorage.removeItem("token");
    history.push("/");
  };

  const toAccount = () => {
    history.push("/myAccount");
  };

  const t = useSelector((state) => state.auth.user);
  const [name, setName] = useState(t.firstName);
  const fun = async () => {
    if (t.firstName === "") {
      try {
        const userId = localStorage.getItem("userId");
        const res = await axios.get("/getUser/" + userId); // setName(res.data.firstName);
        setName(res.data.firstName);
        dispatch(authActions.updateUser(res.data));
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (t.firstName === "") fun();
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ color: "white" }}
      >
        <p style={{ marginRight: "10px" }}>{name}</p> <AccountBoxIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={toAccount}>My account</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
