import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import * as TrackService from "../../../../services/TrackService"

import { Modal, Table } from "antd";
import { Upload } from "antd";

import styles from "../Component.module.scss"

const cx= classNames.bind(styles)

const Track = () => {
  const [Data, setData] = useState([]);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (text) => <img className={cx("item-image")} src={text}/>,
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (text) => <p style={{ fontWeight: "550" }}>{text}</p>,
    },

    {
      title: "Artist",
      dataIndex: "artist",
      witdh: "10vw",
      render: (artists) => <div>
      {artists.map((item, index) => (
        <div
          key={index}
        >
        <p style={{ fontWeight: "550" }}>{item.name}</p>
        <br/>
          
        </div>
      ))}
    </div>
    },
    {
      title: "Genre",
      dataIndex: "genre",
      render: (genres) => <div>
      {genres.map((item, index) => (
        <div
          key={index}
        >
        <p style={{ fontWeight: "550" }}>{item.name}</p>
        <br/>
          
        </div>
      ))}
    </div>
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

  const fetchTrackAll = async () => {
    try {
      const res = await TrackService.getAllTrack();
      console.log("Data fetched all product:", res);
      return res;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchTrackAll();
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
      <p>Quản lí Track</p>
      <div class={cx("content")}>
        <Table columns={columns} 
        dataSource={Data} />
      </div>
    </div>
  );
};

export default Track;
