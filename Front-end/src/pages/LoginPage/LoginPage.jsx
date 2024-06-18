import React from "react";
import { IonIcon } from "@ionic/react";
import { personOutline, lockClosedOutline } from "ionicons/icons";
import "../LoginPage/login.css";

const LoginPage = () => {
  return (
    <div className="page">
      <div className="wrapper">
        <form action="">
          <h1>Đăng nhập</h1>
          <div className="input-box">
            <input type="text" placeholder="Tên đăng nhập" required />
            <IonIcon icon={personOutline}></IonIcon>
          </div>

          <div className="input-box">
            <input type="password" placeholder="Mật khẩu" required />
            <IonIcon icon={lockClosedOutline}></IonIcon>
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Ghi nhớ
            </label>
            <a href="#">Quên mật khẩu</a>
          </div>

          <button type="submit">Đăng nhập</button>

          <div className="register-link">
            <p>
              Chưa có tài khoản? <a href="#">Đăng kí</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
