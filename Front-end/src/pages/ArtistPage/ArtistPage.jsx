import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import React from "react";
import { IonIcon } from "@ionic/react";
import { chevronForwardOutline } from "ionicons/icons";

import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import "../styles/Artist.css";
import "../styles/want_listen.css";
import "../styles/main.css";
import "../styles/playlistview.css";
import "../styles/playlistpage.css";
import MediaForMusic from "../Components/MediaForMusic";
import SquareItem from "../Components/SquareItem";
import SquareRender from "../Components/SquareRender";

const ArtistPage = () => {
  const location = useLocation();
  const { id } = location.state || {};

  console.log(id);
  const artistDetail = useQuery({
    queryKey: ["artistDetailId", id],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:5000/api/artist/get-details/${id}`
      );

      return response.json();
    },
    enabled: !!id,
  });

  const artist = artistDetail?.data?.data;
  console.log(artist);

  return (
    <>
      <Navbar />
      <main>
        <Header />
        <div id="main_scroll">
          <div class="artist-hero">
            <div class="hero-body">
              <div class="left">
                <figure class="avatar">
                  <img src={artist?.image} />
                </figure>
                <div class="information">
                  <div class="top">
                    <h3 class="artist-name">{artist?.name}</h3>
                    <ion-icon
                      class="music_status--pause"
                      name="play-circle-outline"
                    ></ion-icon>
                  </div>
                  <div class="bottom">
                    <span class="follower">123.00 người theo dõi</span>
                    <button class="follow-btn">QUAN TÂM</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="artist-home-content">
            <div class="top_section_container topic-item">
              <div class="tittle recently_tittle">
                <span>Bài Hát Nổi Bật</span>
                <a href="">
                  <span>Tất cả</span>
                  <ion-icon name="chevron-forward-outline"></ion-icon>
                </a>
              </div>

              <div class="colums">
                <div class="colum">
                  <div class="list">
                    {artist?.tracks
                      ?.map((id) => <MediaForMusic id={id} />)
                      .slice(0, 3)}
                  </div>
                </div>
                <div class="colum">
                  <div class="list">
                    {artist?.tracks
                      ?.map((id) => <MediaForMusic id={id} />)
                      .slice(3, 6)}
                  </div>
                </div>
              </div>
            </div>

            <div class="topic-item album-hot">
              <div class="tittle">
                <span>Single </span>
                <a href="">
                  <span>Tất cả</span>
                  <IonIcon icon={chevronForwardOutline}></IonIcon>
                </a>
              </div>

              <div id="all_item-albumHot" class="main_topic-item">
                {artist?.tracks
                  .map((id) => <SquareRender id={id} />)
                  .slice(0, 5)}
              </div>
            </div>

            <div class="topic-item radio_hot">
              <div class="tittle">
                <span>Bạn có thể thích</span>
              </div>

              <div id="radio_hot_item" class="main_topic-item">
                <div class="item_circle">
                  <div class="div_contain-img">
                    <a href="">
                      <div class="div-boder-img">
                        <img src="./assest/img/artist2.jpg" alt="" />
                        <ion-icon name="play"></ion-icon>
                      </div>
                    </a>
                  </div>
                  <span class="decrip_item">Chạm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ArtistPage;
