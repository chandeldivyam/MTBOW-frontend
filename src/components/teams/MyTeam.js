import React, { useState, useEffect } from "react";
import PlayerStat from "./PlayerStat";
import axios from "axios";
import Leaderboard from "./Leaderboard";
import _ from "lodash";

const MyTeam = ({ myTeam, creatorsInfo, contestId }) => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [teamScore, setTeamScore] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [userRank, setUserRank] = useState("");

    const getLeaderboard = async () => {
        try {
            const leaderboard_data = await axios({
                method: "get",
                url: `http://localhost:3005/api/v1/teams/score/${contestId}`,
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
        return <h1>Loading...</h1>;
    }
    console.log();
    return (
        <div className="flex justify-center bg-gray-200 min-h-screen">
            <div className="flex flex-col max-w-lg bg-white pb-3">
                <div className="flex justify-center">
                    <div className="grid grid-cols-2 max-w-lg">
                        <div>
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
                        <div>
                            <div className="flex justify-center flex-col">
                                <h1 className="m-2.5 bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded">
                                    Total Points: {_.sum(_.values(teamScore))}
                                </h1>
                                <h1 className="m-2.5 bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded">
                                    Rank: {userRank}
                                </h1>
                            </div>
                            <div className="mt-10">
                                <h1 className="text-center font-medium leading-tight text-xl mt-0 mb-2 mr-2 text-blue-600">
                                    LEADERBOARD
                                </h1>
                                {leaderboard.map((item) => {
                                    return (
                                        <Leaderboard
                                            key={item.user_id}
                                            {...item}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyTeam;
