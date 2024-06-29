import React, {useState, useEffect} from "react";
import { IonIcon } from "@ionic/react";
import { personOutline, lockClosedOutline, mail } from "ionicons/icons";
import "../LoginPage/login.css";

import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";

const SignUpPage = () => {
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleChangeUsername = (event) => {
    // Kiểm tra tính hợp lệ của input và cập nhật isValid
    const inputValue = event.target.value;
    const isValidInput =
      inputValue.length > 1; /* Điều kiện kiểm tra tính hợp lệ */
    setIsValidUsername(isValidInput)
    setUsername(event.target.value);
  };

  const handleChangeEmail = (event) => {
    // Kiểm tra tính hợp lệ của input và cập nhật isValid
    const inputValue = event.target.value;
    const isValidInput =
      inputValue.length > 1; /* Điều kiện kiểm tra tính hợp lệ */
    setIsValidEmail(isValidInput)
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    // Kiểm tra tính hợp lệ của input và cập nhật isValid
    const inputValue = event.target.value;
    const isValidInput =
      inputValue.length > 1; /* Điều kiện kiểm tra tính hợp lệ */
    setIsValidPassword(isValidInput)
    setPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    // Kiểm tra tính hợp lệ của input và cập nhật isValid
    const inputValue = event.target.value;
    const isValidInput =
      inputValue.length > 1; /* Điều kiện kiểm tra tính hợp lệ */
    setIsValidConfirmPassword(isValidInput)
    setConfirmPassword(event.target.value);
  };
  

  const mutation = useMutationHook((data) => UserService.registerUser(data));

  const { isError, isSuccess } = mutation;

  useEffect(() => {
    if (isSuccess && mutation.data.status === "OK") {
      setTimeout(() => {
        alert("Đăng ký thành công");
      }, 1000);
      console.log(mutation.data.status);
      navigate("/login");
    } else if (isSuccess && mutation.data.status === "ERR") {
      alert(mutation.data.message);
      console.log(mutation.data.status);
    }
  }, [isSuccess, isError]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    mutation.mutate({ username, email, password, confirmPassword });
  }

  return (
    <div className="page">
      <div className="wrapper">
        <h1>Đăng kí</h1>
        <div className="input-box">
          <input type="text" placeholder="Tên đăng nhập" required 
          value={username}
          onChange={handleChangeUsername}/>
          <IonIcon icon={personOutline}></IonIcon>
        </div>
        
        <div className="input-box">
          <input type="text" placeholder="Email" required 
          value={email}
          onChange={handleChangeEmail}/>
          <IonIcon icon={mail}></IonIcon>
        </div>

        <div className="input-box">
          <input type="password" placeholder="Nhập Mật khẩu" required 
            value={password}
            onChange={handleChangePassword}/>
          <IonIcon icon={lockClosedOutline}></IonIcon>
        </div>

        <div className="input-box">
          <input type="password" placeholder="Xác nhận Mật khẩu" required 
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}/>
          <IonIcon icon={lockClosedOutline}></IonIcon>
        </div>

        <button onClick={handleSignUp}>Đăng kí</button>

        <div className="register-link">
          <p>
            Đã có tài khoản? <a href="" onClick={handleLogin}>Đăng nhập</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
