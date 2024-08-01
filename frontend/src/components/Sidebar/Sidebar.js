import React, { useContext } from 'react'
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "@mui/material";
import { AuthContext } from '../../context/AuthContext';

import './Sidebar.css'

const Sidebar = () => {
  const { username } = useContext(AuthContext);

  return (
    <div className="sidenav">
      <a href="/">
        <img
          className="sidenav__logo"
          src="https://www.pngkey.com/png/full/828-8286178_mackeys-work-needs-no-elaborate-presentation-or-distracting.png"
          alt="Instagram Logo"
        />
      </a>

      <div className="sidenav__buttons">
        <a href="/" className="sidenav__button">
          <HomeIcon />
          <span>Home</span>
        </a>
        <button className="sidenav__button">
          <SearchIcon />
          <span>Search</span>
        </button>
        <a href="/explore" className="sidenav__button">
          <ExploreIcon />
          <span>Explore</span>
        </a>
        <a href="/reels" className="sidenav__button">
          <SlideshowIcon />
          <span>Reels</span>
        </a>
        <a href="/messages" className="sidenav__button">
          <ChatIcon />
          <span>Messages</span>
        </a>
        <a href="/notifications" className="sidenav__button">
          <FavoriteBorderIcon />
          <span>Notifications</span>
        </a>
        <button className="sidenav__button">
          <AddCircleOutlineIcon />
          <span>Create</span>
        </button>
        <button className="sidenav__button col">
          <Avatar className="sidenav__buttonAvatar">
            {username ? username.charAt(0).toUpperCase() : "A"}
          </Avatar>
          <span>
            Profile{" "}
          </span>
        </button>
      </div>
      <div className="sidenav__more">
        <button className="sidenav__button ham">
          <MenuIcon />
          <span className="sidenav__buttonText">More</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar