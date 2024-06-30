import React from "react";
import "../styles/header.css";
import { IonIcon } from "@ionic/react";
import {
  arrowBackOutline,
  arrowForwardOutline,
  searchOutline,
  settingsOutline,
  personOutline
} from "ionicons/icons";
import { jwtDecode } from "jwt-decode";

import Search from "../Search/Search"

import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { logoutUser } from "../../services/UserService";

const Header = () => {
  const location = useLocation();

  const token = JSON.parse(localStorage?.getItem("access_token"));

  let decoded;
  
  if (token) {
    decoded = jwtDecode(token)
  }

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
      navigate("/")
    const res = await logoutUser();
    if(res?.status === "OK")
    {
      alert("Log out successfully!")

      localStorage.clear();
    }
  }

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleProfile  = () => {
    if (location.pathname !== "/profile" )
      navigate("/profile");
    
  }

  const handleAdmin = () => {
    if (location.pathname !== "/admin" )
      navigate("/admin");
  }

  return (
    <div class="header">
      <div class="control_header">
        <div class="header_left">

          <div class="search_button">
          <Search/>
          </div>
        </div>

        <div class="header_right">
          {
          !decoded?.id ? (
              <>
              <a class="sign_in_btn" onClick={handleLogin} href="">
                Đăng nhập
                </a>
                <a class="sign_up_btn" onClick={handleSignUp} href="">
                Đăng kí
                </a>
                </>

           
          ) : (          
          <div class="setting">
           {decoded?.isAdmin ?
           (<a class="sign_up_btn" onClick={handleAdmin} href="">
                Quản lý Admin
            </a>) :(<></>)}
            <a class="sign_in_btn" onClick={handleLogout} href="">
                Đăng xuất
              </a>
            <a href = "" onClick={handleProfile} >
              <IonIcon icon={personOutline} class="setting_icon"></IonIcon>
            </a>
          </div>)
          
        
          }
        </div>
      </div>
    </div>
  );
};

export default Header;
