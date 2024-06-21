import axios from "axios";

export const axiosJWT = axios.create();

export const getAllGenre = async () => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_KEY}/genre/get-all`
  );
  return res.data;
};
