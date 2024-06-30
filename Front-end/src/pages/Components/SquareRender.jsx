import React from "react";
import "../styles/main.css";
import "../styles/want_listen.css";
import "../styles/playlistview.css";
import { IonIcon } from "@ionic/react";
import { heartOutline, play, ellipsisHorizontalOutline } from "ionicons/icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Player from "./Player";

function SquareRender({ id }) {
  const [selectedId, setSelectedId] = useState(null);

  const HandleSongClick = (id) => {
    setSelectedId(id);

    console.log("Clicked song ID:", id);
  };

  const fetchArtists = async () => {
    const response = await fetch("http://localhost:5000/api/artist/get-all");
    const data = await response.json();
    return data;
  };

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

  const track = trackDetail?.data?.data;

  return (
    <div className="item_quare item_quare-big">
      <div className="div_img div_img-big">
        <a href="">
          <img src={track?.image} alt="" />
          <div class="div_icon--in--img">
            <IonIcon icon={heartOutline}></IonIcon>
            <IonIcon icon={play}></IonIcon>
            <IonIcon icon={ellipsisHorizontalOutline}></IonIcon>
          </div>
        </a>
      </div>
      <p class="decrip_item" onClick={() => HandleSongClick(track._id)}>
        {track?.title}
      </p>
      <a class="singer-name" href="">
        {track?.releaseDate.slice(0,4)}
      </a>
      {selectedId && <Player id={selectedId} />}
    </div>
  );
}

export default SquareRender;
