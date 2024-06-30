import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "../Popper";
import "tippy.js/dist/tippy.css";
//import AccountItem from "../AccountItem";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import useDebounce from "../../hooks/useDebounce"

import * as TrackService from "../../services/TrackService"
import * as ArtistService from "../../services/ArtistService"


import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [filter, setFilter] = useState("track");

  const debounced = useDebounce(searchValue, 500);

  const inputRef = useRef();

  // Fetch all tracks
  const fetchTrackAll = async () => {
    try {
      const res = await TrackService.getAllTrack();
      const allTracks = res.data;
      console.log('allTracks', allTracks);
      return allTracks; 

    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Rethrow the error
    }
  };

    // Fetch all artists
    const fetchArtistAll = async () => {
      try {
        const res = await ArtistService.getAllArtist();
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Rethrow the error
      }
    };

  // Function to search products based on the input value
  const search = (results, value) => {
    if (!value.trim()) {
      return []; // If input is empty, return an empty array
    }
    console.log("results", results)
    if (filter === "track")
    {  return results.filter((result) =>
        result?.title.toLowerCase().includes(value.toLowerCase()));}
    else if (filter === "artist")
    {   return results.filter((result) =>
      result?.name.toLowerCase().includes(value.toLowerCase()))}

  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
    setShowResult(!!inputValue); // Show results only if there's input
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (filter === "track"){
          const allTracks= await fetchTrackAll();
          setSearchResult(search(allTracks, searchValue));
        }
        else if (filter === "artist")
        {
          const allArtists= await fetchArtistAll();
          setSearchResult(search(allArtists, searchValue));
        }

      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [searchValue, filter]);

  // Clear search input and results
  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };
  const navigate = useNavigate();
  const handleDetailTrack = (id) => {
    navigate(`/track/${id}`);
    handleClear();
    setShowResult(false);
  };
  const handleDetailArtist= (id) => {
    navigate(`/artist/${id}`);
    handleClear();
    setShowResult(false);
  };
  return (
    <Tippy
      interactive
      visible={showResult && searchResult.length > 0}
      render={(attrs) => (
        <div className={cx("search-result")} tabIndex="-1" {...attrs}>
          <PopperWrapper>
            <h4 className={cx("search-title")}>Results</h4>
            {searchResult.map((result) => (
              <div
                className={cx("wrapper")}
                onClick={() => 
                  { 
                    if (filter === "track")
                      handleDetailTrack(result._id)
                    else if (filter === "artist")
                      handleDetailArtist(result._id)
                  }}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} key={result._id} />
                <div className={cx("info")}>
                  <h4 className={cx("name")}>
                    <span>{filter === "track" ? result.title : result.name}</span>
                  </h4>
                </div>
              </div>
            ))}
          </PopperWrapper>
        </div>
      )}
      onClickOutside={handleHideResult}
    >
      <div className={cx("search")}>
        <input
          ref={inputRef}
          value={searchValue}
          placeholder="Tìm kiếm"
          spellCheck={false}
          onChange={handleInputChange}
          onFocus={() => setShowResult(true)}
        />
        {!!searchValue && (
          <button className={cx("clear")} onClick={handleClear}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}

        <select onChange={handleFilterChange} value={filter} className={cx("filter-dropdown")}>
          <option value="track">Track</option>
          <option value="artist">Artist</option>
        </select>

        <button className={cx("search-btn")}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </Tippy>
  );
}

export default Search;
