import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import mtbow_logo from "../../Static/mtbow-logo.png";
import Sidebar from "../../components/navbar/Sidebar";
import { useGlobalContext } from "../../context";
import { Tabs } from 'antd';
import { AiOutlineHome } from "react-icons/ai";
import { GiDiamondTrophy, GiPodium } from "react-icons/gi";
import { IoPeopleOutline } from "react-icons/io5";
import { BsListStars } from "react-icons/bs";

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const allowed_paths = ['/refer', '/', '/rules', '/myResults']
    if(!allowed_paths.includes(location.pathname)) return

    const tab_items = [
        {
            label: 
                <div className="grid grid-cols-1 gap-[4px] justify-items-center">
                    <AiOutlineHome size={28}/>
                    <h4 className="smobile:text-sm text-[8px]">Home</h4>
                </div>
            ,
            key: 'home'
        },
        {
            label: 
                <div className="grid grid-cols-1 gap-[4px] justify-items-center">
                    <GiDiamondTrophy size={28}/>
                    <h4 className="smobile:text-sm text-[8px]">My Contests</h4>
                </div>
            ,
            key: 'my_contests'
        },
        {
            label: 
                <div className="grid grid-cols-1 gap-[4px] justify-items-center">
                    <BsListStars size={28}/>
                    <h4 className="smobile:text-sm text-[8px]">How to Play</h4>
                </div>
            ,
            key: 'rules'
        },
        {
            label: 
                <div className="grid grid-cols-1 gap-[4px] justify-items-center">
                    <IoPeopleOutline size={28}/>
                    <h4 className="smobile:text-sm text-[8px]">Refer & Earn</h4>
                </div>
            ,
            key: 'refer'
        }
    ]

    const tabChange = (activeKey) => {
        switch(activeKey){
            case 'home':
                navigate('/')
                break
            case 'my_contests':
                navigate('/myResults')
                break
            case 'refer':
                navigate('/refer')
                break
            case 'rules':
                navigate('/rules')
                break
        }
    }

    return(
        <div className="mobile:w-[512px] justify-items-center w-screen items-center fixed bottom-0 z-30 bg-white px-[7px]">
            <Tabs 
                defaultActiveKey="home"
                centered={true}
                items={tab_items}
                tabPosition="bottom"
                onChange={(e) => tabChange(e)}
            />
        </div>
    )
}

export default Footer