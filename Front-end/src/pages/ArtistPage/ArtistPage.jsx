import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { IonIcon } from "@ionic/react";
import { chevronForwardOutline } from "ionicons/icons";

import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import "../styles/Artist.css";
import "../styles/want_listen.css";
import "../styles/main.css";
import "../styles/playlistview.css";
import "../styles/playlistpage.css";
import MediaForMusic from "../components/MediaForMusic";
import SquareItem from "../components/SquareItem";
import SquareRender from "../components/SquareRender";

import { jwtDecode } from "jwt-decode";
import * as ArtistService from "../../services/ArtistService"
import * as UserService from "../../services/UserService"

const ArtistPage = () => {
  const { id } = useParams();
  const[isFollowing, setIsFollowing] = useState(false);

  const navigate = useNavigate()

  const token = JSON.parse(localStorage.getItem("access_token"))

  let decoded;
  if(token){ 
    decoded = jwtDecode(token)}
  
  const [stateArtist, setStateArtist] = useState({
    name: "",
    image: "",
    country: "",
    description: "",
    follower: 0,
    tracks: []
  });

  const [number,setNumber] = useState(5);

  const fetchGetDetailsArtist = async (id) => {
    try {
      const res = await ArtistService.getDetailsArtist(id);
      console.log('res', res)
      if (res?.data) {
        setStateArtist({
          name: res?.data?.name,
          image: res?.data?.image,
          country: res?.data?.country,
          description: res?.data?.description,
          tracks: res?.data?.tracks,
          follower: res?.data?.follower
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchGetDetailsArtist(id);
    }
  }, [id]);

  useEffect(() => {
    const checkIfFollowing = async () => {
      try {

        const res = await UserService.getDetailsUser(decoded?.id, token);
        if (res?.status === 'OK' && res?.data) {
          const user = res.data;
          const isFollowingArtist = user.favorites.artists.includes(id);

          setIsFollowing(isFollowingArtist);
        } else {
          console.error('Error fetching user details:', res.message);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    checkIfFollowing();
  }, [id, isFollowing]);


  const handleFollow = async () => {
    if(!token)
    {
      navigate('/login')
    }
    else {
    if(!isFollowing)
    {
      const res = await UserService.updateUser(decoded?.id, token, {
        addArtistToFavorites: id
      })
      await ArtistService.updateArtist(id, token, {
        isFollowed: true
      })
      if (res?.status === 'OK')
        {
          alert("Đã thêm nghệ sĩ vào mục yêu thích!")
        }
    }
    else{
      const res = await UserService.updateUser(decoded?.id, token, {
        removeArtistFromFavorites: id
      })
      await ArtistService.updateArtist(id, token, {
        isUnFollowed: true
      })
      if (res?.status === 'OK')
        {
          alert("Đã xóa nghệ sĩ khỏi mục yêu thích!")
        }
    }
    setIsFollowing(!isFollowing)}
  }

  const handleShowMore = ( ) => {
    setNumber(number+5);
  }

  const handleDetailTrack =(id) => {
    navigate(`/track/${id}`)
  }

  return (
    <>
      <Navbar />
      <main>
        <Header />
        <div id="main_scroll">
          <div class="artist-hero">
            <div class="hero-body">
              <div class="left">
                <figure class="avatar">
                  <img src={stateArtist?.image} />
                </figure>
                <div class="information">
                  <div class="top">
                    <h3 class="artist-name">{stateArtist?.name}</h3>
                    <ion-icon
                      class="music_status--pause"
                      name="play-circle-outline"
                    ></ion-icon>
                  </div>
                  <div class="bottom">

                    <button class="follow-btn" onClick={handleFollow}>{isFollowing ? ('Hủy theo dõi') : ('Theo dõi')}</button>
                  </div>
                  <div class="follower">
                  <span >{stateArtist.follower + ' Người theo dõi'}</span>
                  </div>
 
                </div>
              </div>
            </div>
          </div>

          <div class="artist-home-content">
            <div class="top_section_container topic-item">
              <div class="tittle recently_tittle">
                <span>Bài Hát Nổi Bật</span>
                <a href="">
                  <span>Tất cả</span>
                  <ion-icon name="chevron-forward-outline"></ion-icon>
                </a>
              </div>

              <div class="colums">
                <div class="colum">
                  <div class="list">
                    {stateArtist?.tracks
                      ?.map((id) => <div onClick={() => handleDetailTrack(id)}><MediaForMusic id={id}  /></div>)
                      .slice(0, 3)}
                  </div>
                </div>
                <div class="colum">
                  <div class="list">
                    {stateArtist?.tracks
                      ?.map((id) => <MediaForMusic id={id} onClick={() => handleDetailTrack(id)} />)
                      .slice(3, 6)}
                  </div>
                </div>
              </div>
            </div>

            <div class="topic-item album-hot">
              <div class="tittle">
                <span>Single </span>
                <a onClick={handleShowMore}>
                  <span>Thêm</span>
                  <IonIcon icon={chevronForwardOutline}></IonIcon>
                </a>
              </div>
              

              <div id="all_item-albumHot" class="main_topic-item">
                {stateArtist?.tracks
                  .map((id) => <div onClick={() => {handleDetailTrack(id)}}><SquareRender id={id} /></div> )
                  .slice(0, number)}
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
};

export default ArtistPage;
