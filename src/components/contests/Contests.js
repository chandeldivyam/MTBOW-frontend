import React from "react";
import Contest from "./Contest";

const Contests = ({ liveContests }) => {
    return (
        <div className="grid grid-cols-1 justify-center justify-items-center gap-4 m-4">
            {liveContests.map((contest) => {
                return <Contest key={contest.id} {...contest} />;
            })}
        </div>
    );
};

export default Contests;
