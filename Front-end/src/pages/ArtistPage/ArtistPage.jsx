import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { IonIcon } from "@ionic/react";
import { chevronForwardOutline } from "ionicons/icons";

import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import "../styles/Artist.css";
import "../styles/want_listen.css";
import "../styles/main.css";
import "../styles/playlistview.css";
import "../styles/playlistpage.css";
import MediaForMusic from "../components/MediaForMusic";
import SquareItem from "../components/SquareItem";
import SquareRender from "../components/SquareRender";

import * as ArtistService from "../../services/ArtistService"

const ArtistPage = () => {
  const { id } = useParams();
  
  const [stateArtist, setStateArtist] = useState({
    name: "",
    image: "",
    country: "",
    description: "",
    tracks: []
  });

  const fetchGetDetailsArtist = async (id) => {
    try {
      const res = await ArtistService.getDetailsArtist(id);
      console.log('res', res)
      if (res?.data) {
        setStateArtist({
          name: res?.data?.name,
          image: res?.data?.image,
          country: res?.data?.country,
          description: res?.data?.description,
          tracks: res?.data?.tracks
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchGetDetailsArtist(id);
    }
  }, [id]);


  const handleFollow = () => {

  }

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
                  <img src={stateArtist?.image} />
                </figure>
                <div class="information">
                  <div class="top">
                    <h3 class="artist-name">{stateArtist?.name}</h3>
                    <ion-icon
                      class="music_status--pause"
                      name="play-circle-outline"
                    ></ion-icon>
                  </div>
                  <div class="bottom">
                    <span class="follower"></span>
                    <button class="follow-btn" onClick={handleFollow}>QUAN TÂM</button>
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
                    {stateArtist?.tracks
                      ?.map((id) => <MediaForMusic id={id} />)
                      .slice(0, 3)}
                  </div>
                </div>
                <div class="colum">
                  <div class="list">
                    {stateArtist?.tracks
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
                {stateArtist?.tracks
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
