import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import * as GenreService from "../../../../services/GenreService"

import { Modal, Table } from "antd";
import { Upload } from "antd";

import styles from "./Genre.module.scss"

const cx= classNames.bind(styles)

const Genre = () => {
  const [Data, setData] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (text) => <p style={{ fontWeight: "550" }}>{text}</p>,
    },
    {
      title: "name",
      dataIndex: "name",
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

  const fetchGenreAll = async () => {
    try {
      const res = await GenreService.getAllGenre();
      console.log("Data fetched all product:", res);
      return res;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchGenreAll();
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
      <p>Quản lí Genre</p>
      <div class={cx("content")}>
        <Table columns={columns} dataSource={Data} />
      </div>
    </div>
  );
};

export default Genre;
