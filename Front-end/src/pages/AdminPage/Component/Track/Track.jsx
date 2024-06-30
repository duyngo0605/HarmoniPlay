import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { IonIcon } from "@ionic/react";
import { trashBinOutline, addOutline,pencilOutline } from "ionicons/icons";
import * as TrackService from "../../../../services/TrackService"
import * as ArtistService from "../../../../services/ArtistService"
import * as GenreService from "../../../../services/GenreService"
import { useMutationHook } from "../../../../hooks/useMutationHook";

import { Modal, Table, Checkbox } from "antd";
import { Upload } from "antd";

import styles from "../Component.module.scss"

const cx= classNames.bind(styles)

const Track = () => {
  const [isModalOpenAddTrack, setIsModalOpenAddTrack] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isModalOpenEditTrack, setIsModalOpenEditTrack] = useState(false);

  
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

  const [isDropdownType, setIsDropdownType] = useState(false);
  const [isDropdownCompany, setIsDropdownCompany] = useState(false);
  const [stateTrack, setStateTrack] = useState({
    title: "",
    artist: [""],
    link: "",
    image: "",
    genre: [""],
    releaseDate: "2024",
    duration: 0,
  });

  const [stateTrackDetails, setStateTrackDetails] = useState({
    title: "",
    artist: [],
    link: "",
    image: "",
    genre: [],
    releaseDate: "",
    duration: 0,
  });

  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);


  const token = JSON.parse(localStorage.getItem("access_token"))


  const mutation = useMutationHook((data) =>
    TrackService.createTrack(data, token)
  );
  const mutationUpdate = useMutationHook((data) => {
    const { id, token, ...rests } = data;
    const res = TrackService.updateTrack(id, token, { ...rests });
    return res;
  });

  const mutationDelete = useMutationHook((data) => {
    const { id, token } = data;
    const res = TrackService.deleteTrack(id, token);
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
        <div className={cx("flex-row")}>
          <IonIcon icon={pencilOutline}
            className={cx("AiIcons")}
            color="green"
            onClick={() => handleDetailTrack(record)}
          >Edit</IonIcon>
          <IonIcon icon={trashBinOutline}
            className={cx("AiIcons")}
            color="red"
            onClick={() => {
              handleDeleteTrack(record);
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


  const handleOkAddTrack = () => {
    mutation.mutate(stateTrack);
    setIsModalOpenAddTrack(false);
  };


  const handleCancelAddTrack = () => {
    setIsModalOpenAddTrack(false);
  };

  const handleOnChange = (event) => {
    const { name, value, type, options } = event.target;

    if (type === 'select-multiple') {
      const selectedValues = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);

      setStateTrack({
        ...stateTrack,
        [name]: selectedValues,
      });
    } else {
      setStateTrack({
        ...stateTrack,
        [name]: value,
      });
    }
  };

  const handleDetailTrack = (record) => {
    setRowSelected(record._id);
    fetchGetDetailsTrack(record._id);
    setIsModalOpenEditTrack(true);
  };
  const fetchGetDetailsTrack = async (rowSelected) => {
    try {
      const res = await TrackService.getDetailsTrack(rowSelected);
      if (res?.data) {
        setStateTrackDetails({
          title: res?.data?.title,
          artist: res?.data?.artist,
          link: res?.data?.link,
          image: res?.data?.image,
          genre: res?.data?.genre,
          releaseDate: res?.data?.releaseDate,
          duration: res?.data?.duration,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleUpdateTrack = () => {
    mutationUpdate.mutate({
      id: rowSelected,
      token: token,
      ...stateTrackDetails,
    });
    setIsModalOpenEditTrack(false);
  };

  const handleOnChangeEdit = (event) => {
    const { name, value, type, options } = event.target;

    if (type === 'select-multiple') {
      const selectedValues = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);

      setStateTrackDetails({
        ...stateTrackDetails,
        [name]: selectedValues,
      });
    } else {
      setStateTrackDetails({
        ...stateTrackDetails,
        [name]: value,
      });
    }
  };


  const handleDeleteTrack = (record) => {
    if (window.confirm("Bạn có muốn xoá bài hát này không?")) {

      mutationDelete.mutate({
        id: record._id,
        token: token,
      });

    }
  };

  const handleDeleteManyTracks = () => {
    if (window.confirm("Bạn có muốn xoá các bài hát này không?")) {
      mutationDeleteMany.mutate({
        ids: selectedRowKeys,
        token: token,
      });
    }
  };


  useEffect(() => {
    if (isSuccess && mutation.data.status === "OK") {
      alert("Thêm bài hát thành công");
      console.log(mutation.data.status);
      window.location.reload();
    } else if (isError) {
      alert(mutation.error.message);
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
  }, [dataDeleted]);

  const fetchTrackAll = async () => {
    try {
      const res = await TrackService.getAllTrack();
      console.log("Data fetched all Track:", res);
      return res;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchArtistAll = async () => {
    try {
      const res = await ArtistService.getAllArtist();
      console.log("Data fetched all artist:", res);
      return res;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchGenreAll = async () => {
    try {
      const res = await GenreService.getAllGenre();
      console.log("Data fetched all genre:", res);
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
        const artistsRes = await fetchArtistAll();
        setArtists(artistsRes.data);
        const genresRes = await fetchGenreAll();
        setGenres(genresRes.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
    console.log("Data:", Data);
  }, []);

  
  const handleOnChangeImage = async (e) => {

    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setStateTrack({
          ...stateTrack,
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
        setStateTrackDetails({
          ...stateTrackDetails,
          image: e.target.result
        });
      };
        
    }
  };

  const handleOnChangeLink = async (e) => {
    
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      const fileDataUrl = e.target.result;
      alert(fileDataUrl)
      reader.onload = (e) => {
        setStateTrack({
          ...stateTrack,
          link: fileDataUrl
        });
      };
      reader.readAsDataURL(file);
        
    }
  };

  const handleOnChangeLinkEdit = async (e) => {

    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setStateTrackDetails({
          ...stateTrackDetails,
          link: e.target.result
        });
      };
      reader.readAsDataURL(file);
        
    }
  };
  

  return (
    <div className={cx("container")}>
      <div className={cx("flex-row")}>
      <h1>Quản lí Track</h1>
      <div
          className={cx("add")}
          onClick={() => {
            setIsModalOpenAddTrack(true);
          }}
        >

          <IonIcon icon={addOutline}
              className={cx("AiIcons")}
              color="blue"
            
            ></IonIcon>
        </div>
        <div>
        {selectedRowKeys.length > 0 ? (
          <button className={cx("delete-button")} onClick={handleDeleteManyTracks} >
            Xóa các bài hát đã chọn
          </button>) : (<></>)}
        </div>
      </div>
      <div class={cx("content")}>
        <Table columns={columns} 
        dataSource={Data} />
      </div>

      
      <Modal
        title="Add new Track"
        open={isModalOpenAddTrack}
        onOk={handleOkAddTrack}
        onCancel={handleCancelAddTrack}
        footer={[
          <div className={cx("wrapper-button")}>
            <div
              className={cx("modal-button-cancel")}
              onClick={handleCancelAddTrack}
            >
              Cancel
            </div>

            <div
              className={cx("modal-button-submit")}
              onClick={handleOkAddTrack}
            >
              Submit
            </div>
          </div>,
        ]}
      >
        <div>
          <div className={cx("modal-input")}>
            <p>Title:</p>
            <input
              type="text"
              value={stateTrack.title}
              onChange={handleOnChange}
              name="title"
            />
          </div>
          <div className={cx("modal-input")}>
            <p>Link:</p>
            <input
              type="text"
              value={stateTrack.link}
              onChange={handleOnChange}
              name="link"
            />
          </div>
          <div className={cx("modal-input")}>
            <p>Image:</p>
            <input
                  type="text"
                  value={stateTrack.image}
                  onChange={handleOnChange}
                  name="image"
                />
          </div>
          <div className={cx("modal-input")}>
            <div className={cx(".centered-div")}>
            {stateTrack.image ? 
              (<div>
                 <img
                src={stateTrack.image}
                alt="Uploaded Image"
                style={{ maxWidth: "100px" }}
              />
              </div>
             
              ) : (
               <></>
              )}
              
              <button className={cx("file-input-label")} onClick={() => {
                  document.getElementById("selectImage").click();
                }}>
                  Choose File
                  <input id="selectImage"
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
            <p>Artist:</p>
            <select className={cx("selectMultiple")}
                  value={stateTrack.artist}
                  onChange={handleOnChange }
                  name="artist"
                  multiple
                  >
                  {artists.map((item) => (
                    <option key={item?._id} value={item._id}>
                      {item?.name}
                    </option>
                  ))}
                </select>
          </div>
          <div className={cx("modal-input")}>
            <p>Genre:</p>
            <select className={cx("selectMultiple")}
                  value={stateTrack.genre}
                  onChange={handleOnChange}
                  name="genre"
                  multiple
                  >
                  {genres.map((item) => (
                    <option key={item?._id} value={item._id}>
                      {item?.name}
                    </option>
                  ))}
                </select>
          </div>
          <div className={cx("modal-input")}>
            <p>Duration:</p>
            <input
              type="text"
              value={stateTrack.duration}
              onChange={handleOnChange}
              name="duration"
            />
          </div>
          
        </div>
      </Modal>

      <Modal
        title="Edit Track"
        open={isModalOpenEditTrack}
        onOk={handleUpdateTrack}
        onCancel={() => setIsModalOpenEditTrack(false)}
        footer={[
          <div className={cx("wrapper-button")}>
            <div
              className={cx("modal-button-cancel")}
              onClick={() => setIsModalOpenEditTrack(false)}
            >
              Cancel
            </div>

            <div
              className={cx("modal-button-submit")}
              onClick={handleUpdateTrack}
            >
              Submit
            </div>
          </div>,
        ]}
      >
        <div className={cx("modal-input")}>
            <p>Title:</p>
            <input
              type="text"
              value={stateTrackDetails.title}
              onChange={handleOnChangeEdit}
              name="title"
            />
          </div>
          <div className={cx("modal-input")}>
            <p>Link:</p>
            <input
                  type="text"
                  value={stateTrackDetails.link}
                  onChange={handleOnChangeEdit}
                  name="image"
                />
          </div>
          <div className={cx("modal-input")}>
            <p>Image:</p>
            <input
                  type="text"
                  value={stateTrackDetails.image}
                  onChange={handleOnChangeEdit}
                  name="image"
                />
          </div>
          <div className={cx("modal-input")}>
            <div className={cx(".centered-div")}>
            {stateTrackDetails.image ? 
              (<div>
                 <img
                src={stateTrackDetails.image}
                alt="Uploaded Image"
                style={{ maxWidth: "100px" }}
              />
              </div>
             
              ) : (
               <></>
              )}
              
              <button className={cx("file-input-label")} onClick={() => {
                  document.getElementById("selectImageEdit").click();
                }}>
                  Choose File
                  <input id="selectImageEdit"
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
            <p>Artist:</p>
            <select className={cx("selectMultiple")}
                  value={stateTrackDetails.artist}
                  onChange={handleOnChangeEdit}
                  name="artist"
                  multiple
                  >
                  {artists.map((item) => (
                    <option key={item?._id} value={item._id.toString}>
                      {item?.name}
                    </option>
                  ))}
                </select>
          </div>
          <div className={cx("modal-input")}>
            <p>Genre:</p>
            <select className={cx("selectMultiple")}
                  value={stateTrackDetails.genre}
                  onChange={handleOnChangeEdit}
                  name="genre"
                  multiple
                  >
                  {genres.map((item) => (
                    <option key={item?._id} value={item._id}>
                      {item?.name}
                    </option>
                  ))}
                </select>
          </div>
          <div className={cx("modal-input")}>
            <p>Duration:</p>
            <input
              type="text"
              value={stateTrackDetails.duration}
              onChange={handleOnChange}
              name="duration"
            />
          </div>
      </Modal>
    </div>

    
  );
};

export default Track;
