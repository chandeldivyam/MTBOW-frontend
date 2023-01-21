import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import _ from "lodash"
import { useGlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import Loading from "../../pages/Main/Loading";
import VideoStats from "./VideoStats";

const VideoTeamOther = () => {
    let navigate = useNavigate();
    const { authenticateUser, balance } = useGlobalContext();
    const { videoContestId, userId } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [videoInfo, setVideoInfo] = useState([]);
    const [myteam, setMyTeam] = useState([]);
    const [eventStarted, setEventStarted] = useState(true)
    const [teamExist, setTeamExist] = useState(true)
    const [teamScore, setTeamScore] = useState({});
    const [scoreDistribution, setScoreDistribution] = useState({})

    const getTeamDetails = async() => {
        const team_details = await axios({
            method: "get",
            url: `https://api.mtbow.com/api/v1/videoteams/scoreOthers/${videoContestId}/${userId}`,
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        })
        return team_details
    }

    const getAllVideos = async() => {
        const getVideos = await axios({
            method: "get",
            url: `https://api.mtbow.com/api/v1/videocontests/contestInfo/${videoContestId}`,
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
        if (Date.now() <= Date.parse(getVideos.data.contest_details[0].event_start_time)) {
            setEventStarted(false);
            return
        }
        setVideoInfo([...videoInfo, ...getVideos.data.contest_details]);
        const team_details = await getTeamDetails()
        if(team_details.data.team_score_object.length < 11){
            setTeamExist(false)
            return
        }
        setTeamScore({...teamScore, ...team_details.data["team_score_object"]})
        setScoreDistribution({
            ...scoreDistribution,
            ...team_details.data["score_distribution"]
        })
        setIsLoading(false)
    }

    useEffect(() => {
        getAllVideos();
    }, []);

    if(isLoading){
        return <Loading />
    }

    if(eventStarted === false){
        return <h1 className="mobile:w-[512px] w-screen">Event not started yet!</h1>
    }

    if(teamExist === false){
        return <h1 className="mobile:w-[512px] w-screen">Team does not exist</h1>
    }

    return(<div className="mobile:w-[512px] w-screen">
            <h1 className="m-2.5 font-semibold py-2 px-4 rounded bg-[#dc5714] text-white text-center">
                Total Points: {_.sum(_.values(teamScore))}
            </h1>
        <div className={"grid grid-cols-1 gap-y-4 pb-8"}>
            {_.keys(teamScore).map((item) => {
                const player_info = videoInfo.filter((info) => info.video_id === item)
                const {video_thumbnail, video_title, video_id, extra_details} = player_info[0]
                return(<VideoStats 
                    key={video_id}
                    video_id={video_id} 
                    video_title={video_title} 
                    video_thumbnail={video_thumbnail}
                    like_points={extra_details["like_points"]}
                    view_points={extra_details["view_points"]}
                    comment_points={extra_details["comment_points"]}/>)
            })}
        </div>
    </div>)
}

export default VideoTeamOther