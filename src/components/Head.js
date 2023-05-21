import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu} from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import store from "../utils/store";
import { cachedResults } from "../utils/searchSlice";
import '../index.css'
import ButtonList from "./ButtonList";
const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search);

  useEffect(() => {
    //API CALL

    //make an api call after every key press
    //but if the difference between 2 apis calls is <200ms
    //decline the call

    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestion();
      }
    }, 200);
    // eslint-disable-next-line

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [searchQuery]);

  const getSearchSuggestion = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);
    // console.log(json[1])

    //update store dispatch action
    dispatch(
      cachedResults({
        [searchQuery]: json[1],
      })
    );
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className=" grid grid-flow-col p-5 m-2  mt-0 fixed w-[100%] bg-white z-[2]">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 cursor-pointer"
          alt="menu"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJSJSgwiENM8c4PfERDxlWD2uPdxt2N-MpnA&usqp=CAU"
        />
        <a href="/">
          <img
            className="h-8 mx-2"
            alt="youtube-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
          />
        </a>
      </div>
      <div className="col-span-10 px-10">
        <div>
          <input
            className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="border border-gray-400 px-5 py-2 rounded-r-full">
            🔍
          </button>
          {/* <ButtonList/> */}
        </div>
        {showSuggestions && (
          <div className={`fixed bg-white py-2 px-2 w-[31.7rem] shadow-lg rounded-lg border border-gray-100 `}>
            <ul className="">
              {suggestions.map((s) => (
                <li key={s} className="py-2 px-3 shadow-sm hover:bg-gray-100">
                  🔍 {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-1">
        <img
          className="h-8"
          alt="user"
          src="https://cdn-icons-png.flaticon.com/512/552/552721.png"
        />
      </div>
    </div>
  );
};

export default Head;
