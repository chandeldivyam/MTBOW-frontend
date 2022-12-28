import React, { useState, useEffect } from "react";
import { Avatar, Card, Statistic } from "antd";

const VideoStats = ({video_id, video_title, video_thumbnail, like_points, view_points, comment_points}) => {
    const { Meta } = Card;
    const [activeTabKey2, setActiveTabKey2] = useState("name");
    const onTab2Change = (key) => {
        setActiveTabKey2(key);
    };
    const tabListNoTitle = [
        {
          key: "name",
          tab: "Title"
        },
        {
            key: "watch",
            tab: "Watch"
        }
    ];
    const contentListNoTitle = {
        name: (<>
                <div className="mb-3">{video_title}</div>
                <Meta
                title={<div>Total: {comment_points+view_points+like_points}</div>}
                avatar={<Avatar src={video_thumbnail} />}
                description={<div className="">
                <div className="grid grid-cols-3 justify-items-start gap-3">
                <Statistic title="Views" value={view_points} />
                <Statistic title="Likes" value={like_points} />
                <Statistic title="Comments" value={comment_points} />
              </div>
                </div>
              }
                />
            </>
            
          ),
          watch: (<iframe 
            className="w-[100%]"
            src={`https://www.youtube.com/embed/${video_id}`} 
            frameBorder="0" 
            allow="fullscreen" >
        </iframe>)
    };
    return(
        <>
      <Card
        className="border-5 border-slate-600 mx-6"
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        onTabChange={(key) => {
          onTab2Change(key);
        }}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>
    </>
    )
}

export default VideoStats