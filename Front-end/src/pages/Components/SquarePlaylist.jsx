import React from "react";
import "../styles/main.css";
import "../styles/want_listen.css";
import "../styles/playlistview.css";
import { IonIcon } from "@ionic/react";
import { heartOutline, play, ellipsisHorizontalOutline } from "ionicons/icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Player from "./Player";
import { useNavigate } from "react-router-dom";
import PlaylistPage from "../MusicPage/PlaylistPage";

function SquarePlaylist({ playlist }) {
  const navigate = useNavigate();
  const [selectedIdPlaylist, setSelectedIdPlaylist] = useState(null);
  const trackDetail = useQuery({
    queryKey: ["trackDetai0S", playlist?.tracks[0]],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:5000/api/track/get-details/${playlist?.tracks[0]}`
      );

      return response.json();
    },
    enabled: !!playlist?.tracks[0],
  });

  console.log(trackDetail?.data?.data?.image);

  const HandleSongClick = (id, img) => {
    console.log("Clicked playlist ID:", id);
    console.log("Clicked playlist ID:", img);
    navigate("/detailPlaylist", { state: { id: id, img: img } });
  };

  return (
    <div className="item_quare item_quare-big">
      <div className="div_img div_img-big">
        <a href="">
          <img src={trackDetail?.data?.data?.image} alt="" />
          <div class="div_icon--in--img">
            <IonIcon icon={heartOutline}></IonIcon>
            <IonIcon icon={play}></IonIcon>
            <IonIcon icon={ellipsisHorizontalOutline}></IonIcon>
          </div>
        </a>
      </div>
      <p
        class="decrip_item"
        onClick={() =>
          HandleSongClick(playlist._id, trackDetail?.data?.data?.image)
        }
      >
        {playlist.title}
      </p>
      <a class="singer-name" href="">
        {playlist.description}
      </a>
      {selectedIdPlaylist && <PlaylistPage id={selectedIdPlaylist} />}
    </div>
  );
}

export default SquarePlaylist;
