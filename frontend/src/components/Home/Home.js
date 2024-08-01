import React from "react";
import "./Home.css";
import Sidebar from "../Sidebar/Sidebar.js";
import Timeline from "../Timeline/Timeline";
// import StoryList from "../../components/StoryList/StoryList";

function Home() {
  return (
    <div className="homepage">
      <div className="homepage__navWraper">
        <Sidebar/>
      </div>
      <div className="homepage__timeline">
        
        <Timeline />
      </div>
    </div>
  );
}

export default Home;
