import React, { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import { useMutationHook } from "../../hooks/useMutationHook";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";
import { getBase64 } from "../../utils";
import * as UserService from "../../services/UserService";
import { Empty } from "antd";
import Modal from "./Modal";
import Password from "antd/es/input/Password";
import { jwtDecode } from "jwt-decode";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import defaultAvatar from "../assest/default_avatar.png"

const cx = classNames.bind(styles);

const Profile = () => {

    const [showUpdateEmailForm, setShowUpdateEmailForm] = useState(false);
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
  

    const [isEditing,setIsEditing] = useState(false);

    const dispatch = useDispatch();

    const [userDetails, setUserDetails] = useState({
        username: "",
        password: "",
        email: "",
        profile:
        {
          fullname: "",
          avatar: ""
        }
    });

    const handleShowEmailForm = () => {
      setShowUpdateEmailForm(true);
    };

    
    const handleShowPasswordForm = () => {
      setShowChangePasswordForm(true);
    };
    
  const handleOnChange = (event) => {
    const { name, value, type, options } = event.target;

    if (type === 'select-multiple') {
      const selectedValues = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);

      setUserDetails({
        ...userDetails,
        [name]: selectedValues,
      });
    } else {
      setUserDetails({
        ...userDetails,
        [name]: value,
      });
    }
  };

    const token = JSON.parse(localStorage.getItem("access_token"))
    const decoded = jwtDecode(token);



    const [isModalOpen, setIsModalOpen] = useState(false);

    const mutationUpdate = useMutationHook((data) => {
      const { id, token, ...rests } = data;
      const res = UserService.updateUser(id, token, { ...rests });
      return res;
    });

    const {
      data: dataUpdated,
      isLoading: isLoadingUpdated,
      isSuccess: isSuccessUpdated,
      isError: isErrorUpdated,
    } = mutationUpdate;

    useEffect(() => {
      if (isSuccessUpdated && dataUpdated?.status === 'OK') {
        alert("Cập nhật thành công");
        window.location.reload();
      }
      else if (dataUpdated?.status==='ERR') {
        alert(dataUpdated?.message)
      }
    }, [isSuccessUpdated]);

    const handleOnchangeAvatar = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUserDetails({
            ...userDetails,
            profile: {
              fullname: userDetails.profile.fullname,
              avatar: e.target.result
            }
          })
        };
        reader.readAsDataURL(file);
      }
    };

    const handleEdit = () => {
      setIsEditing(true);
    };

    const handleSaveChanges = () => {
    
      handleUpdate();
      setIsEditing(false);
    };


    const handleCancelChanges = () => {
      setIsEditing(false);
      fetchUserDetails();
    };

    
  const handleUpdate = () => {
    
    mutationUpdate.mutate({
      id: decoded?.id,
      token: token,
      ...userDetails
    });
  };

  const handleUpdatePassword = async() => {
    if (confirmNewPassword!=newPassword)
      alert("Xác nhận mật khẩu mới không khớp!");
    else
    {
      mutationUpdate.mutate(
        {
          id: decoded?.id,
          token: token,
          password: newPassword,
        }
      )
      setShowChangePasswordForm(false);
    }
  }

  // Fetch user userDetails data
  const fetchUserDetails = async () => {
    try {
        const decoded = jwtDecode(token);
        if (decoded?.id)
        {
          const res = await UserService.getDetailsUser(decoded?.id, token);
          setUserDetails(res.data);
        }
        

    } catch (error) {
        console.error("Failed to fetch user userDetails", error);
    }
};



    useEffect(() => {
      fetchUserDetails();
    }, []);


    return (
      <main>
        <div>
          <Navbar/>
          <Header/>
          <div className={cx("customer-container")}>
              <div className={cx("contents-container")}>
                <h3>Thông tin cá nhân</h3>
                <div className={cx("avatar-container")}>
                  <img
                    src={userDetails.profile?.avatar ? userDetails.profile?.avatar : defaultAvatar}
                    className={cx("avatar")}
                  />
                </div>
                <table className={cx("personal-info-table")}>
                    <tr>
                      <td>
                        <label>Tên đăng nhập:</label>
                      </td>
                      <td>
                        <input
                        type="text"
                        value={userDetails.username}
                        className={cx("input-text")}
                        readOnly
                        />  
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label>Họ và tên người dùng:</label>
                      </td>
                      <td>
                        <input
                        type="text"
                        name="profile"
                        value={userDetails.profile?.fullname}
                        className={cx("input-text")}
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            profile: {
                              fullname: e.target.value,
                              avatar: userDetails.profile?.avatar
                            }
                          })
                        }}
                        readOnly={!isEditing}
                        />  
                      </td>
                    </tr>
                  </table>
                  <div className={cx("centered-btn")}>
                  {isEditing && (
                    <button className={cx("file-input-label")} onClick={() => {
                      document.getElementById("selectAvatar").click();
                    }}>
                      Chọn ảnh
                      <input id="selectAvatar"
                        type="file"
                        accept="image/*"
                        onChange={handleOnchangeAvatar}
                        className={cx("file-input")}
                        hidden
                      />
                    </button>
                  )}
                  {isEditing ? (
                    <>
                      <button className={cx("save-btn")} onClick={handleSaveChanges}>
                        Lưu thay đổi
                      </button>
                      <button className={cx("cancel-btn")} onClick={handleCancelChanges}>
                        Hủy
                      </button>
                    </>
                  ) : (
                    <button className={cx("edit-btn")} onClick={handleEdit}>
                      Sửa thông tin
                    </button>
                  )}
                </div>
              </div>

              {/* Cột bên phải - Thông tin liên lạc và Bảo mật */}
              <div className={cx("misc-container")}>
                <table className={cx("contact-security-table")}>
                  <tr>
                    <td>
                      Địa chỉ email
                      <br />
                      {userDetails.email ? userDetails.email : "empty"}
                    </td>
                    <td>
                      <button className={cx("update-btn")} onClick={handleShowEmailForm}>Cập nhật</button>
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="2">
                      <h3>Bảo mật</h3>
                    </th>
                  </tr>
                  <tr>                                                                                                                                                                                                        
                    <td>Đổi mật khẩu</td>
                    <td>
                      <button className={cx("update-btn")} onClick={handleShowPasswordForm}>Cập nhật</button>
                    </td>
                  </tr>
                </table>
                <div>


              {/* Form cập nhật email */}
              {showUpdateEmailForm && (
                <Modal title="Cập nhật email" onClose={() => setShowUpdateEmailForm(false)}>
                  <div>
                    <label>Nhập email mới:</label>
                    <input type="text" value={userDetails.email} 
                    onChange={ (e) => {
                      setUserDetails({
                        ...userDetails,
                        email: e.target.value
                      })
                    }}/>
                    <button onClick={() => {setShowUpdateEmailForm(false)
                    handleCancelChanges()}}>Hủy bỏ</button>
                    <button onClick={() => handleUpdate()}>Cập nhật</button>
                  </div>
                </Modal>
              )}

              {/* Form đổi mật khẩu */}
              {showChangePasswordForm && (
                <Modal title="Đổi mật khẩu" onClose={() => setShowChangePasswordForm(false)}>
                  <div>
                    <label>Nhập mật khẩu mới: </label>
                    <input type="password" value={newPassword} onChange={(e) => {
                      setNewPassword(e.target.value)
                      }}/>
                    <label>Xác nhận mật khẩu mới:</label>
                    <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                    <button onClick={() => {setShowChangePasswordForm(false)
                      handleCancelChanges()}}>Hủy bỏ</button>
                    <button onClick={() => handleUpdatePassword()}>Cập nhật</button>
                  </div>
                </Modal>
              )}
            </div>
              </div>
          </div>
        </div>
      </main>

    );
};

export default Profile;
