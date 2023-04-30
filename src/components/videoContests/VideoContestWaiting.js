import React, { useEffect, useState, useRef } from "react";
import { Statistic } from "antd";
import { FaWhatsapp } from "react-icons/fa";
import { Card, Tooltip, Modal } from "antd";
import { EyeOutlined, LikeOutlined, CommentOutlined } from "@ant-design/icons";


const formatNumber = (num) => {
    if (num >= 10000000) {
      return (num / 10000000).toFixed(1) + "Cr";
    } else if (num >= 100000) {
      return (num / 100000).toFixed(1) + "L";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num;
  };
  
const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + "...";
    }
    return str;
  };
  
const timeDifference = (dateString) => {
    const currentDate = new Date();
    const inputDate = new Date(dateString);
    const diffInSeconds = Math.floor((currentDate - inputDate) / 1000);
  
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    }
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    }
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      return `${diffInWeeks} weeks ago`;
    }
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} months ago`;
    }
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} years ago`;
  };

const VideoCard = ({video_id, channel_title, video_title, video_thumbnail, channel_thumbnail, video_published_at, video_views, video_likes, video_comments}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const iframeRef = useRef(null);
  
    const showModal = () => {
      setModalVisible(true);
    };
    
    const handleCancel = () => {
      const iframe = iframeRef.current;
      if (iframe) {
        const src = iframe.src;
        iframe.src = '';
        iframe.src = src;
      }
      setModalVisible(false);
    };
    
    return (
      <>
        
        <Card className="rounded-xl my-1"
              bodyStyle={{ padding: '5px 24px' }} style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0px 15px'}}>
    <div className="flex items-center">
      <img src={video_thumbnail} alt="thumbnail" className="w-16 h-12 mr-2 cursor-pointer" onClick={showModal} />
      <div>
        <Tooltip title={video_title}>
          <h3 className="font-semibold text-sm line-clamp-1">{truncateString(video_title, 40)}</h3>
        </Tooltip>
        <div className="flex items-center">
          <img className="w-5 h-5 rounded-full mr-1" src={channel_thumbnail} alt="channel" />
          <p className="text-gray-600 text-xs">
            {channel_title}
            <br />
            {timeDifference(video_published_at)}
          </p>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-between text-xs mt-1">
      <div className="flex flex-col items-center">
        <EyeOutlined className="text-xs" />
        {formatNumber(video_views)}
      </div>
      <div className="flex flex-col items-center">
        <LikeOutlined className="text-xs" />
        {formatNumber(video_likes)}
      </div>
      <div className="flex flex-col items-center">
        <CommentOutlined className="text-xs" />
        {formatNumber(video_comments)}
      </div>
    </div>
  </Card>
  
      <Modal
        visible={modalVisible}
        onCancel={handleCancel}
        centered
        footer={null}
        width="90%"
      >
        <div style={{ position: 'relative', paddingBottom: '56.26%', height: 0, overflow: 'hidden' }}>
          <iframe
            ref={iframeRef}
            title="video"
            src={`https://www.youtube.com/embed/${video_id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          ></iframe>
        </div>
      </Modal>
      </>
    );
  }

export const VideoContestWaiting = ({ myTeam, videoInfo }) => {
  const { Countdown } = Statistic;

  const handleCountdownFinish = () => {
    window.location.reload();
  };

  return (
    <div className="flex justify-center min-h-screen mobile:w-[512px] w-screen">
      <div className="flex flex-col max-w-lg bg-white pb-3 justify-center justify-items-center">
        <div>
            <div className="mt-4 text-center">
            <a
                href="https://chat.whatsapp.com/Egqmis94D5EJ4dNYeaGovE"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-green-600 hover:text-green-800"
            >
                <FaWhatsapp size={24} className="mr-2" />
                Join our Whatsapp group to win more!
            </a>
            </div>
          <div className="grid grid-cols-1 justify-items-center">
            <Countdown
              className="mt-3 col-span-1"
              onFinish={handleCountdownFinish}
              title="Starting in:"
              value={new Date(videoInfo[0].event_start_time)}
            />
            {myTeam.map((item) => {
              const player_info = videoInfo.filter(
                (info) => info.video_id === item
              );
              const {video_id, channel_title, video_title, video_thumbnail, channel_thumbnail, video_published_at, video_views, video_likes, video_comments} = player_info[0];
              return (
                <VideoCard
                  key={video_id}
                  video_id={video_id}
                  channel_title={channel_title}
                  video_title={video_title}
                  video_thumbnail={video_thumbnail}
                  channel_thumbnail={channel_thumbnail}
                  video_published_at={video_published_at}
                  video_views={video_views}
                  video_likes={video_likes}
                  video_comments={video_comments}
                />
              );
              return (
                <div className="max-w-sm flex flex-col justify-center border m-2.5 p-2.5">
                  <div className="flex justify-center">
                    <div className="w-6/12 sm:w-4/12 px-4">
                      <img
                        className="w-[100%] h-auto align-middle border-none mb-2"
                        src={video_thumbnail}
                        alt={video_title}
                      />
                    </div>
                  </div>
                  <h2 className="text-center text-xs">{video_title}</h2>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
