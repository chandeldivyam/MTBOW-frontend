import React, { useEffect, useState, useRef } from "react";
import { Avatar, Card, Tabs, Button, Modal, Tooltip } from "antd";
import { BiLinkExternal } from "react-icons/bi";
import { PlayCircleOutlined, LikeOutlined, EyeOutlined, CommentOutlined, ClockCircleOutlined } from '@ant-design/icons';

const formatNumber = (num) => {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(1) + 'Cr';
  } else if (num >= 100000) {
    return (num / 100000).toFixed(1) + 'L';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num;
};

function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...';
  }
  return str;
}

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

const VideoCard = ({video_id, channel_title, video_title, video_thumbnail, channel_thumbnail, addToTeam, removeFromTeam, myTeam, video_published_at, video_views, video_likes, video_comments}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const iframeRef = useRef(null);


  const handleClick = () => {
    if (isAdded) {
      removeFromTeam(video_id);
    } else {
      addToTeam(video_id);
    }
    setIsAdded(!isAdded);
  };

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
      
      <Card className={myTeam.includes(video_id) ? "my-1 rounded-xl bg-[#ffcc99]" : "rounded-xl my-1"}
            bodyStyle={{ padding: '5px 24px' }} style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0px 15px'}}>
  <div className="flex items-center">
    <img src={video_thumbnail} alt="thumbnail" className="w-16 h-12 mr-2 cursor-pointer" onClick={showModal} />
    <div>
      <Tooltip title={video_title}>
        <h3 className="font-semibold text-sm line-clamp-1">{truncateString(video_title, 25)}</h3>
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
    <Button size="small" disabled={ myTeam.length === 11 && !isAdded ? true : false}  onClick={handleClick}>{isAdded ? '-' : '+'}</Button>
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