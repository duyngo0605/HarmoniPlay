import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import * as PlaylistService from "../../../../services/PlaylistService"

import { Modal, Table } from "antd";
import { Upload } from "antd";

import styles from "../Component.module.scss"

const cx= classNames.bind(styles)

const Playlist = () => {
  const [Data, setData] = useState([]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text) => <p style={{ fontWeight: "550" }}>{text}</p>,
    },
    {
      title: "Creator",
      dataIndex: "creator",
      render: (text) => <p style={{ fontWeight: "550" }}>{text.username}</p>,
    },

    {
      title: "Action",
      render: (text, record) => (
        <div>
          <div className={cx("AiIcons")} color="red" />
          <div className={cx("AiIcons")} color="#F0E68C" />
        </div>
      ),
    },
  ];

  const fetchPlaylistAll = async () => {
    try {
      const res = await PlaylistService.getAllPlaylist();
      console.log("Data fetched all product:", res);
      return res;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchPlaylistAll();
        setData(result.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
    console.log("Data:", Data);
  }, []);

  return (
    <div className={cx("container")}>
      <p>Quản lí Playlist</p>
      <div class={cx("content")}>
        <Table columns={columns} dataSource={Data} />
      </div>
    </div>
  );
};

export default Playlist;
