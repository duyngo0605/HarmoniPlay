import axios from "axios";

export const getAllArtist = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_KEY}/artist/get-all-artist`
  );
  return res.data;
};
