import React, { useEffect, useState } from 'react';
import FavoriteArtists from './FavoriteArtists';
import FavoriteTracks from './FavoriteTracks';
import FavoritePlaylists from './FavoritePlaylists';
import * as UserService from "../../services/UserService"
import { jwtDecode } from 'jwt-decode';

import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import "../styles/main.css";
import styles from "./Library.module.scss"
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const LibraryPage = () => {
    const [favorites, setFavorites] = useState({
        artists: [],
        tracks: [],
        playlists: [],
    });
    const [listeningHistory, setListeningHistory] = useState([]);

    const token = JSON.parse(localStorage.getItem("access_token"))
    const decoded = jwtDecode(token);

    const fetchUserDetails = async () => {
      const res = await UserService.getDetailsUser(decoded?.id, token);
      console.log('res', res)
      setFavorites({
        artists: res?.data.favorites.artists,
        tracks: res?.data.favorites.tracks,
        playlists: res?.data.favorites.playlists,
      })
      console.log('favorites',favorites);
      return res.data;
    }

    useEffect(() => {
      fetchUserDetails();
    }, []);

    return (
      <>
      <Navbar/>
      <main>
        <Header/>

        <div className={cx("container")}>
            <FavoriteArtists ids={favorites?.artists} />
            <FavoriteTracks tracks={favorites?.tracks} />
            <FavoritePlaylists playlists={favorites?.playlists} />
        </div>
      </main></>
      

    );
};

export default LibraryPage;
