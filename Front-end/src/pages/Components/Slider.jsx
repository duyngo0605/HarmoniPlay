import React, { useEffect } from "react";
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";
import banner1 from "../assest/banner1.jpg";
import banner2 from "../assest/banner2.jpg";
import banner3 from "../assest/banner3.jpg";

import "../styles/main.css";
import "../styles/banner.css";
import { IonIcon } from "@ionic/react";

function Slider() {
  const sliders = document.querySelectorAll(".banner_img");
  console.log(sliders);
  const link_img = [
    {
      URL: banner1,
    },
    {
      URL: banner2,
    },
    {
      URL: banner3,
    },
  ];

  let currentIndex = 0;

  function changeImage() {
    sliders.forEach((img, index) => {
      img.src = link_img[(currentIndex + index) % link_img.length].URL;
    });

    currentIndex = (currentIndex + 1) % link_img.length;
  }

  setInterval(changeImage, 5000);

  function HandleLeft() {
    currentIndex = (currentIndex + 1) % link_img.length;

    changeImage();
  }

  function HandleRight() {
    currentIndex = (currentIndex + 1) % link_img.length;
    changeImage();
  }

  return (
    <div class="banner">
      <div id="click-left" class="click_banner click-left">
        <IonIcon icon={chevronBackOutline} onClick={HandleLeft}></IonIcon>
      </div>
      <div id="click-right" class="click_banner click-right">
        <IonIcon icon={chevronForwardOutline} onClick={HandleRight}></IonIcon>
      </div>
      <div class="banner_all-img">
        <a href="#">
          <img
            className="banner_img"
            src={banner1}
            alt="1"
            onChange={changeImage}
          />
        </a>
        <a href="#">
          <img
            className="banner_img"
            src={banner2}
            alt="1"
            onChange={changeImage}
          />
        </a>
        <a href="#">
          <img
            className="banner_img"
            src={banner3}
            alt="1"
            onChange={changeImage}
          />
        </a>
      </div>
    </div>
  );
}

export default Slider;
