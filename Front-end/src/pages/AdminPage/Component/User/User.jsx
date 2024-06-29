import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { IonIcon } from "@ionic/react";
import { trashBinOutline, addOutline } from "ionicons/icons";
import * as UserService from "../../../../services/UserService"
import { useMutationHook } from "../../../../hooks/useMutationHook";
import useSelection from "antd/es/table/hooks/useSelection";

import { Modal, Table } from "antd";
import { Upload } from "antd";

import styles from "../Component.module.scss"

const cx= classNames.bind(styles)

const User = () => {
  const [Data, setData] = useState([]);

  const token = JSON.parse(localStorage.getItem("access_token"))

  const mutationDelete = useMutationHook((data) => {
    const { id, token } = data;
    const res = UserService.deleteUser(id, token);
    return res;
  });

  const { data: dataDeleted, isLoading: isLoadingDeleted } = mutationDelete;

  const handleDeleteUser = (record) => {
    if (window.confirm("Bạn có muốn xoá người dùng này không?")) {

      mutationDelete.mutate({
        id: record._id,
        token: token,
      });

    }
  };

  useEffect(() => {
    if (dataDeleted?.status === "OK") {
      alert("Xóa thành công");
      window.location.reload();
    }
  }, [dataDeleted]);


  const columns = [
    {
      title: "Avatar",
      dataIndex: "profile",
      render: (text) => <img className={cx("item-image")} src={text ? text.avatar : ""}/>,
    },
    {
      title: "Username",
      dataIndex: "username",
      render: (text) => <p style={{ fontWeight: "550" }}>{text}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Authorization",
      dataIndex: "isAdmin",
      render: (text) => (
        <p style={{ fontWeight: "550" }}>{text ? "Admin" : "User"}</p>
      ),
    },


    {
      title: "Action",
      render: (text, record) => (
        <div>
          <div className={cx("AiIcons")} color="red" />
          {record.username !== 'admin' ? (
             <div>
             <IonIcon icon={trashBinOutline}
              className={cx("AiIcons")}
              color="red"
              onClick={() => {
                handleDeleteUser(record);
              }}
            >Delete</IonIcon>
            </div>
          ) : (<></>)}
         
         

        </div>
      ),
    },
  ];

  const fetchUserAll = async () => {
    try {

      const res = await UserService.getAllUser(token);

      console.log("Data fetched all product:", res);
      return res;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchUserAll();
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
      <p>Quản lí User</p>
      <div class={cx("content")}>
        <Table columns={columns} dataSource={Data} />
      </div>
    </div>
  );
};

export default User;
