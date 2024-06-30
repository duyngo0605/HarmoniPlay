import axios from "axios";

const axiosJWT = axios.create()

export const getAllArtist = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_KEY}/artist/get-all`
  );
  return res.data;
};



export const createArtist = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_KEY}/artist/create`,
    data,
    {
      headers: {
        token: `${access_token}`,
      },
    }
  );
  return res.data;
};

export const updateArtist = async (id, access_token, data) => {
  if (data.isFollowed || data.isUnFollowed)
  {
    const res = await axiosJWT.post(
      `${process.env.REACT_APP_API_KEY}/artist/update-follower/${id}`,
      data
    );
    return res.data;
  }
  else {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_KEY}/artist/update/${id}`,
    data,
    {
      headers: {
        token: `${access_token}`,
      },
    }
  );
  return res.data;}
};

export const getDetailsArtist = async (id) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_KEY}/artist/get-details/${id}`,
  );
  return res.data;
};

export const deleteArtist = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_KEY}/artist/delete/${id}`,
    {
      headers: {
        token: access_token,
      },
    }
  );
  return res.data;
};


export const deleteManyArtists = async (ids, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_KEY}/artist/delete-many`,
    ids,
    {
      headers: {
        token: access_token,
      },
    }
  );
  return res.data;
};