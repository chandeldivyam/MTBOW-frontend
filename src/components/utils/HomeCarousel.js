import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Carousel } from 'antd';

const HomeCarousel = () => {
    return(
        <Carousel autoplay={true} dots={true}>
            <div className="grid grid-cols-1 justify-items-center">
                <img src="https://placehold.co/300x150/png" className="max-h-[350px]"/>
            </div>
            <div className="grid grid-cols-1 justify-items-center">
                <img src="https://placehold.co/300x150/png" className="max-h-[350px]"/>
            </div>
            <div className="grid grid-cols-1 justify-items-center">
                <img src="https://placehold.co/300x150/png" className="max-h-[350px]"/>
            </div>
        </Carousel>
    )
}

export default HomeCarousel