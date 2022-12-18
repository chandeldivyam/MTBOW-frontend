import React from "react";
import { SingleVideoEventResult } from "./SingleVideoEventResult";

export const AllExpiredVideoContest = ({ expiredVideoContests }) => {
    return (
        <div className="grid grid-cols-1 justify-center justify-items-center gap-4 m-4">
            {expiredVideoContests.map((contest) => {
                return <SingleVideoEventResult key={contest.id} {...contest} />;
            })}
        </div>
    );
};
