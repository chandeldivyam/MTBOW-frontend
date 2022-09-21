import React from "react";

const Leaderboard = ({ user_id, rank, total_points }) => {
    return (
        <div className="flex justify-around border-2 m-2.5 flex-col">
            <div className="mt-1 ml-1">Rank: {rank}</div>
            <div className="mt-1 ml-1">Total Points: {total_points}</div>
        </div>
    );
};

export default Leaderboard;
