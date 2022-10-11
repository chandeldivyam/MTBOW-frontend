import React from "react";

const PlayerStat = ({ browser_id, channel_image, channel_name, points }) => {
    // const player_score = teamScore.filter(
    //     (score_info) => score_info.browser_id === browser_id
    // );
    // console.log(player_score[0]);
    return (
        <div className="max-w-sm flex flex-col justify-center border m-2.5 p-2.5">
            <div className="flex justify-center">
                <div className="w-6/12 sm:w-4/12 px-4">
                    <img
                        className="shadow rounded-full max-w-full h-auto align-middle border-none"
                        src={channel_image}
                        alt={channel_name}
                    />
                </div>
            </div>
            <h2 className="text-center">{channel_name}</h2>
            <div className="bg-transparent text-[#dc5714] font-semibold py-2 px-4 border border-[#dc5714] rounded text-center">
                Points: {points}
            </div>
        </div>
    );
};

export default PlayerStat;
