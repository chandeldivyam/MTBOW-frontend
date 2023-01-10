import React, { useState, useEffect } from "react";
import { Avatar, Card, Statistic, Tabs, Space } from "antd";
import { GrView } from "react-icons/gr";
import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";

const VideoStats = ({video_id, video_title, video_thumbnail, like_points, view_points, comment_points, channel_thumbnail, channel_title}) => {
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
            className="w-[100%] h-[100%]"
            src={`https://www.youtube.com/embed/${video_id}`} 
            frameBorder="0" 
            allow="fullscreen" >
        </iframe>)
    };
    return(
      <Tabs 
          defaultActiveKey="video"
          tabPosition="left"
          className="border-[2px] border-slate-300 mx-4 my-1 py-1"
        >
          <Tabs.TabPane tab="Title" key="title">
            <Meta
            title={<div>Total: {comment_points+view_points+like_points}</div>}
            avatar={<Avatar src={video_thumbnail} />}
            className="mt-2"
            />
            <div className="mt-3">{video_title}</div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Watch" key="watch">
            <iframe 
              className="w-[100%] h-[100%]"
              src={`https://www.youtube.com/embed/${video_id}`} 
              frameBorder="0" 
              allow="fullscreen" >
            </iframe>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Stats" key="stats">
                <Space>
                    <h1 className="text-center">Views:</h1>
                    <div
                            className="text-lg text-[#dc5714] bg-white font-medium rounded-lg my-1 px-2 py-1.5 text-center inline-flex items-center border-[2px] border-gray-400"
                        >
                            {view_points}
                            <GrView className="ml-2" color="gray"/>
                    </div>
                </Space>
                <br />
                <Space>
                    <h1 className="text-center">Likes:</h1>
                    <div
                            className="text-lg text-[#dc5714] bg-white font-medium rounded-lg my-1 px-2 py-1.5 text-center inline-flex items-center border-[2px] border-gray-400"
                        >
                            {like_points}
                            <AiOutlineLike className="ml-2" color="gray"/>
                    </div>
                </Space>
                <br />
                <Space>
                    <h1 className="text-center">Comments:</h1>
                    <div
                            className="text-lg text-[#dc5714] bg-white font-medium rounded-lg my-1 px-2 py-1.5 text-center inline-flex items-center border-[2px] border-gray-400"
                        >
                            {comment_points}
                            <AiOutlineComment className="ml-2" color="gray"/>
                    </div>
                </Space>
          </Tabs.TabPane>
        </Tabs>
    )
}

export default VideoStats