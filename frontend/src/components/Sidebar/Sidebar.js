import React, { useState, useEffect } from 'react'
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "@mui/material";
// import { AuthContext } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

import './Sidebar.css'
import { Link } from 'react-router-dom';

const Sidebar = () => {
  // const { username } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username); // assuming the username is stored in the token
        // console.log(username);
        // console.log(decodedToken);
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
      }
    }
  }, []);

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
        <Link to={`/profile/${username}/`} className="sidenav__button col">
          <Avatar className="sidenav__buttonAvatar">
            {username ? username.charAt(0).toUpperCase() : "A"}
          </Avatar>
          <span>
            Profile{" "}
          </span>
        </Link>
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