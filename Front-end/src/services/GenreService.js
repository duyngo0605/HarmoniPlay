import axios from "axios";

export const axiosJWT = axios.create();

export const getAllGenre = async () => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_KEY}/genre/get-all`
  );
  return res.data;
};

export const createGenre = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_KEY}/genre/create`,
    data,
    {
      headers: {
        token: `${access_token}`,
      },
    }
  );
  return res.data;
};

export const updateGenre = async (id, access_token, data) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_KEY}/genre/update/${id}`,
    data,
    {
      headers: {
        token: `${access_token}`,
      },
    }
  );
  return res.data;
};

export const getDetailsGenre = async (id) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_KEY}/genre/get-details/${id}`,
  );
  return res.data;
};

export const deleteGenre = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_KEY}/genre/delete/${id}`,
    {
      headers: {
        token: access_token,
      },
    }
  );
  return res.data;
};

export const deleteManyGenres = async (ids, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_KEY}/genre/delete-many`,
    ids,
    {
      headers: {
        token: access_token,
      },
    }
  );
  return res.data;
};