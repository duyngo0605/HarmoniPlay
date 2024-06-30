import React, { useEffect, useRef, useState } from "react";
import * as ArtistService from "../../services/ArtistService";
import "../styles/Artist.css"
import { useNavigate } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import {chevronForwardOutline} from "ionicons/icons"

const FavoriteArtists = ({ ids }) => {
    const [number,setNumber] = useState(5);
    const handleShowMore = ( ) => {
        setNumber(number+5);
      }
    const [artists, setArtists] = useState([]);

    const navigate = useNavigate();

    const fetchArtists = async (ids) => {

        const res = await ArtistService.getAllArtist();
        const filteredArtists = res.data.filter(artist => ids.includes(artist._id));
        setArtists(filteredArtists);
        console.log('artists', artists);
    }

    useEffect(() => {
        if (ids) {
            fetchArtists(ids);
        }
      }, [ids]);

    const handleDetail = (id) => {
        navigate(`/artist/${id}`)
    }

    return (
        <div class="topic-item album-hot">
            <div class="tittle">
                <span>Nghệ sĩ đang theo dõi</span>
                <a onClick={handleShowMore}>
                <span>Thêm</span>
                <IonIcon icon={chevronForwardOutline}></IonIcon>
                </a>
            </div>
            
            {artists?.map(artist => (
                    <div class="artist-hero" >
                    <div class="hero-body" >
                      <div class="left"  >
                        <a href="" onClick={() => handleDetail(artist._id)}>
                        <figure class="avatar">
                          <img src={artist?.image} />
                          <figcaption><h3 class="artist-name">{artist?.name}</h3></figcaption>
                        </figure>
                        </a>
                       
                      </div>
                    </div>
                  </div>
                )).slice(0,number)}
        </div>
    );
};

export default FavoriteArtists;
