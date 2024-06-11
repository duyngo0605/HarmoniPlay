import React from "react";
import Header from "../Header/Header";

const LibraryPage = () => {
  return (
    <main>
      <Header />

      <div id="main_scroll">
        <div class="chart_title">
          <span>Thư viện</span>
          <ion-icon name="play"></ion-icon>
        </div>

        <div class="channel-section library">
          <div class="container topic-item">
            <div class="tittle">
              <div style="display: flex">
                <span>Playlist</span>
                <a href="">
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </a>
              </div>

              <a href="">
                <span>Tất cả</span>
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </a>
            </div>

            <div id="all_item-library" class="main_topic-item">
              <div class="item_quare item_quare-big">
                <div class="div_img div_img-big">
                  <a href="">
                    <img src="./assest/img/playlist1.jpg" alt="" />
                    <div class="div_icon--in--img">
                      <ion-icon name="heart" style="color: purple"></ion-icon>
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

              <div class="item_quare item_quare-big">
                <div class="div_img div_img-big">
                  <a href="">
                    <img src="./assest/img/playlist1.jpg" alt="" />
                    <div class="div_icon--in--img">
                      <ion-icon name="close-outline"></ion-icon>
                      <ion-icon name="play"></ion-icon>
                      <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                    </div>
                  </a>
                </div>
                <p class="decrip_item">new</p>
                <a class="singer-name" href="">
                  Viet Dung
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="bottom-section">
          <div class="nav_container">
            <ul class="nav_menu">
              <li class="sub_nav_item active">
                <div class="nav_link">
                  <a href="">BÀI HÁT</a>
                </div>
              </li>
              <li class="sub_nav_item">
                <div class="nav_link">
                  <a href="">ALBUM</a>
                </div>
              </li>
            </ul>
          </div>

          <div style="border-bottom: solid 1px grey; margin-bottom: 30px"></div>

          <div class="list">
            <div class="song-list">
              <div class="list-item">
                <div class="media">
                  <div class="media-left">
                    <div class="title_table" style="margin-left: 10px">
                      <span>Bài hát</span>
                    </div>
                  </div>

                  <div class="media-content">
                    <div class="title_table" style="margin-left: 55px">
                      <span>Album</span>
                    </div>
                  </div>
                  <div class="title_table">
                    <span>Thời gian</span>
                  </div>
                </div>
                <div class="media">
                  <div class="media-left">
                    <div class="song-thumb">
                      <img src="./assest/img/music-item.jpg" alt="song" />
                    </div>

                    <div class="card-info">
                      <div class="song-name">
                        <a href="">
                          <span>Close to you</span>
                        </a>
                      </div>

                      <h4 class="song-artist">
                        <a href="">Frank Ocen</a>
                      </h4>
                    </div>
                  </div>

                  <div class="media-content">
                    <div class="album-info">
                      <span>Blonde (Album)</span>
                    </div>
                  </div>
                  <div class="media-right">
                    <ion-icon
                      name="heart"
                      style="margin-right: 10px; color: purple"
                    ></ion-icon>
                    <div class="level-item duration">05:29</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
