import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { getItem } from "../../utils";
import { Menu } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import User from "./Component/User/User";
import Genre from "./Component/Genre/Genre";
import Artist from "./Component/Artist/Artist";
import Track from "./Component/Track/Track";
import Playlist from "./Component/Playlist/Playlist";

import styles from "./Admin.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);


const ManagementPage = () => {
  const [keySelected, setKeySelected] = useState("");
  const items = [
    getItem(
      "Người dùng",
      "user",
      <FontAwesomeIcon icon="fa-solid fa-user" style={{ fontSize: "24px" }}/>
    ),
    getItem(
      "Bài nhạc",
      "track",
      <FontAwesomeIcon icon="fa-solid fa-music" style={{ fontSize: "24px" }}/>
    ),
    getItem(
      "Nghệ sĩ",
      "artist",
      <FontAwesomeIcon icon="fa-solid fa-user-music" style={{ fontSize: "24px" }}/>
    ),
    getItem(
      "Danh sách phát",
      "playlist",
      <FontAwesomeIcon icon="fa-sharp fa-light fa-album-collection-circle-user" style={{ fontSize: "24px" }}/>
    ),
    getItem(
      "Thể loại",
      "genre",
      <FontAwesomeIcon icon="fa-solid fa-music-magnifying-glass" style={{ fontSize: "24px" }}/>
    ),
  ];
  const rootSubmenuKeys = ["user", "track", "artist", "genre", "playlist"];
  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };

  const renderPage = (key) => {
    switch (key) {
    
      case "user":
        return <User/>;
      case "track":
        return <Track/>
      case "artist":
        return <Artist/>
      case "genre":
        return <Genre/>;
      case "playlist":
        return <Playlist/>;
      default:
        return <div>Default</div>;
    }
  };

  return (
    <div className={cx("container")}>
      <div>
        <Menu
          mode="inline"
          style={{
            left: 0,
            width: 256,
            height: "100vh",
            borderRight: "1px 2px 2px solid #f0f0f0",
            fontSize: "18px",
          }}
          items={items}
          onClick={handleOnClick}
        />
      </div>
      <div className={cx("content")}>{renderPage(keySelected)}</div>
    </div>
  );
}

export default ManagementPage;