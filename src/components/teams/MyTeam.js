import React, { useState, useEffect } from "react";
import PlayerStat from "./PlayerStat";
import axios from "axios";
import Leaderboard from "./Leaderboard";
import _ from "lodash";
import Loading from "../../pages/Main/Loading";
import Countdown from "./Countdown";

const MyTeam = ({ myTeam, creatorsInfo, contestId, event_end_time }) => {
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
    useEffect(() => {
        const interval = setInterval(() => {
            getLeaderboard();
        }, 30000);
        return () => clearInterval(interval);
    });
    if (isLoading) {
        return <Loading />;
    }
    // return (
    //     <div className="flex justify-center bg-gray-200 min-h-screen">
    //         <div className="flex flex-col max-w-lg bg-white pb-3">
    //             <div className="flex justify-center">
    //                 <div className="grid grid-cols-2 max-w-lg">
    //                     <div className="col-span-2">
    //                         <Countdown event_end_time={event_end_time} />
    //                     </div>
    //                     <div>
    //                         {myTeam.map((item) => {
    //                             const player_info = creatorsInfo.filter(
    //                                 (info) => info.browser_id === item
    //                             );
    //                             const points = teamScore[item];
    //                             return (
    //                                 <PlayerStat
    //                                     key={item}
    //                                     {...player_info[0]}
    //                                     teamScore={teamScore}
    //                                     points={points}
    //                                 />
    //                             );
    //                         })}
    //                     </div>
    //                     <div>
    //                         <div className="flex justify-center flex-col">
    //                             <h1 className="m-2.5 font-semibold py-2 px-4 rounded bg-[#dc5714] text-white">
    //                                 Total Points: {_.sum(_.values(teamScore))}
    //                             </h1>
    //                             <h1 className="m-2.5 font-semibold py-2 px-4 rounded bg-[#dc5714] text-white">
    //                                 Rank: {userRank}
    //                             </h1>
    //                         </div>
    //                         <div className="mt-10">
    //                             <h1 className="text-center font-medium leading-tight text-xl mt-0 mb-2 mr-2 text-[#dc5714]">
    //                                 LEADERBOARD
    //                             </h1>
    //                             {leaderboard.map((item) => {
    //                                 return (
    //                                     <Leaderboard
    //                                         key={item.user_id}
    //                                         {...item}
    //                                     />
    //                                 );
    //                             })}
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );

    return (
        <div>
            <div className="col-span-2">
                <Countdown event_end_time={event_end_time} />
            </div>
            <div class="flex my-4">
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
