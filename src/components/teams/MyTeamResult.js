import React, { useState, useEffect } from "react";
import PlayerStat from "./PlayerStat";
import axios from "axios";
import Leaderboard from "./Leaderboard";
import _ from "lodash";
import { GiPartyPopper } from "react-icons/gi";
import Loading from "../../pages/Main/Loading";

const MyTeam = ({ myTeam, creatorsInfo, contestId, myRewards }) => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [teamScore, setTeamScore] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [userRank, setUserRank] = useState("");
    const [showStats, setShowStats] = useState(true);

    const getLeaderboard = async () => {
        try {
            const leaderboard_data = await axios({
                method: "get",
                url: `https://api.mtbow.com/api/v1/teams/score/${contestId}`,
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            setLeaderboard(leaderboard_data.data["leaderboard"]);
            // const temp_obj = leaderboard_data[data]["team_score_object"]
            setTeamScore({
                ...teamScore,
                ...leaderboard_data.data["team_score_object"],
            });
            setUserRank(
                leaderboard_data.data["leaderboard"].filter(
                    (item) =>
                        parseInt(item.user_id) ===
                        parseInt(localStorage.getItem("user_id"))
                )[0]["rank"]
            );
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getLeaderboard();
        setIsLoading(false);
    }, []);
    if (isLoading) {
        return <Loading />;
    }
    // return (
    //     <div className="flex justify-center bg-gray-200">
    //         <div className="flex flex-col max-w-lg bg-white pb-3 min-h-screen mobile:w-[512px]">
    //             <div className="flex justify-center">
    //                 <div>
    //                     {myTeam.map((item) => {
    //                         const player_info = creatorsInfo.filter(
    //                             (info) => info.browser_id === item
    //                         );
    //                         const points = teamScore[item];
    //                         return (
    //                             <PlayerStat
    //                                 key={item}
    //                                 {...player_info[0]}
    //                                 teamScore={teamScore}
    //                                 points={points}
    //                             />
    //                         );
    //                     })}
    //                 </div>
    //                 <div>
    //                     <div className="flex justify-center flex-col">
    //                         <h1 className="m-2.5 font-semibold py-2 px-4 rounded bg-[#dc5714] text-white">
    //                             Total Points: {_.sum(_.values(teamScore))}
    //                         </h1>
    //                         <h1 className="m-2.5 font-semibold py-2 px-4 rounded bg-[#dc5714] text-white">
    //                             Rank: {userRank}
    //                         </h1>
    //                         <div
    //                             className={
    //                                 parseInt(myRewards) <= 0
    //                                     ? "hidden"
    //                                     : "m-2.5 items-center bg-transparent text-green-700 font-semibold py-2 px-4 border border-green-500 rounded inline-flex"
    //                             }
    //                         >
    //                             <GiPartyPopper className="mr-2" />
    //                             <h2>Winnings: ₹{myRewards}</h2>
    //                         </div>
    //                     </div>
    //                     <div className="mt-10">
    //                         <h1 className="text-center font-medium leading-tight text-xl mt-0 mb-2 mr-2 text-[#dc5714]">
    //                             LEADERBOARD
    //                         </h1>
    //                         {leaderboard.map((item) => {
    //                             return (
    //                                 <Leaderboard key={item.user_id} {...item} />
    //                             );
    //                         })}
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
    return (
        <div>
            <div className="flex my-4">
                <div
                    className={
                        showStats
                            ? "w-1/2 border-b-4 border-[#dc5714] text-[#dc5714] text-center text-lg pb-2"
                            : "w-1/2 border-b-4 border-gray-400 text-gray-400 text-center text-lg pb-2"
                    }
                    onClick={() => setShowStats(true)}
                >
                    Stats
                </div>
                <div
                    className={
                        !showStats
                            ? "w-1/2 border-b-4 border-[#dc5714] text-[#dc5714] text-center text-lg pb-2"
                            : "w-1/2 border-b-4 border-gray-400 text-gray-400 text-center text-lg pb-2"
                    }
                    onClick={() => setShowStats(false)}
                >
                    Leaderboard
                </div>
            </div>
            <div className={showStats ? "flex justify-center" : "hidden"}>
                <h1 className="m-2.5 font-semibold py-2 px-4 rounded bg-[#dc5714] text-white">
                    Total Points: {_.sum(_.values(teamScore))}
                </h1>
                <h1 className="m-2.5 font-semibold py-2 px-4 rounded bg-[#dc5714] text-white">
                    Rank: {userRank}
                </h1>
                <div
                    className={
                        parseInt(myRewards) <= 0
                            ? "hidden"
                            : "m-2.5 items-center bg-transparent text-green-700 font-semibold py-2 px-4 border border-green-500 rounded inline-flex"
                    }
                >
                    <GiPartyPopper className="mr-2" />
                    <h2>Winnings: ₹{myRewards}</h2>
                </div>
            </div>
            <div className={showStats ? "grid grid-cols-2" : "hidden"}>
                {myTeam.map((item) => {
                    const player_info = creatorsInfo.filter(
                        (info) => info.browser_id === item
                    );
                    const points = teamScore[item];
                    return (
                        <PlayerStat
                            key={item}
                            {...player_info[0]}
                            teamScore={teamScore}
                            points={points}
                        />
                    );
                })}
            </div>
            <div className={showStats ? "hidden" : "mt-4"}>
                {leaderboard.map((item) => {
                    return <Leaderboard key={item.user_id} {...item} />;
                })}
            </div>
        </div>
    );
};

export default MyTeam;
