import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import * as ArtistService from "../../../../services/ArtistService"

import { Modal, Table } from "antd";
import { Upload } from "antd";

import styles from "../Component.module.scss"

const cx= classNames.bind(styles)

const Artist = () => {
  const [Data, setData] = useState([]);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (text) => <img className={cx("item-image")} src={text}/>,
    },
    {
      title: "name",
      dataIndex: "name",
      render: (text) => <p style={{ fontWeight: "550" }}>{text}</p>,
    },

    {
      title: "Country",
      dataIndex: "country",
      render: (text) => <p style={{ fontWeight: "550" }}>{text}</p>,
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

  const fetchArtistAll = async () => {
    try {
      const res = await ArtistService.getAllArtist();
      console.log("Data fetched all product:", res);
      return res;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchArtistAll();
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
      <p>Quản lí Artist</p>
      <div class={cx("content")}>
        <Table columns={columns} dataSource={Data} />
      </div>
    </div>
  );
};

export default Artist;
