import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { IonIcon } from "@ionic/react";
import { trashBinOutline, addOutline,pencilOutline } from "ionicons/icons";
import * as GenreService from "../../../../services/GenreService"
import { useMutationHook } from "../../../../hooks/useMutationHook";

import { Checkbox, Modal, Table } from "antd";
import { Upload } from "antd";

import styles from "../Component.module.scss"

const cx= classNames.bind(styles)

const Genre = () => {
  const [isModalOpenAddGenre, setIsModalOpenAddGenre] = useState(false);
  const [isModalOpenEditGenre, setIsModalOpenEditGenre] = useState(false);
  const [rowSelected, setRowSelected] = useState("");

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleCheckboxChange = (record) => {
    const currentIndex = selectedRowKeys.indexOf(record._id);
    const newSelectedRowKeys = [...selectedRowKeys];

    if (currentIndex === -1) {
      newSelectedRowKeys.push(record._id);
    } else {
      newSelectedRowKeys.splice(currentIndex, 1);
    }
    setSelectedRowKeys(newSelectedRowKeys);
    console.log('selected',selectedRowKeys)
  }

  const [stateGenre, setStateGenre] = useState({
    name: "",
    
  });

  const [stateGenreDetails, setStateGenreDetails] = useState({
    name: "",
  });

  const token = JSON.parse(localStorage.getItem("access_token"))

  const mutation = useMutationHook((data) =>
    GenreService.createGenre(data, token)
  );
  const mutationUpdate = useMutationHook((data) => {
    const { id, token, ...rests } = data;
    const res = GenreService.updateGenre(id, token, { ...rests });
    return res;
  });

  const mutationDelete = useMutationHook((data) => {
    const { id, token } = data;
    const res = GenreService.deleteGenre(id, token);
    return res;
  });

  const mutationDeleteMany = useMutationHook((data) => {
    const { ids, token } =data;
    const res = GenreService.deleteManyGenres({ids: ids}, token);
    return res;
  });

  const [Data, setData] = useState([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <p style={{ fontWeight: "550" }}>{text}</p>,
    },

    {
      title: "Action",
      render: (text, record) => (
        <div className={cx("flex-row")}>
          <IonIcon icon={pencilOutline}
            className={cx("AiIcons")}
            color="green"
            onClick={() => handleDetailGenre(record)}
          >Edit</IonIcon>
          <IonIcon icon={trashBinOutline}
            className={cx("AiIcons")}
            color="red"
            onClick={() => {
              handleDeleteGenre(record);
            }}
          >Delete</IonIcon>
          <Checkbox
            onChange={() => handleCheckboxChange(record)}
          />
        </div>
        
      ),
    },
  ];

  const { isError, isSuccess } = mutation;
  const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;

  const { data: dataDeleted, isLoading: isLoadingDeleted } = mutationDelete;
  const { data: dataDeletedMany, isLoading: isLoadingDeletedMany } = mutationDeleteMany;

  const handleOkAddGenre = () => {
    mutation.mutate(stateGenre);
    setIsModalOpenAddGenre(false);
  };


  const handleCancelAddGenre = () => {
    setIsModalOpenAddGenre(false);
  };

  const handleOnChange = (event) => {
    setStateGenre({
      ...stateGenre,
      [event.target.name]: event.target.value,
    });
  };

  const handleDetailGenre = (record) => {
    setRowSelected(record._id);
    fetchGetDetailsGenre(record._id);
    setIsModalOpenEditGenre(true);
  };
  const fetchGetDetailsGenre = async (rowSelected) => {
    try {
      const res = await GenreService.getDetailsGenre(rowSelected);
      if (res?.data) {
        setStateGenreDetails({
          name: res?.data?.name
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleUpdateGenre = () => {
    mutationUpdate.mutate({
      id: rowSelected,
      token: token,
      ...stateGenreDetails,
    });
    setIsModalOpenEditGenre(false);
  };

  const handleOnChangeEdit= (event) => {
    setStateGenreDetails({
      ...stateGenreDetails,
      [event.target.name]: event.target.value,
    });

  };


  const handleDeleteGenre = (record) => {
    if (window.confirm("Bạn có muốn xoá thể loại này không?")) {

      mutationDelete.mutate({
        id: record._id,
        token: token,
      });

    }
  };

  const handleDeleteManyGenres = () => {
    if (window.confirm("Bạn có muốn xoá các thể loại này không?")) {
      mutationDeleteMany.mutate({
        ids: selectedRowKeys,
        token: token,
      });
    }
  };

  useEffect(() => {
    if (isSuccess && mutation.data.status === "OK") {
      alert("Thêm thể loại thành công");
      console.log(mutation.data.status);
      window.location.reload();
    } else if (isError) {
      alert(mutation.data);
      console.log("ERR mutation.data:", mutation.data);
      console.log("ERR mutationERR:", mutation.error);
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isSuccessUpdated) {
      alert("Cập nhật thành công");
      window.location.reload();
    }
  }, [isSuccessUpdated]);

  useEffect(() => {
    if (dataDeleted?.status === "OK") {
      alert("Xóa thành công");
      window.location.reload();
    }
    else if (dataDeleted?.status === "ERR") {
      alert(dataDeleted?.message)
    }
  }, [dataDeleted]);

  useEffect(() => {
    if (dataDeletedMany?.status === "OK") {
      alert("Xóa các thể loại thành công");
      window.location.reload();
    }
    else if (dataDeletedMany?.status === "ERR") {
      alert(dataDeletedMany?.message)
    }
  }, [dataDeletedMany]);


  const fetchGenreAll = async () => {
    try {
      const res = await GenreService.getAllGenre();
      console.log("Data fetched all Genre:", res);
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
      <div className={cx("flex-row")}>
        <h1>Quản lí Genre</h1>
        <div
          className={cx("add")}
          onClick={() => {
            setIsModalOpenAddGenre(true);
          }}
        >

          <IonIcon icon={addOutline}
              className={cx("AiIcons")}
              color="blue"
            
            ></IonIcon>
          
        </div>
        <div>
        {selectedRowKeys.length > 0 ? (
          <button className={cx("delete-button")} onClick={handleDeleteManyGenres} >
            Xóa các thể loại đã chọn
          </button>) : (<></>)}
        </div>
      
      </div>
      
      <div class={cx("content")}>
        
        <Table columns={columns} dataSource={Data} />
      </div>

      <Modal
        title="Add new genre"
        open={isModalOpenAddGenre}
        onOk={handleOkAddGenre}
        onCancel={handleCancelAddGenre}
        footer={[
          <div className={cx("wrapper-button")}>
            <div
              className={cx("modal-button-cancel")}
              onClick={handleCancelAddGenre}
            >
              Cancel
            </div>

            <div
              className={cx("modal-button-submit")}
              onClick={handleOkAddGenre}
            >
              Submit
            </div>
          </div>,
        ]}
      >
        <div>
          <div className={cx("modal-input")}>
            <p>Name:</p>
            <input
              type="text"
              value={stateGenre.name}
              onChange={handleOnChange}
              name="name"
            />
          </div>
        </div>
      </Modal>

      <Modal
        title="Edit genre"
        open={isModalOpenEditGenre}
        onOk={handleUpdateGenre}
        onCancel={() => setIsModalOpenEditGenre(false)}
        footer={[
          <div className={cx("wrapper-button")}>
            <div
              className={cx("modal-button-cancel")}
              onClick={() => setIsModalOpenEditGenre(false)}
            >
              Cancel
            </div>

            <div
              className={cx("modal-button-submit")}
              onClick={handleUpdateGenre}
            >
              Submit
            </div>
          </div>,
        ]}
      >
        <div>
          <div className={cx("modal-input")}>
            <p>Name:</p>
            <input
              type="text"
              value={stateGenreDetails.name}
              onChange={handleOnChangeEdit}
              name="name"
            />
          </div>
        </div>
      </Modal>
    </div>

    
  );
};

export default Genre;
