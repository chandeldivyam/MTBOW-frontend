import React from "react";
import { SingleEventResult } from "./SingleEventResult";

export const AllExpiredContest = ({ expiredContests }) => {
    return (
        <div className="grid grid-cols-1 justify-center justify-items-center gap-4 m-4">
            {expiredContests.map((contest) => {
                return <SingleEventResult key={contest.id} {...contest} />;
            })}
        </div>
    );
};
