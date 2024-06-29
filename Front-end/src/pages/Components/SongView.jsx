import React from "react";
import SquareItem from "./SquareItem";
import "../styles/main.css";
import "../styles/mph.css";
import "../styles/playlistview.css";
import "../styles/want_listen.css";
import { IonIcon } from "@ionic/react";
import { chevronForwardOutline } from "ionicons/icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function SongView({ titleText }) {
  const fetchTracks = async () => {
    const response = await fetch("http://localhost:5000/api/track/get-all");
    const data = await response.json();
    return data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["tracks"],
    queryFn: fetchTracks,
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data.data);

  const tracks = data.data;

  return (
    <div className="topic-item">
      <div class="tittle">
        <span>{titleText}</span>
        <a href="">
          <span>Tất cả</span>
          <IonIcon icon={chevronForwardOutline}></IonIcon>
        </a>
      </div>

      <div className="main_topic-item">
        {tracks.slice(0, 5).map((track) => (
          <SquareItem track={track} key={track.id} />
        ))}
      </div>
    </div>
  );
}

export default SongView;
