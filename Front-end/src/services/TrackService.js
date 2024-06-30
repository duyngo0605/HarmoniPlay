import axios from "axios";

export const axiosJWT = axios.create();

export const getAllTrack = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_KEY}/track/get-all`
  );
  return res.data;
};


export const getDetailsTrack = async (id) => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_KEY}/track/get-details/${id}`
    );
    return res.data;
  };

  
export const createTrack = async (data, access_token) => {
  console.log('data', data);
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_KEY}/track/create`,
    data,
    {
      headers: {
        token: access_token,
      },
    }
  );
  return res.data;
};

export const updateTrack = async (id, access_token, data) => {
  if (data.play || data.like || data.unlike) {
    const res = await axiosJWT.post(
      `${process.env.REACT_APP_API_KEY}/track/update-plays-likes/${id}`,
      data
    );
    return res.data;
  }
  else {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_KEY}/track/update/${id}`,
    data,
    {
      headers: {
        token: `${access_token}`,
      },
    }
  );
  return res.data;}
};

export const deleteTrack = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_KEY}/track/delete/${id}`,
    {
      headers: {
        token: access_token,
      },
    }
  );
  return res.data;
};

export const recommendTracks = async (id) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_KEY}/track/recommend/${id}`,
  );
  return res.data;
}