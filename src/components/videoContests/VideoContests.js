import React from "react";
import VideoContest from "./VideoContest";

const VideoContests = ({ liveVideoContests }) => {
    return (
        <div className="grid grid-cols-1 justify-center justify-items-center mx-4">
            {liveVideoContests.map((contest) => {
                return <VideoContest key={contest.id} {...contest} />;
            })}
        </div>
    );
};

export default VideoContests;
