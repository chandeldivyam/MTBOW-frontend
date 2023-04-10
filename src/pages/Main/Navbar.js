import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import mtbow_logo from "../../Static/mtbow-logo.png";
import Sidebar from "../../components/navbar/Sidebar";
import { useGlobalContext } from "../../context";
import { AiOutlineWallet } from "react-icons/ai";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { balance } = useGlobalContext();
    if (location.pathname === "/login" || location.pathname === "/signup") {
        return null;
    }
    if (!isSidebarOpen) {
        return (
            <div className="grid grid-cols-5 min-h-[10%] items-center border-b-2 shadow-[0_0_5px_0_rgba(0,0,0,0.1)] sticky top-0 bg-white z-40">
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <img
                    src={mtbow_logo}
                    className={
                        isSidebarOpen ? "hidden" : `max-w-[100%] col-span-2`
                    }
                    alt="mtbow logo"
                    onClick={() => {
                        navigate("/");
                    }}
                />
                <div
                    className={
                        isSidebarOpen
                            ? "hidden"
                            : "flex justify-center items-center col-span-2"
                    }
                >
                    <button
                        onClick={() => {
                            navigate("/payments");
                        }}
                        className="rounded-lg border border-gray-200 flex justify-center items-center m-2 min-w-[50%] max-h-[50%]"
                    >
                        <AiOutlineWallet />
                        <span className="align-middle ml-2">
                            ₹
                            {balance.topup +
                                balance.promotional +
                                balance.winnings}
                        </span>
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
        );
    }
};

export default Navbar;
