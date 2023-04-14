import React from "react";
import { SingleVideoEventResult } from "./SingleVideoEventResult";

export const AllExpiredVideoContest = ({ expiredVideoContests, isLive }) => {
    if(isLive){
        return(
            <div className="grid grid-cols-1 justify-center justify-items-center gap-2">
                {expiredVideoContests.map((contest) => {
                    return <SingleVideoEventResult key={contest.id} {...contest} isLive={true}/>;
                })}
            </div>
        )
    }
    return (
        <div className="grid grid-cols-1 justify-center justify-items-center gap-2">
            {expiredVideoContests.map((contest) => {
                return <SingleVideoEventResult key={contest.id} {...contest} />;
            })}
        </div>
    );
};
