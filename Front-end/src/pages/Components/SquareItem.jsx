import React from "react";
import "../styles/main.css";
import "../styles/want_listen.css";
import "../styles/playlistview.css";
import { IonIcon } from "@ionic/react";
import { heartOutline, play, ellipsisHorizontalOutline } from "ionicons/icons";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Player from "./Player";
import * as ArtistService from "../../services/ArtistService"

function SquareItem({ track }) {
  const [selectedId, setSelectedId] = useState(null);

  const [playIcon, setPlayIcon] = useState(null);

  const [navbarLeft, setNavbarLeft] = useState(null);
  const [addPlaylist, setAddPlaylist] = useState(null);
  const [pauseIcon, setPauseIcon] = useState(null);
  const [playNavbar, setPlayNavbar] = useState(null);
  const [openBtnPlayNavbar, setOpenBtnPlayNavbar] = useState(null);
  const [btnPlayStopMusic, setBtnPlayStopMusic] = useState(null);

  useEffect(() => {
    const nbarLeft = document.querySelector(".navbar_scroll");

    setNavbarLeft(nbarLeft);
    const aPlaylist = document.querySelector(".navbar_add--playlist");
    setAddPlaylist(aPlaylist);
    const pIcon = document.querySelector(".music_status--play");
    console.log(pIcon);
    setPlayIcon(pIcon);

    const pseIcon = document.querySelector(".music_status--pause");
    console.log(pseIcon);
    setPauseIcon(pseIcon);
    const plNavbar = document.getElementById("play_navbar");
    console.log(plNavbar);
    setPlayNavbar(plNavbar);
    const opBtnPlayNavbar = document.querySelectorAll(".play_music");
    setOpenBtnPlayNavbar(opBtnPlayNavbar);
    const btnPStopMusic = document.getElementById("stop_pause_music");
    setBtnPlayStopMusic(btnPStopMusic);
  }, []);

  const fetchArtists = async () => {
    const response = await ArtistService.getAllArtist();
    const data = await response.json();
    return data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["artists"],
    queryFn: fetchArtists,
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data.data);

  const artists = data.data;

  console.log(artists);

  const getArtistNameById = (artistId) => {
    const artist = artists.find((artist) => artist._id === artistId);
    return artist ? artist.name : "Unknown Artist";
  };

  function moveUpAddPlayList() {
    navbarLeft.style.height = "calc(400px - 90px)";
    addPlaylist.style.bottom = "unset";
  }

  function statusIconPlayPauseMusic() {
    if (playIcon.style.display == "none") {
      playIcon.style.display = "block";
      pauseIcon.style.display = "none";
    } else {
      playIcon.style.display = "none";
      pauseIcon.style.display = "block";
    }
  }

  function playMusic_IconEvent() {
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
  }

  function pauseMusic_IconEvent() {
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
  }

  function musicStatusPlayPause(audio) {
    if (audio.paused === "true") {
      audio.play();
    } else {
      audio.pause();
    }
  }
  function playMusicItems(audioVar) {
    audioVar.play();
    // playIcon()
  }
  function pauseMusicItems(audioVar) {
    audioVar.pause();
  }

  function statusPlayMusicNavBar() {
    if (playNavbar.style.display === "none") {
      playNavbar.style.display = "flex";
    } else {
      playNavbar.style.display = "none";
    }
  }

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

  const HandleSongClick = (id) => {
    setSelectedId(id);
    console.log(id);

    let audio = null;
    audio = new Audio(
      "https://vnso-zn-23-tf-mp3-s1-zmp3.zmdcdn.me/180a8505a4424d1c1453/8999881880667256971?authen=exp=1719767339~acl=/180a8505a4424d1c1453/*~hmac=95fe0c6bbc50dea9983f3d143736799d"
    );

    statusPlayMusicNavBar();
    moveUpAddPlayList();
    playMusic_IconEvent();
    playMusicItems(audio);

    let audioPlayer = document.querySelector(".audio-player");
    console.dir(audio);
    audio.addEventListener(
      "loadeddata",
      () => {
        audio.volume = 0.5;
      },
      false
    );

    let playBtn = document.getElementById("stop_pause_music").addEventListener(
      "click",
      () => {
        playMusicItems(audio);
      },
      false
    );

    let timeline = document.querySelector(".timeline");
    timeline.addEventListener(
      "click",
      (e) => {
        let timelineWidth = window.getComputedStyle(timeline).width;
        let timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
        audio.currentTime = timeToSeek;

        if (timeToSeek == getTimeCodeFromNum(audio.duration)) {
          pauseMusic_IconEvent();
        }
      },
      false
    );

    let volumeSlider = document.querySelector(".volume-slider");
    volumeSlider.addEventListener(
      "click",
      (e) => {
        let sliderWidth = window.getComputedStyle(volumeSlider).width;
        let newVolume = e.offsetX / parseInt(sliderWidth);
        audio.volume = newVolume;
        let letWeidth = (document.querySelector(
          ".volume-percentage"
        ).style.width = newVolume * 100 + "%");
      },
      false
    );

    setInterval(() => {
      let progressBar = audioPlayer.querySelector(".progress");
      progressBar.style.width =
        (audio.currentTime / audio.duration) * 100 + "%";
      audioPlayer.querySelector(".current").textContent = getTimeCodeFromNum(
        audio.currentTime
      );
    }, 500);

    const volumeControlIcon = document.querySelector(".btn_volume_icon");
    const volumeMedium = document.querySelector(".volume_medium_Icon");
    const volumeMute = document.querySelector(".volume_mute_Icon");

    volumeControlIcon.addEventListener("click", () => {
      if (volumeMute.style.display === "none") {
        volumeMedium.style.display = "none";
        volumeMute.style.display = "block";
        audio.muted = true;
      } else {
        volumeMedium.style.display = "block";
        volumeMute.style.display = "none";
        audio.muted = false;
      }
    });

    if (
      (playNavbar.style.display =
        "flex" || (playNavbar.style.display = "block"))
    ) {
      moveUpAddPlayList();
    }

    btnPlayStopMusic.addEventListener("click", () => {
      if (audio.pause() === "true" || playIcon.style.display === "none") {
        playMusic_IconEvent();
        playMusicItems(audio);
      } else {
        pauseMusic_IconEvent();
        pauseMusicItems(audio);
      }
    });

    //Btn loop music
    const btnLoopMusic = document.getElementById("loop_music_items");
    btnLoopMusic.addEventListener("click", () => {
      if (
        btnLoopMusic.classList.contains("loop_music_true") ||
        audio.loop === true
      ) {
        btnLoopMusic.classList.remove("loop_music_true");
        audio.loop = false;
      } else {
        btnLoopMusic.classList.add("loop_music_true");
        audio.loop = true;
      }
    });
  };

  return (
    <div className="item_quare item_quare-big">
      <div className="div_img div_img-big">
        <div className="menu">
          <img src={track.image} alt="" />
          <div class="div_icon--in--img">
            <IonIcon icon={heartOutline}></IonIcon>
            <IonIcon
              icon={play}
              onClick={() => HandleSongClick(track._id)}
            ></IonIcon>
            <IonIcon icon={ellipsisHorizontalOutline}></IonIcon>
          </div>
        </div>
      </div>
      <p class="decrip_item">{track.title}</p>
      <a class="singer-name" href="">
        {track.artist.map((artistId) => getArtistNameById(artistId)).join(", ")}
      </a>
      {selectedId && <Player id={selectedId} />}
    </div>
  );
}

export default SquareItem;
