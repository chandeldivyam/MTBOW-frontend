import React from "react";

const Leaderboard = ({ user_id, rank, total_points }) => {
    return (
        <div className="flex justify-around border-2 m-2.5">
            <div className="flex justify-center">
                <div>Rank: {rank}</div>
            </div>
            <div>Total Points: {total_points}</div>
        </div>
    );
};

export default Leaderboard;
