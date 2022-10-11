import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Leaderboard = ({ user_id, rank, total_points, name }) => {
    return (
        <div className="flex border-2 border-gray-200 m-2.5 p-2 justify-between items-center">
            <div className="flex items-center">
                <FaUserCircle size={28} className="mr-3" />
                <div className="flex flex-col">
                    <h2 className="text-xs text-gray-500">{name}</h2>
                    <h2 className="inline-flex items-center">
                        {total_points}{" "}
                        <h2 className="text-gray-400 text-sm ml-1">POINTS</h2>
                    </h2>
                </div>
            </div>
            <div className="mr-2 text-[#dc5714] text-xl">#{rank}</div>
        </div>
    );
};

export default Leaderboard;
