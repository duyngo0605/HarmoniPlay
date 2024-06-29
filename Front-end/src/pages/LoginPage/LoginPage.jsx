import React, { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { personOutline, lockClosedOutline } from "ionicons/icons";
import "../LoginPage/login.css";

import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";


const LoginPage = () => {
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleChangeUsername = (event) => {
    const inputValue = event.target.value;
    const isValidInput =
      inputValue.length > 1;
    setIsValidUsername(isValidInput)
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    const inputValuePass = event.target.value;
    const isValidInputPass = inputValuePass.length > 1;
    setIsValidPassword(isValidInputPass)
    setPassword(event.target.value);
  };

  const mutation = useMutationHook((data) => UserService.loginUser(data));
  console.log("mutation", mutation);

  const { isSuccess } = mutation;

  useEffect(() => {
    if (isSuccess && mutation.data.status === "OK") {
      if (location?.state) {
        setTimeout(() => {
          alert("Đăng nhập thành công");
          navigate(location.state);
        }, 1000);
      } else {
        alert("Đăng nhập thành công");
        if (username === "admin")
          navigate("/admin");
        else 
          navigate("/");
      }
      localStorage.setItem(
        "access_token",
        JSON.stringify(mutation.data?.access_token)
      );
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(mutation.data?.refresh_token)
      );
      if (mutation.data?.access_token) {
        const decoded = jwtDecode(mutation.data?.access_token);
        console.log("decoded", decoded);
        if (decoded?.id) {
          handleGetDetailUser(decoded?.id, mutation.data?.access_token);
        }
      }
    } else if (isSuccess && mutation.data.status === "ERR") {
      alert(mutation.data.message);
      console.log(mutation.data.status);
    }
  }, [isSuccess]);

  const handleGetDetailUser = async (id, token) => {
    const storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token, refresh_token: refreshToken }));
    console.log(res.data)
  };

  const handleLogin = () => {
    mutation.mutate({ username, password });
    if (!username || !password) {
      console.log("Vui lòng nhập đầy đủ thông tin");
    } else {
      console.log("username", username);
      console.log("password", password);
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="page">
      <div className="wrapper">
          <h1>Đăng nhập</h1>
          <div className="input-box">
            <input type="text" placeholder="Tên đăng nhập" required 
            value={username}
            onChange={handleChangeUsername}/>
            <IonIcon icon={personOutline}></IonIcon>
          </div>

          <div className="input-box">
            <input type="password" placeholder="Mật khẩu" required 
            value={password}
            onChange={handleChangePassword}/>
            <IonIcon icon={lockClosedOutline}></IonIcon>
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Ghi nhớ
            </label>
            <a href="#">Quên mật khẩu</a>
          </div>

          <button onClick={handleLogin}>Đăng nhập</button>

          <div className="register-link">
            <p>
              Chưa có tài khoản? <a href="" onClick={handleSignUp}>Đăng kí</a>
            </p>
          </div>
      </div>
    </div>
  );
};

export default LoginPage;
