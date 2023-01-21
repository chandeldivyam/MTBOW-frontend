import React, { useState, useEffect } from "react";
import axios from "axios";
import Leaderboard from "./Leaderboard";
import Loading from "../../pages/Main/Loading";
import VideoStats from "./VideoStats";
import { Avatar } from "antd"

const OtherTeamResult = ({videoInfo, contestId}) => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [showStats, setShowStats] = useState(false);

    const getLeaderboard = async () => {
        const leaderboard_data = await axios({
            method: "get",
            url: `http://localhost:3005/api/v1/videoteams/score/${contestId}`,
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        }).then((leaderboard_data) => {
            setLeaderboard(leaderboard_data.data["leaderboard"]);
            setIsLoading(false)
        }).catch((err) => console.log(err))
    }

    useEffect(() => {
        getLeaderboard();
    }, []);

    if (isLoading || videoInfo.length === 0) {
        return <Loading />;
    }
    return(
        <div className="mobile:w-[512px] w-screen">
            <div className="flex items-center justify-center">
                <Avatar size={60} src={videoInfo[0].image_url} className="mr-2"/>
                <h1 className="ml-2 text-lg">{videoInfo[0].name}</h1>
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
                    All Videos
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
            <div className={showStats ? "grid grid-cols-1 gap-y-4" : "hidden"}>
                {videoInfo.map((item) => {
                    const {video_thumbnail, video_title, video_id, extra_details} = item
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
                <Leaderboard contest_id={contestId} leaderboard={leaderboard}/>
            </div>
        </div>
    )
}

export default OtherTeamResult