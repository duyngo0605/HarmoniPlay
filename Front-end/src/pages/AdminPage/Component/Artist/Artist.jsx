import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { IonIcon } from "@ionic/react";
import { trashBinOutline, addOutline,pencilOutline } from "ionicons/icons";
import * as ArtistService from "../../../../services/ArtistService"
import { useMutationHook } from "../../../../hooks/useMutationHook";
import { useCountries } from 'use-react-countries'

import { Modal, Table, Checkbox } from "antd";
import { Upload } from "antd";

import styles from "../Component.module.scss"

const cx= classNames.bind(styles)

const Artist = () => {
  const [isModalOpenAddArtist, setIsModalOpenAddArtist] = useState(false);
  const [isModalOpenEditArtist, setIsModalOpenEditArtist] = useState(false);
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

  const [stateArtist, setStateArtist] = useState({
    name: "",
    image: "",
    country: "Vietnam",
    description: "",
  });

  const [stateArtistDetails, setStateArtistDetails] = useState({
    name: "",
    image: "",
    country: "",
    description: "",
  });

  const { countries } = useCountries()

  countries.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  const token = JSON.parse(localStorage.getItem("access_token"))


  const mutation = useMutationHook((data) =>
    ArtistService.createArtist(data, token)
  );
  const mutationUpdate = useMutationHook((data) => {
    const { id, token, ...rests } = data;
    const res = ArtistService.updateArtist(id, token, { ...rests });
    return res;
  });

  const mutationDelete = useMutationHook((data) => {
    const { id, token } = data;
    const res = ArtistService.deleteArtist(id, token);
    return res;
  });

  const mutationDeleteMany = useMutationHook((data) => {
    const { ids, token } = data;
    const res = ArtistService.deleteManyArtists({ids: ids}, token);
    return res;
  });


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
        <div className={cx("flex-row")}>
          <IonIcon icon={pencilOutline}
            className={cx("AiIcons")}
            color="green"
            onClick={() => handleDetailArtist(record)}
          >Edit</IonIcon>
          <IonIcon icon={trashBinOutline}
            className={cx("AiIcons")}
            color="red"
            onClick={() => {
              handleDeleteArtist(record);
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


  const handleOkAddArtist = () => {
    mutation.mutate(stateArtist);
    setIsModalOpenAddArtist(false);
  };


  const handleCancelAddArtist = () => {
    setIsModalOpenAddArtist(false);
  };

  const handleOnChange = (event) => {
    setStateArtist({
      ...stateArtist,
      [event.target.name]: event.target.value,
    });
  };

  const handleDetailArtist = (record) => {
    setRowSelected(record._id);
    fetchGetDetailsArtist(record._id);
    setIsModalOpenEditArtist(true);
  };
  const fetchGetDetailsArtist = async (rowSelected) => {
    try {
      const res = await ArtistService.getDetailsArtist(rowSelected);
      if (res?.data) {
        setStateArtistDetails({
          name: res?.data?.name,
          image: res?.data?.image,
          country: res?.data?.country,
          description: res?.data?.description,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleUpdateArtist = () => {
    mutationUpdate.mutate({
      id: rowSelected,
      token: token,
      ...stateArtistDetails,
    });
    setIsModalOpenEditArtist(false);
  };

  const handleOnChangeEdit= (event) => {
    setStateArtistDetails({
      ...stateArtistDetails,
      [event.target.name]: event.target.value,
    });

  };


  const handleDeleteArtist = (record) => {
    if (window.confirm("Bạn có muốn xoá nghệ sĩ này không?")) {

      mutationDelete.mutate({
        id: record._id,
        token: token,
      });

    }
  };

  const handleDeleteManyArtists = () => {
    if (window.confirm("Bạn có muốn xoá các nghệ sĩ này không?")) {
      mutationDeleteMany.mutate({
        ids: selectedRowKeys,
        token: token,
      });
    }
  };


  useEffect(() => {
    if (isSuccess && mutation.data.status === "OK") {
      alert("Thêm nghệ sĩ thành công");
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
      alert(dataDeleted?.message);
    }
  }, [dataDeleted]);

  useEffect(() => {
    if (dataDeletedMany?.status === "OK") {
      alert("Xóa thành công");
      window.location.reload();
    }
    else if (dataDeletedMany?.status === "ERR") {
      alert(dataDeletedMany?.message);
    }
  }, [dataDeletedMany]);

  const fetchArtistAll = async () => {
    try {
      const res = await ArtistService.getAllArtist();
      console.log("Data fetched all Artist:", res);
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

  const [descrRowsCount, setDescrRowsCount] = useState(4);
  const descrTextareaRef = useRef();
  const [descrHeightAuto, setDescrHeightAuto] = useState(true);

  const handleOnChangeImage = async (e) => {

    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setStateArtist({
          ...stateArtist,
          image: e.target.result
        });
      };
      reader.readAsDataURL(file);
        
    }
  };

  const handleOnChangeImageEdit = async (e) => {

    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setStateArtistDetails({
          ...stateArtistDetails,
          image: e.target.result
        });
      };
      reader.readAsDataURL(file);
        
    }
  };
  

  return (
    <div className={cx("container")}>
      <div className={cx("flex-row")}>
      <h1>Quản lí Artist</h1>
      <div
          className={cx("add")}
          onClick={() => {
            setIsModalOpenAddArtist(true);
          }}
        >

          <IonIcon icon={addOutline}
              className={cx("AiIcons")}
              color="blue"
            
            ></IonIcon>
        </div>
        <div>
        {selectedRowKeys.length > 0 ? (
          <button className={cx("delete-button")} onClick={handleDeleteManyArtists} >
            Xóa các nghệ sĩ đã chọn
          </button>) : (<></>)}
        </div>
      </div>
      
      <div class={cx("content")}>
        <Table columns={columns} dataSource={Data} />
      </div>
      
      <Modal
        title="Add new artist"
        open={isModalOpenAddArtist}
        onOk={handleOkAddArtist}
        onCancel={handleCancelAddArtist}
        footer={[
          <div className={cx("wrapper-button")}>
            <div
              className={cx("modal-button-cancel")}
              onClick={handleCancelAddArtist}
            >
              Cancel
            </div>

            <div
              className={cx("modal-button-submit")}
              onClick={handleOkAddArtist}
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
              value={stateArtist.name}
              onChange={handleOnChange}
              name="name"
            />
          </div>
          <div className={cx("modal-input")}>
            <p>Image:</p>
            <input
                  type="text"
                  value={stateArtist.image}
                  onChange={handleOnChange}
                  name="image"
                />
          </div>
          <div className={cx("modal-input")}>
            <div className={cx(".centered-div")}>
            {stateArtist.image ? 
              (<div>
                 <img
                src={stateArtist.image}
                alt="Uploaded Image"
                style={{ maxWidth: "100px" }}
              />
              </div>
             
              ) : (
               <></>
              )}
              
              <button className={cx("file-input-label")} onClick={() => {
                  document.getElementById("selectAvatar").click();
                }}>
                  Choose File
                  <input id="selectAvatar"
                    type="file"
                    accept="image/*"
                    onChange={handleOnChangeImage}
                    className={cx("file-input")}
                    hidden
                  />
                </button>
            </div>
          
          </div>
          
          
          <div className={cx("modal-input")}>
            <p>Country:</p>
            <select value={stateArtist.country ? stateArtist.country : "Vietnam"} name="country"  onChange={handleOnChange}>
            {countries.map((item) => (
                <option
                  className={cx("dropdownitem")}
                 
                >
                  <p>{item.name}</p>
                </option>
              ))}
            </select>
          </div>
          <div className={cx("modal-input")}>
            <p>Description:</p>
            <textarea
              rows={descrRowsCount}
              value={stateArtist.description}
              onChange={handleOnChange}
              name="description"
              style={{width: '300px', padding: '0.8rem', fontSize: '1rem', resize: 'vertical', height: descrHeightAuto?'auto':'0'}}
              ref={descrTextareaRef}
              ></textarea>
          </div>
        </div>
      </Modal>

      <Modal
        title="Edit Artist"
        open={isModalOpenEditArtist}
        onOk={handleUpdateArtist}
        onCancel={() => setIsModalOpenEditArtist(false)}
        footer={[
          <div className={cx("wrapper-button")}>
            <div
              className={cx("modal-button-cancel")}
              onClick={() => setIsModalOpenEditArtist(false)}
            >
              Cancel
            </div>

            <div
              className={cx("modal-button-submit")}
              onClick={handleUpdateArtist}
            >
              Submit
            </div>
          </div>,
        ]}
      >
        <div className={cx("modal-input")}>
            <p>Name:</p>
            <input
              type="text"
              value={stateArtistDetails.name}
              onChange={handleOnChangeEdit}
              name="name"
            />
          </div>
          <div className={cx("modal-input")}>
            <p>Image:</p>
            <input
                  type="text"
                  value={stateArtistDetails.image}
                  onChange={handleOnChangeEdit}
                  name="image"
                />
          </div>
          <div className={cx("modal-input")}>
            <div className={cx(".centered-div")}>
            {stateArtistDetails.image ? 
              (<div>
                 <img
                src={stateArtistDetails.image}
                alt="Uploaded Image"
                style={{ maxWidth: "100px" }}
              />
              </div>
             
              ) : (
               <></>
              )}
              
              <button className={cx("file-input-label")} onClick={() => {
                  document.getElementById("selectAvatarEdit").click();
                }}>
                  Choose File
                  <input id="selectAvatarEdit"
                    type="file"
                    accept="image/*"
                    onChange={handleOnChangeImageEdit}
                    className={cx("file-input")}
                    hidden
                  />
                </button>
            </div>
          
          </div>
          
          <div className={cx("modal-input")}>
            <p>Country:</p>
            <select value={stateArtistDetails.country} onChange={handleOnChangeEdit} name="country">
            {countries.map((item) => (
                <option
                  value={item.name}
                  className={cx("dropdownitem")}
                  onClick={() => {
                    setStateArtistDetails({
                      ...stateArtistDetails,
                      country: item.name
                    });
                  }}
                >
                  <p>{item.name}</p>
                </option>
              ))}
            </select>
          </div>
          <div className={cx("modal-input")}>
            <p>Description:</p>
            <textarea
              rows={descrRowsCount}
              value={stateArtistDetails.description}
              onChange={handleOnChangeEdit}
              name="description"
              style={{width: '300px', padding: '0.8rem', fontSize: '1rem', resize: 'vertical', height: descrHeightAuto?'auto':'0'}}
              ref={descrTextareaRef}
              ></textarea>
          </div>
      </Modal>
    </div>
  );
};

export default Artist;
