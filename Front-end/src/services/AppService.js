import axios from "axios";

const axiosJWT = axios.create()

export const UploadFile = (data) => {
    const res = axiosJWT.post(
        `${process.env.REACT_APP_API_KEY}/upload`,
        data
    );
    return res.data;
}