import React from "react";
import "../styles/header.css";
import { IonIcon } from "@ionic/react";
import {
  arrowBackOutline,
  arrowForwardOutline,
  searchOutline,
  settingsOutline,
} from "ionicons/icons";

import Search from "../Search/Search"

import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div class="header">
      <div class="control_header">
        <div class="header_left">
          <a href="">
            <div class="back_left">
              <IonIcon icon={arrowBackOutline} class="back_left"></IonIcon>
            </div>
          </a>

          <a href="">
            <div class="back_right">
              <IonIcon icon={arrowForwardOutline} class="back_right"></IonIcon>
            </div>
          </a>

          <div class="search_button">
          <Search/>
          </div>
        </div>

        <div class="header_right">
          <a class="sign_in_btn" onClick={handleLogin} href="">
            Đăng nhập
          </a>
          <a class="sign_up_btn" onClick={handleSignUp} href="">
            Đăng kí
          </a>

          <div class="setting">
            <a href="">
              <IonIcon icon={settingsOutline} class="setting_icon"></IonIcon>
            </a>
          </div>

          <div class="profile">
            <a href="" target="_blank">
              <img src="" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
