import React, { useEffect, useState } from "react";
import { Avatar, Card, Tabs } from "antd";
import { BiLinkExternal } from "react-icons/bi";

const VideoCard = ({video_id, channel_title, video_title, video_thumbnail, channel_thumbnail, addToTeam, removeFromTeam, myTeam}) => {
    return(
      <>
        <Tabs 
          defaultActiveKey="video"
          tabPosition="left"
          className={myTeam.includes(video_id) ? "shadow-xl mx-8 my-3 scale-110 rounded-xl shadow-current" : "mx-6 bg-gray-200 rounded-xl shadow-md scale-80"}
          tabBarExtraContent={<BiLinkExternal className="mb-2" size={26} onClick={() => {window.open(`https://www.youtube.com/watch?v=${video_id}`, '_blank');}} />}
        >
          <Tabs.TabPane tab="Video" key="video">
                <img className="self-center w-max-[75%]" src={video_thumbnail} alt={video_title} />
                <div className="self-center text-slate-600 text-xs smobile:text-sm mobile:text-base mt-2">{video_title}</div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Watch" key="watch">
            <iframe 
              className="w-[100%]"
              src={`https://www.youtube.com/embed/${video_id}`} 
              frameBorder="0" 
              allow="fullscreen" >
             </iframe>
          </Tabs.TabPane>
        </Tabs>
      </>
    )
}
export default VideoCard