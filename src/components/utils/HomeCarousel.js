import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import creator_banner from "../../Static/home/creator_banner.png"
import refer_banner from "../../Static/home/banner_refer.png"
import { Carousel } from 'antd';

const HomeCarousel = ({videoContestId}) => {
    let navigate = useNavigate();
    return(
        <Carousel autoplay={true} dots={true}>
            <div 
                className="grid grid-cols-1 justify-items-center" 
                onClick={() => {
                    if(videoContestId) navigate(`videoContestInfo/${videoContestId}`)
                }}
            >
                <img src={creator_banner} className="max-h-[350px]"/>
            </div>
            <div 
                className="grid grid-cols-1 justify-items-center"
                onClick={() => navigate('/refer')}
            >
                <img src={refer_banner} className="max-h-[350px]"/>
            </div>
        </Carousel>
    )
}

export default HomeCarousel