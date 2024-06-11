import React from "react";
import Header from "../Header/Header";
import "../styles/main.css";
import "../styles/banner.css";
import "../styles/recently.css";
import "../styles/want_listen.css";
import "../styles/mph.css";
import { IonIcon } from "@ionic/react";
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";

import banner1 from "../assest/banner1.jpg";
import banner2 from "../assest/banner2.jpg";
import banner3 from "../assest/banner3.jpg";
import "../HomePage/HomePage";

const HomePage = () => {
  return (
    <main>
      <Header />
      <div id="main_scroll">
        <div class="banner">
          <div id="click-left" class="click_banner click-left">
            <IonIcon icon={chevronBackOutline}></IonIcon>
          </div>
          <div id="click-right" class="click_banner click-right">
            <IonIcon icon={chevronForwardOutline}></IonIcon>
          </div>
          <div class="banner_all-img">
            <a href="">
              <img class="banner_img" src="" alt="Banner Image" />
            </a>
            <a href="">
              <img class="banner_img" src="" alt="Banner Image" />
            </a>
            <a href="">
              <img class="banner_img" src="" alt="Banner Image" />
            </a>
          </div>
        </div>

        <div class="topic-item recently">
          <div class="tittle recently_tittle">
            <span>Gần Đây</span>
            <a href="">
              <span>Tất cả</span>
              <IonIcon icon={chevronForwardOutline}></IonIcon>
            </a>
          </div>

          <div class="main_topic-item recently_item">
            <div class="item_quare item_quare-mini">
              <div class="div_img div_img--mini">
                <a href="">
                  <img src="./assest/img/playlist1.jpg" alt="" />
                  <div class="div_icon--in--img">
                    <ion-icon name="heart-outline"></ion-icon>
                    <ion-icon name="play"></ion-icon>
                    <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                  </div>
                </a>
              </div>
              <a href="">
                <p class="decrip_item">#zingchart New Release</p>
              </a>
            </div>

            <div class="item_quare item_quare-mini">
              <div class="div_img div_img--mini">
                <a href="">
                  <img src="./assest/img/playlist1.jpg" alt="" />
                  <div class="div_icon--in--img">
                    <ion-icon name="heart-outline"></ion-icon>
                    <ion-icon name="play"></ion-icon>
                    <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                  </div>
                </a>
              </div>
              <a href="">
                <p id="special_album" class="decrip_item">
                  List Yêu Thích
                </p>
              </a>
            </div>
          </div>
        </div>

        <div class="topic-item mph">
          <div class="title title_mph">
            <span>Mới Phát Hành</span>
          </div>

          <div class="control-aria">
            <div class="control_left">
              <div class="type_mph active">Tất cả</div>
              <div class="type_mph" data-nation="V-Pop">
                Việt nam
              </div>
              <div class="type_mph">Quốc tế</div>
            </div>
            <div class="control_right">
              <a href="">
                <span>Tất cả</span>
                <IonIcon icon={chevronForwardOutline}></IonIcon>
              </a>
            </div>
          </div>

          <div id="all-item--mph" class="all-item--mph">
            <div class="one_item--mph">
              <a href="">
                <img src="./assest/img/playlist1.jpg" alt="" />
                <ion-icon name="play"></ion-icon>
              </a>
              <div class="content">
                <span class="name_song">Bạn chờ</span>

                <a href="">
                  <p class="singer-name">Mỹ Anh</p>
                </a>
                <span class="time-up">3 ngày trước</span>
              </div>
              <ion-icon
                class="dotx"
                name="ellipsis-horizontal-outline"
              ></ion-icon>
            </div>
          </div>
        </div>

        <div class="topic-item want-to-listen">
          <div class="tittle">
            <span>Remix Là Dance Luôn</span>
          </div>
          <div
            id="topic_clone-1"
            class="main_topic-item all-item-want-to-listen"
          ></div>
        </div>
        <div class="topic-item want-to-listen">
          <div class="tittle">
            <span>Chill</span>
          </div>
          <div
            id="topic_clone-2"
            class="main_topic-item all-item-want-to-listen"
          ></div>
        </div>
        <div class="topic-item want-to-listen">
          <div class="tittle">
            <span>Nghe Là Yêu Đời</span>
          </div>
          <div
            id="topic_clone-3"
            class="main_topic-item all-item-want-to-listen"
          ></div>
        </div>
        <div class="topic-item want-to-listen">
          <div class="tittle">
            <span>Tâm Trạng Hơi Suy</span>
          </div>
          <div
            id="topic_clone-4"
            class="main_topic-item all-item-want-to-listen"
          ></div>
        </div>

        <div class="topic-item new-bxh">
          <div class="tittle">
            <span>BXH Nhạc Mới</span>
            <a href="">
              <span>Tất cả</span>
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </a>
          </div>

          <ul class="item-bxh">
            <ion-icon name="chevron-back-outline"></ion-icon>
            <ion-icon name="chevron-forward-outline"></ion-icon>

            <a href="">
              <li class="one-item-bxh_new">
                <div class="left">
                  <img
                    class="img-bxh-new"
                    src="./assest/img/playlist1.jpg"
                    alt=""
                  />
                  <ion-icon name="play"></ion-icon>
                </div>
                <div class="right">
                  <div class="title-right">
                    <span class="name-song_bxh">Ban cho</span>
                    <span class="name-singer_bxh">My Anh</span>
                  </div>
                  <div class="">
                    <span class="top_bxh">#1</span>
                    <span class="release-date">02112004</span>
                  </div>
                </div>
              </li>
            </a>
            <a href="">
              <li class="one-item-bxh_new">
                <div class="left">
                  <img
                    class="img-bxh-new"
                    src="./assest/img/playlist1.jpg"
                    alt=""
                  />
                  <ion-icon name="play"></ion-icon>
                </div>
                <div class="right">
                  <div class="title-right">
                    <span class="name-song_bxh">Ban cho</span>
                    <span class="name-singer_bxh">My Anh</span>
                  </div>
                  <div class="">
                    <span class="top_bxh">#2</span>
                    <span class="release-date">02112004</span>
                  </div>
                </div>
              </li>
            </a>
            <a href="">
              <li class="one-item-bxh_new">
                <div class="left">
                  <img
                    class="img-bxh-new"
                    src="./assest/img/playlist1.jpg"
                    alt=""
                  />
                  <ion-icon name="play"></ion-icon>
                </div>
                <div class="right">
                  <div class="title-right">
                    <span class="name-song_bxh">Ban cho</span>
                    <span class="name-singer_bxh">My Anh</span>
                  </div>
                  <div class="">
                    <span class="top_bxh">#3</span>
                    <span class="release-date">02112004</span>
                  </div>
                </div>
              </li>
            </a>
          </ul>
        </div>

        <div class="topic-item zing-chart-week">
          <div class="img-div">
            <img src="./assest/img/song-vn-2x.jpg" alt="" />
          </div>
          <div class="img-div">
            <img src="./assest/img/web_song_usuk.jpg" alt="" />
          </div>
          <div class="img-div">
            <img src="./assest/img/web_song_kpop.jpg" alt="" />
          </div>
        </div>

        <div class="topic-item top100">
          <div class="tittle">
            <span>Top 100</span>
          </div>

          <div id="all_item-top100" class="main_topic-item">
            <div class="item_quare item_quare-big">
              <div class="div_img div_img-big">
                <a href="">
                  <img src="./assest/img/playlist1.jpg" alt="" />
                  <div class="div_icon--in--img">
                    <ion-icon name="heart-outline"></ion-icon>
                    <ion-icon name="play"></ion-icon>
                    <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                  </div>
                </a>
              </div>
              <p class="decrip_item">Nhe Anh</p>
              <a class="singer-name" href="">
                My Tam
              </a>
            </div>
          </div>
        </div>

        <div class="topic-item album-hot">
          <div class="tittle">
            <span>Album Hot</span>
          </div>

          <div id="all_item-albumHot" class="main_topic-item">
            <div class="item_quare item_quare-big">
              <div class="div_img div_img-big">
                <a href="">
                  <img src="./assest/img/playlist1.jpg" alt="" />
                  <div class="div_icon--in--img">
                    <ion-icon name="heart-outline"></ion-icon>
                    <ion-icon name="play"></ion-icon>
                    <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                  </div>
                </a>
              </div>
              <p class="decrip_item">Nhe Anh</p>
              <a class="singer-name" href="">
                My Tam
              </a>
            </div>
          </div>
        </div>

        <div class="topic-item colab_music">
          <span>Đối tác âm nhạc</span>
          <div id="all__item__colab" class="colap_logo-img">
            <img src="./assest/img/stone-music.png" alt="" />
          </div>
        </div>
      </div>
    </main>
  );
};

const bannerImgs = document.querySelectorAll(".banner_img");
const left_btn = document.getElementById("click-left");
const right_btn = document.getElementById("click-right");
const all_mph_btn = document.querySelector(".control_left");
const type_mph_btn = document.querySelectorAll(".type_mph");

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
  bannerImgs.forEach((img, index) => {
    img.src = link_img[(currentIndex + index) % link_img.length].URL;
  });

  currentIndex = (currentIndex + 1) % link_img.length;
}

changeImage();

setInterval(changeImage, 5000);

// left_btn.addEventListener("click", () => {
//   currentIndex = (currentIndex + 1) % link_img.length;

//   changeImage();
// });

// right_btn.addEventListener("click", () => {
//   currentIndex = (currentIndex + 1) % link_img.length;
//   changeImage();
// });

// all_mph_btn.addEventListener("click", function (e) {
//   const clicked = e.target.closest(".type_mph");
//   console.log(clicked);

//   if (!clicked) return;

//   type_mph_btn.forEach((t) => t.classList.remove("active"));

//   clicked.classList.add("active");
//   console.log(clicked.context);
// });

export default HomePage;
