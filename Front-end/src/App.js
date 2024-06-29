import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes/index";
import Navbar from "./pages/Navbar/Navbar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function App() {
  return (
    <div>
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
