import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { IonIcon } from "@ionic/react";
import {
  heartOutline,
  ellipsisHorizontalOutline,
  shuffleOutline,
  playSkipBack,
  playCircleOutline,
  pauseCircleOutline,
  playSkipForward,
  repeatOutline,
  micOutline,
  openOutline,
  volumeMediumOutline,
  volumeMuteOutline,
  listOutline,
  closeOutline,
} from "ionicons/icons";
import "../styles/main.css";
import "../styles/play_navbar.css";
import "../styles/mph.css";
import * as TrackService from "../../services/TrackService"

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [stateTrackDetails, setStateTrackDetails] = useState({
    title: "",
    artist: [],
    link: "",
    image: "",
    genre: [],
    releaseDate: "",
    duration: 0,
  });

  const {id}= useParams();

  const fetchTrackAll = async () => {
    try {
      const res = await TrackService.getAllTrack();
      console.log("Data fetched all Track:", res);
      return res;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchGetDetailsTrack = async (id) => {
    try {
      alert(id)
      const res = await TrackService.getDetailsTrack(id);
      if (res?.data) {
        setStateTrackDetails({
          title: res?.data?.title,
          artist: res?.data?.artist,
          link: res?.data?.link,
          image: res?.data?.image,
          genre: res?.data?.genre,
          releaseDate: res?.data?.releaseDate,
          duration: res?.data?.duration,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };


  useEffect(() => {
    if (id) {
      fetchGetDetailsTrack(id);
    }
  }, [id]);


  function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    let hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
  }

  return (
    <div id="play_navbar">
      <div class="play_navbar--left">
        <a class="play_navbar--link" href="">
          <img
            class="image_of_song"
            src={console.log(stateTrackDetails?.data?.data?.image)}
            alt="1"
          />
          <div class="text">
            <span class="name_song name_song--event">
              {stateTrackDetails?.data?.data?.title}
            </span>
            <span class="singer-name singer-name--event">
            </span>
          </div>
        </a>
        <div class="items-select">
          <IonIcon icon={heartOutline}></IonIcon>
          <IonIcon icon={ellipsisHorizontalOutline}></IonIcon>
        </div>
      </div>

      <div class="play_navbar--mid">
        <div class="audio_control">
          <button>
            <IonIcon icon={shuffleOutline}></IonIcon>
          </button>
          <button>
            <IonIcon icon={playSkipBack}></IonIcon>
          </button>
          <button id="stop_pause_music">
            <button id="stop_pause_music">
              <ion-icon
                class="music_status--pause"
                name="play-circle-outline"
              ></ion-icon>
              <ion-icon
                class="music_status--play"
                name="pause-circle-outline"
              ></ion-icon>
            </button>
          </button>
          <button>
            <IonIcon icon={playSkipForward}></IonIcon>
          </button>
          <button>
            <IonIcon
              id="loop_music_items"
              class=""
              icon={repeatOutline}
            ></IonIcon>
          </button>
        </div>

        <div class="audio-player">
          <div class="controls">
            <div class="time">
              <div class="current">0:00</div>
              <div class="timeline">
                <div class="progress"></div>
              </div>
              <div class="length">
                {getTimeCodeFromNum(stateTrackDetails?.data?.data?.duration)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="play_navbar--right">
        <div class="text">
          <span>MV</span>
        </div>

        <IonIcon icon={micOutline}></IonIcon>
        <IonIcon icon={openOutline}></IonIcon>
        <div class="volume_control">
          <div class="btn_volume_icon">
            <IonIcon
              className="volume_medium_Icon"
              icon={volumeMediumOutline}
            ></IonIcon>
            <IonIcon
              className="volume_mute_Icon"
              icon={volumeMuteOutline}
            ></IonIcon>
          </div>
          <div className="volume-button">
            <div className="volume icono-volumeMedium"></div>
          </div>
          <div className="volume-slider">
            <div className="volume-percentage"></div>
          </div>
        </div>
        <div className="bulkhead">|</div>
        <IonIcon icon={listOutline}></IonIcon>
        <IonIcon id="close_play_navbar" icon={closeOutline}></IonIcon>
      </div>
    </div>
  );
}

export default Player;
