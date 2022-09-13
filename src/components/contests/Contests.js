import React from "react";
import Contest from "./Contest";

const Contests = ({ liveContests }) => {
    return (
        <div className="grid grid-cols-2 justify-center justify-items-center">
            {liveContests.map((contest) => {
                return <Contest key={contest.id} {...contest} />;
            })}
        </div>
    );
};

export default Contests;
