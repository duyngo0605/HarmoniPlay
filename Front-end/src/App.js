import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes/index";
import Navbar from "./pages/Navbar/Navbar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function App() {
  // useEffect(() => {
  //   fetchApi();
  // }, []);

  const fetchApi = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_KEY}/artist/get-all-artist`
    );
    return res.data;
  };

  const query = useQuery({ queryKey: ["todos"], queryFn: fetchApi });

  console.log(query);

  return (
    <div>
      <Navbar />;
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            return <Route path={route.path} element={<Page />} />;
          })}
        </Routes>
      </Router>
    </div>
  );
}
