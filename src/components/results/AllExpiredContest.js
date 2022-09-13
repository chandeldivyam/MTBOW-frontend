import React from "react";
import { SingleEventResult } from "./SingleEventResult";

export const AllExpiredContest = ({ expiredContests }) => {
    return (
        <div className="grid grid-cols-2 justify-center justify-items-center">
            {expiredContests.map((contest) => {
                return <SingleEventResult key={contest.id} {...contest} />;
            })}
        </div>
    );
};
