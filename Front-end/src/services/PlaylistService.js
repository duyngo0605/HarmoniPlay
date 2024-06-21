import axios from "axios";

export const getAllPlaylist = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_KEY}/playlist/get-all`
  );
  return res.data;
};
