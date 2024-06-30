import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from 'react-player'
import { IonIcon } from "@ionic/react";
import { chevronForwardOutline } from "ionicons/icons";

import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import MediaPlayer from "./MediaPlayer";
import "../styles/Artist.css";
import "../styles/want_listen.css";
import "../styles/main.css";
import "../styles/playlistview.css";
import "../styles/playlistpage.css";
import MediaForMusic from "../components/MediaForMusic";
import SquareItem from "../components/SquareItem";
import SquareRender from "../components/SquareRender";
import styles from "./Track.module.scss"
import classNames from "classnames/bind";

import { jwtDecode } from "jwt-decode";
import * as ArtistService from "../../services/ArtistService"
import * as UserService from "../../services/UserService"
import * as TrackService from "../../services/TrackService"
import * as GenreService from "../../services/GenreService"

const cx = classNames.bind(styles)
const TrackPage = () => {
    const { id } = useParams();
    const[isLiked, setIsLiked] = useState(false);
  
    const navigate = useNavigate()
  
    const token = JSON.parse(localStorage.getItem("access_token"))
  
    let decoded;
    if(token){ 
      decoded = jwtDecode(token)}
    
    const [stateTrack, setStateTrack] = useState({
      title: "",
      image: "",
      link: "",
      duration: 0,
      releaseDate: "",
      plays: 0,
      likes: 0,
      genre: [],
      artist: []
    });
  
    const [suggestedTracks, setSuggestedTracks] = useState([]);
  
    const fetchGetDetailsTrack = async (id) => {
      try {
        const res = await TrackService.getDetailsTrack(id);
        await UserService.updateUser(decoded?.id, token, {
          addTrackToHistory: id
        })
        TrackService.updateTrack(id, token, {
          play: true
        })
        console.log('res', res)
        if (res?.data) {
          setStateTrack(res.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
  
    const fetchSuggestedTracks = async () => {
      try {
        const res = await TrackService.recommendTracks(id);

        if (res?.data) {
          setSuggestedTracks(res.data);
        }
        console.log('recommend', suggestedTracks);
      } catch (error) {
        console.log("error", error);
      }
    };
  
    useEffect(() => {
      if (id) {
          fetchGetDetailsTrack(id);
      }
      fetchSuggestedTracks();
      
    }, [id]);
  
    useEffect(() => {
      const checkIfLiked = async () => {
        try {
          
          const res = await UserService.getDetailsUser(decoded?.id, token);
          if (res?.status === 'OK' && res?.data) {
            const user = res.data;
            const likedTrack = user.favorites.tracks.includes(id);
            
            setIsLiked(likedTrack);

          } else {
            console.error('Error fetching user details:', res.message);
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
  
      checkIfLiked();
    }, [id, isLiked]);
  
  
    const handleFollow = async () => {
      if(!token)
      {
        navigate('/login')
      }
      else {
      if(!isLiked)
      {
        const res = await UserService.updateUser(decoded?.id, token, {
          addTrackToFavorites: id
        })
        await TrackService.updateTrack(id, token, {
          like: true
        })
        if (res?.status === 'OK')
          {
            alert("Đã thêm bài hát vào mục yêu thích!")
          }
      }
      else{
        const res = await UserService.updateUser(decoded?.id, token, {
          removeTrackFromFavorites: id
        })
        await TrackService.updateTrack(id, token, {
          unlike: true
        })
        if (res?.status === 'OK')
          {
            alert("Đã xóa bài hát khỏi mục yêu thích!")
          }
      }
      setIsLiked(!isLiked)}
    }
  
    const handleDetailArtist = (id) => {
      navigate(`/artist/${id}`)
    }

    const handleDetailTrack = (id) => {
        navigate(`/track/${id}`)
      }
  
    return (
      <>
        <Navbar />
        <main>
          <Header />
          <div className={cx("container")}>
                <div className={cx("left-column")}>
                <div class="artist-hero">
                  <div class="hero-body">
                      <div class="left">
                        <figure class="avatar">
                            <img src={stateTrack?.image} />
                        </figure>
                      <div class="information">
                      <div class="top">
                        <h3 class="artist-name" style={{maxWidth: '500'}}>{stateTrack?.title}</h3>
                        </div>
                        <div class="list">
                        <span>
                          {stateTrack?.genre.map((item) =>  <p key={item._id}>{item.name + "    "}</p>)}
                        </span>
                      </div>
      
                      <div class="bottom">
                        <button class="follow-btn" onClick={handleFollow}>{isLiked ? ('Hủy thích') : ('Thích')}</button>
                      </div>
                      <div class="follower">
                        <span>{stateTrack.plays} lượt nghe</span>
                      </div>
                      <div class="follower">
                        <span>{stateTrack.likes} người thích</span>
                      </div>
                    </div>
                    </div>
                </div>
                </div>
                <MediaPlayer link={stateTrack.link} duration={stateTrack.duration} />
                <br></br>
                <h2>Danh sách nghệ sĩ</h2>
                {stateTrack?.artist.map(item => (
                <div class="artist-hero" key={item._id}>
                    <div class="hero-body">
                    <div class="left">
                        <a href="" onClick={() => handleDetailArtist(item._id)}>
                        <figure class="avatar">
                            <img src={item?.image} />
                            <figcaption><h3 class="artist-name">{item?.name}</h3></figcaption>
                        </figure>
                        </a>
                    </div>
                    </div>
                </div>
                )).slice(0,5)}
                
                
                
                </div>
                
                <div className={cx("right-column")}>
                    <h2>Đề xuất bài hát</h2>
                    {suggestedTracks.map(item => (
                      <div onClick={() => handleDetailTrack(item.track._id)}><SquareRender id={item.track._id} /></div>
                    
                    )).slice(0,5)}
                </div>
           </div>
         
        </main>
      </>
    );
  };
  
  export default TrackPage;