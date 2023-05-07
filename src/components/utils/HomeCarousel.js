import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import creator_banner from "../../Static/home/creator_banner.png"
import refer_banner from "../../Static/home/banner_refer.png"
import download_banner from "../../Static/home/banner_download.png"
import { Carousel } from 'antd';
import { useGlobalContext } from "../../context"; 

const HomeCarousel = ({videoContestId}) => {
    let navigate = useNavigate();
    const {deferredInstallEvent} = useGlobalContext()
    const installPrompt = async () => {
        deferredInstallEvent.prompt()
        const { outcome } = await deferredInstallEvent.userChoice;
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt.');
        } else if (outcome === 'dismissed') {
            console.log('User dismissed the install prompt');
        }
    }
    return(
        <Carousel autoplay={true} dots={false}>
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
            <div 
                    className="grid grid-cols-1 justify-items-center"
                    onClick={installPrompt}
                >
                    <img src={download_banner} className="max-h-[350px]"/>
            </div>
        </Carousel>
    )
}

export default HomeCarousel