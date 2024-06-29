import React from "react";
import { IonIcon } from "@ionic/react";
import Header from "../Header/Header";
import { heartOutline, ellipsisHorizontalOutline, play } from "ionicons/icons";
import Navbar from "../Navbar/Navbar";
import musicitem from "../assest/music-item.jpg";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

import "../styles/playlistpage.css";
import "../styles/chartweek.css";

import MediaForMusic from "../components/MediaForMusic";
import PlaylistView from "../components/PlaylistView";

const PlaylistPage = () => {
  const location = useLocation();
  const { id, img } = location.state || {}; // Destructure id from state

  console.log("Received ID in PlaylistPage:", id);
  const playlistDetail = useQuery({
    queryKey: ["playlistDetailId", id],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:5000/api/playlist/get-details/${id}`
      );

      return response.json();
    },
    enabled: !!id,
  });
  console.log(id);
  console.log(playlistDetail?.data?.data);
  const detail = playlistDetail?.data?.data;

  function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    let formattedTime = "";

    if (hrs > 0) {
      formattedTime += `${hrs.toString().padStart(2, "0")}:`;
    }

    if (mins > 0 || hrs > 0) {
      formattedTime += `${mins.toString().padStart(2, "0")}:`;
    }

    formattedTime += secs.toString().padStart(2, "0");

    return formattedTime;
  }
  console.log(detail?.tracks);

  function formatDate(isoString) {
    const date = new Date(isoString);

    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // getUTCMonth() returns month from 0 to 11
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  const dayFormated = formatDate(detail?.updatedAt);

  return (
    <>
      <Navbar />
      <main>
        <Header />
        <div id="main_scroll">
          <div className="playlist">
            <div className="info">
              <img src={img} alt="pic" />
              <div className="decrip">
                <p className="title">{detail?.title}</p>
                <p>{detail?.tracks?.length + 1} Bài Hát</p>
                <p>
                  Cập nhât: <span>{dayFormated}</span>
                </p>

                <p>77k người thích</p>
              </div>
              <div className="control">
                <button>TẠM DỪNG</button>
                <div className="icon">
                  <IonIcon
                    icon={heartOutline}
                    style={{ marginRight: "20px" }}
                  ></IonIcon>
                  <IonIcon icon={ellipsisHorizontalOutline}></IonIcon>
                </div>
              </div>
            </div>
            <div className="listitem">
              <div class="media">
                <div class="media-left">
                  <div class="title_table">
                    <span>Bài hát</span>
                  </div>
                </div>

                <div class="title_table">
                  <span>Thời gian</span>
                </div>
              </div>

              {detail?.tracks?.map((id) => (
                <MediaForMusic id={id} />
              ))}
            </div>
          </div>

          <PlaylistView titleText="Có Thể Bạn Quan Tâm" />
        </div>
      </main>
    </>
  );
};

export default PlaylistPage;
