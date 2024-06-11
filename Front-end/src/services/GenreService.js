import axios from "axios";

export const getAllGenre = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_KEY}/genre/get-all-genre`
  );
  return res.data;
};
