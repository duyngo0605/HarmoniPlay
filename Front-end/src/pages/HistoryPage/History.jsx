import React, { useEffect, useState } from 'react';
import * as UserService from "../../services/UserService"
import { jwtDecode } from 'jwt-decode';

import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import "../styles/main.css";
import styles from "./History.module.scss"
import classNames from "classnames/bind";
import { useNavigate } from 'react-router-dom';
import SquareRender from '../components/SquareRender';
import { IonIcon } from '@ionic/react';
import { chevronForwardOutline } from "ionicons/icons";

const cx = classNames.bind(styles);

const HistoryPage = () => {
    const [listeningHistory, setListeningHistory] = useState([]);

    const [number,setNumber] = useState(20);
    const handleShowMore = ( ) => {
        setNumber(number+5);
      }

    const navigate =useNavigate();

    const handleDetailTrack = (id) => {
        navigate(`/track/${id}`)
    }

    const token = JSON.parse(localStorage.getItem("access_token"))
    const decoded = jwtDecode(token);

    const fetchUserDetails = async () => {
      const res = await UserService.getDetailsUser(decoded?.id, token);
      console.log('res', res)
      setListeningHistory(res?.data.history)
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
          <div class="topic-item album-hot">
            <div class="tittle">
              <span>Bài hát nghe gần đây</span>
              <a onClick={handleShowMore}>
                <span>Thêm</span>
                <IonIcon icon={chevronForwardOutline}></IonIcon>
              </a>
            </div>

            <div id="all_item-albumHot" class="main_topic-item">
            {listeningHistory
                .map((id) => <div onClick={() => {handleDetailTrack(id)}}><SquareRender id={id} /></div> )
                .slice(0, number)}
            </div>
          </div>
        </div>
      </main></>
      

    );
};

export default HistoryPage;
