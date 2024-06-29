import React, { useState } from "react";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";


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
import { useQuery } from "@tanstack/react-query";

import { getAllPlaylist } from "../../services/PlaylistService";

import { getAllGenre } from "../../services/GenreService";

import SongView from "../components/SongView";
import Slider from "../components/Slider";
import PlaylistView from "../components/PlaylistView";

const HomePage = () => {
  const [curSongId, setCurSongId] = useState(null);
  return (
    <>
      <Navbar />
      <main>
        <Header />

        <div id="main_scroll">
          <Slider />
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

          <SongView titleText="Nhạc Của Jack 5t" />
          <PlaylistView titleText="Những bài nhạc hay nhất" />

          <div class="topic-item colab_music">
            <span>Đối tác âm nhạc</span>
            <div id="all__item__colab" class="colap_logo-img">
              <img src="./assest/img/stone-music.png" alt="" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
