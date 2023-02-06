import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import Loading from "../../pages/Main/Loading";
import Countdown from "../teams/Countdown";
import VideoStats from "./VideoStats";
import Leaderboard from "./Leaderboard";

const MyTeam = ({myTeam, videoInfo, videoContestId, event_end_time}) => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [teamScore, setTeamScore] = useState({});
    const [scoreDistribution, setScoreDistribution] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [userRank, setUserRank] = useState("");
    const [showStats, setShowStats] = useState(true);

    const getLeaderboard = async () => {
        try {
            const leaderboard_data = await axios({
                method: "get",
                url: `http://localhost:3005/api/v1/videoteams/score/${videoContestId}`,
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            }).then((leaderboard_data) => {
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
                setScoreDistribution({
                    ...scoreDistribution,
                    ...leaderboard_data.data["score_distribution"]
                })
            })
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
        }, 15000);
        return () => clearInterval(interval);
    });
    if (isLoading) {
        return <Loading />;
    }

    return(
        <div>
            <div className="col-span-2">
                <Countdown event_end_time={event_end_time} />
            </div>
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
            </div>
            <div className={showStats ? "grid grid-cols-1 gap-y-4" : "hidden"}>
                {myTeam.map((item) => {
                    const player_info = videoInfo.filter((info) => info.video_id === item)
                    const {video_thumbnail, video_title, video_id, extra_details} = player_info[0]
                    return(<VideoStats 
                        video_id={video_id} 
                        video_title={video_title} 
                        video_thumbnail={video_thumbnail}
                        like_points={extra_details["like_points"]}
                        view_points={extra_details["view_points"]}
                        comment_points={extra_details["comment_points"]}/>)
                })}
            </div>
            <div className={showStats ? "hidden" : "mt-4"}>
                <Leaderboard contest_id={videoContestId} leaderboard={leaderboard} />
            </div>
        </div>
    )
}

export default MyTeam;
