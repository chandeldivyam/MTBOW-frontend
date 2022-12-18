import React, { useEffect, useState } from "react";
import { Avatar, Card } from "antd";

const VideoCard = ({video_id, channel_title, video_title, video_thumbnail, channel_thumbnail, addToTeam, removeFromTeam, myTeam}) => {
    const { Meta } = Card;
    const [activeTabKey2, setActiveTabKey2] = useState("video");
    const onTab2Change = (key) => {
        setActiveTabKey2(key);
    };
    const onClickHandler = () => {
        if (!myTeam.includes(video_id)) {
            addToTeam(video_id);
            return;
        }
        removeFromTeam(video_id);
        return;
    };
    const tabListNoTitle = [
        {
          key: "video",
          tab: "Video"
        },
        {
            key: "watch",
            tab: "Watch"
        },
        {
          key: "creator",
          tab: "Creator"
        }
    ];
    const contentListNoTitle = {
        video: (<>
                <Meta
                avatar={<Avatar src={video_thumbnail} />}
                description={video_title}
                />
            </>
            
          ),
          watch: (<iframe 
            className="w-[100%]"
            src={`https://www.youtube.com/embed/${video_id}`} 
            frameBorder="0" 
            allow="fullscreen" >
        </iframe>),
        creator: (
            <Meta
              avatar={<Avatar src={channel_thumbnail} />}
              title={channel_title}
            />
          )
      };
      
    
    return(
        <>
      <Card
        className="border-5 border-slate-600 mx-6"
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        tabBarExtraContent={<button
            className={
                myTeam.includes(video_id)
                    ? `bg-red-600 text-white uppercase text-xs ml-2 px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`
                    : `${
                          myTeam.length < 11
                              ? "bg-green-600"
                              : "bg-gray-500"
                      } text-white uppercase text-xs ml-2 px-4 py-2 rounded shadow outline-none mr-1 mb-1 ease-linear transition-all duration-150`
            }
            type="button"
            onClick={onClickHandler}
            disabled={
                myTeam.length >= 11 && !myTeam.includes(video_id)
                    ? true
                    : ""
            }
        >
            {myTeam.includes(video_id)
                ? "-"
                : "+"}
        </button>}
        onTabChange={(key) => {
          onTab2Change(key);
        }}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>
    </>
    )
}
export default VideoCard