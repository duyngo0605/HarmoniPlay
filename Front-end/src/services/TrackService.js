import axios from "axios";

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
