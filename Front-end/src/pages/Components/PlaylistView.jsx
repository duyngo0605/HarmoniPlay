import React from "react";
import SquarePlaylist from "./SquarePlaylist";
import "../styles/main.css";
import "../styles/mph.css";
import "../styles/playlistview.css";
import "../styles/want_listen.css";
import { IonIcon } from "@ionic/react";
import { chevronForwardOutline } from "ionicons/icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function PlaylistView({ titleText }) {
  const fetchPlaylists = async () => {
    const response = await fetch("http://localhost:5000/api/playlist/get-all");
    const data = await response.json();
    return data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["playlists"],
    queryFn: fetchPlaylists,
  });

  const playlists = data?.data;
  console.log(playlists);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

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
        {playlists.slice(0, 5).map((playlist) => (
          <SquarePlaylist playlist={playlist} key={playlist.id} />
        ))}
      </div>
    </div>
  );
}

export default PlaylistView;
