import React, { useState, useEffect } from "react";
import { FaTimes, FaBars, FaHome } from "react-icons/fa";
import { GiPodiumWinner, GiWallet } from "react-icons/gi";
import mtbow_logo from "../../Static/mtbow-logo.svg";
import { MdContactPhone, MdRule, MdLogout } from "react-icons/md";
import { BsFileRuled } from "react-icons/bs";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("userId");
        navigate("/login");
    };
    if (!isSidebarOpen) {
        return (
            <button
                className="ml-2"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                <FaBars />
            </button>
        );
    }
    return (
        <div className="bg-white text-black mobile:w-[512px] w-[100%] h-screen fixed z-40">
            <div className="flex justify-between h-[10%] mx-3">
                <img
                    src={mtbow_logo}
                    className="mobile:max-w-[30%] max-w-[50%]"
                    alt="LOGO MTBOW"
                />
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <FaTimes />
                </button>
            </div>
            <div className="flex flex-col justify-between h-[90%]">
                <div className="flex flex-col">
                    <button
                        onClick={() => {
                            navigate("/");
                            setIsSidebarOpen(false);
                        }}
                        className="bg-grey-light hover:bg-gray-300 text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                        <FaHome />
                        <span className="ml-5">Home</span>
                    </button>
                    <button
                        onClick={() => {
                            navigate("/myResults");
                            setIsSidebarOpen(false);
                        }}
                        className="bg-grey-light hover:bg-gray-300 text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                        <GiPodiumWinner />
                        <span className="ml-5">Results</span>
                    </button>
                    {/* <button className="bg-grey-light hover:bg-gray-300 text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
                        <MdRule />
                        <span className="ml-5">Contest Rules</span>
                    </button>
                    <button className="bg-grey-light hover:bg-gray-300 text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
                        <MdContactPhone />
                        <span className="ml-5">Contact Us</span>
                    </button>
                    <button className="bg-grey-light hover:bg-gray-300 text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
                        <BsFileRuled />
                        <span className="ml-5">Terms and Conditions</span>
                    </button> */}
                    <button
                        onClick={() => {
                            navigate("/payments");
                            setIsSidebarOpen(false);
                        }}
                        className="bg-grey-light hover:bg-gray-300 text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                        <GiWallet />
                        <span className="ml-5">Wallet</span>
                    </button>
                    <button
                        className="bg-grey-light hover:bg-gray-300 text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center mb-7"
                        onClick={logout}
                    >
                        <MdLogout />
                        <span className="ml-5">Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
