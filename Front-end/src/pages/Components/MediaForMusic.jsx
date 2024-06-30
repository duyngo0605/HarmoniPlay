import React from "react";
import { IonIcon } from "@ionic/react";
import { heartOutline, ellipsisHorizontalOutline, play } from "ionicons/icons";
import musicitem from "../assest/music-item.jpg";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import "../styles/playlistpage.css";
import "../styles/chartweek.css";

const MediaForMusic = ({ id }) => {
  const navigate = useNavigate();
  const trackDetail = useQuery({
    queryKey: ["trackDetailId", id],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:5000/api/track/get-details/${id}`
      );

      return response.json();
    },
    enabled: !!id,
  });
  const fetchArtists = async () => {
    const response = await fetch("http://localhost:5000/api/artist/get-all");
    const data = await response.json();
    return data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["artists"],
    queryFn: fetchArtists,
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data?.data);

  const artists = data?.data;

  console.log(artists);

  const getArtistNameById = (artistId) => {
    const artist = artists.find((artist) => artist._id === artistId);
    console.log(artist.name);
    return artist ? artist.name : "Unknown Artist";
  };

  console.log(trackDetail);

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

  const music = trackDetail?.data?.data;

  const formatedTime = formatTime(music?.duration);

  function HandleArtistPage(id) {
    console.log(id);
    navigate("/detailArtist", { state: { id: id } });
  }

  return (
    <div class="media">
      <div class="media-left">
        <div class="song-thumb" s>
          <img src={music?.image} alt="song" />
          <div class="">
            <IonIcon icon={play}></IonIcon>
            <IonIcon icon={heartOutline}></IonIcon>

            <IonIcon icon={ellipsisHorizontalOutline}></IonIcon>
          </div>
        </div>

        <div class="card-info">
          <div class="song-name">
            <a href="">
              <span>{music?.title}</span>
            </a>
          </div>

          <h4 class="song-artist">
            {music?.artist.map((item, index) => (
              <span key={item._id}>
                <a href="" onClick={() => HandleArtistPage(music?.artist)}>
                  {getArtistNameById(item._id)}
                </a>
                {index < music?.artist?.length - 1 && ", "}
              </span>
            ))}
          </h4>
        </div>
      </div>

      <div class="media-right">
        <div class="level-item duration">{formatedTime}</div>
      </div>
    </div>
  );
};

export default MediaForMusic;
