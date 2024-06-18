import React from "react";
import { IonIcon } from "@ionic/react";
import { personOutline, lockClosedOutline } from "ionicons/icons";
import "../LoginPage/login.css";

const SignUpPage = () => {
  return (
    <div className="page">
      <div className="wrapper">
        <form action="">
          <h1>Đăng kí</h1>
          <div className="input-box">
            <input type="text" placeholder="Tên đăng nhập" required />
            <IonIcon icon={personOutline}></IonIcon>
          </div>

          <div className="input-box">
            <input type="email" placeholder="Email" required />
            <IonIcon icon={personOutline}></IonIcon>
          </div>

          <div className="input-box">
            <input type="text" placeholder="Họ tên" required />
            <IonIcon icon={personOutline}></IonIcon>
          </div>

          <div className="input-box">
            <input type="password" placeholder="Nhập Mật khẩu" required />
            <IonIcon icon={lockClosedOutline}></IonIcon>
          </div>

          <div className="input-box">
            <input type="password" placeholder="Xác nhận Mật khẩu" required />
            <IonIcon icon={lockClosedOutline}></IonIcon>
          </div>

          <div className="input-box">
            <input type="file" style={{ paddingBottom: 40 }} />
          </div>

          <button type="submit">Đăng kí</button>

          <div className="register-link">
            <p>
              Đã có tài khoản? <a href="#">Đăng nhập</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
