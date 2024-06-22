import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_KEY}/user/sign-in`,
    data
  );
  alert('data', data)
  return res.data;
};

export const registerUser = async (data) => {
    const res = await axiosJWT.post(
      `${process.env.REACT_APP_API_KEY}/user/sign-up`,
      data
    );
    return res.data;
  };

  
export const getDetailsUser = async (id, access_token) => {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_KEY}/user/get-details/${id}`,
      {
        headers: {
          token: `${access_token}`,
        },
      }
    );
    return res.data;
  };

  export const deleteUser = async (id, access_token, data) => {
    const res = await axiosJWT.delete(
      `${process.env.REACT_APP_API_KEY}/user/delete-user/${id}`,
      data,
      {
        headers: {
          token: `${access_token}`,
        },
      }
    );
    return res.data;
  };
  
  export const getAllUser = async (access_token) => {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_KEY}/user/get-all`,
      {
        headers: {
          token: access_token,
        },
      }
    );
    return res.data;
  };

  
export const refreshToken = async () => {
    console.log("refreshToken", refreshToken);
    const res = await axios.post(
      `${process.env.REACT_APP_API_KEY}/user/refresh-token`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  };
  
  export const logoutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/log-out`);
    return res.data;
  };
  
  export const updateUser = async (id, data, access_token) => {
    const res = await axiosJWT.put(
      `${process.env.REACT_APP_API_KEY}/user/update-user/${id}`,
      data,
      {
        headers: {
          token: `${access_token}`,
        },
      }
    );
    alert("Update succesfully!");
    return res.data;
  };