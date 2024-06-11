import React from "react";
import Header from "../../Header";

const Top100Page = () => {
  return (
    <main>
      <Header />

      <div id="main_scroll">
        <div class="img_banner">
          <img src="./assest/img/banner-top100.png" />
        </div>

        <div class="topic-item top100 spolight">
          <div class="tittle">
            <span>Nổi Bật</span>
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

        <div class="topic-item top100 vietnam">
          <div class="tittle">
            <span>Nhạc Việt Nam</span>
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

        <div class="topic-item top100 asia">
          <div class="tittle">
            <span>Nhạc Châu Á</span>
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

        <div class="topic-item top100 usuk">
          <div class="tittle">
            <span>Nhạc Âu Mỹ</span>
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

        <div class="topic-item top100 musical">
          <div class="tittle">
            <span>Nhạc Hòa Tấu</span>
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
      </div>
    </main>
  );
};
