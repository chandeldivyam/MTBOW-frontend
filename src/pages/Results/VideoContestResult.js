import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyTeamResult from "../../components/videoTeams/MyTeamResult";
import Loading from "../Main/Loading";

const VideoContestResult = () => {
    let navigate = useNavigate();
    const { authenticateUser } = useGlobalContext();
    const { contestId } = useParams();
    const [videoInfo, setVideoInfo] = useState([])
    const [isExpired, setIsExpired] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [myTeam, setMyTeam] = useState([]);
    const [myRewards, setMyRewards] = useState("");
    const [contestInfo, setContestInfo] = useState({
        event_name: "",
        image_url: "",
        event_start_time: "",
        event_end_time: "",
    });

    const teamData = async () => {
        const team_details = await axios({
            method: "get",
            url: `https://api.mtbow.com/api/v1/videoteams/${contestId}`,
            data: { contest_id: parseInt(contestId) },
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        return team_details;
    };

    const getAllVideos = async () => {
        const getVideos = await axios({
            method: "get",
            url: `https://api.mtbow.com/api/v1/videocontests/contestInfo/${contestId}`,
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
        const { is_expired } = getVideos.data.contest_details[0];
        if (!is_expired) {
            setIsExpired(false);
            setIsLoading(false);
            navigate("/");
            return;
        }
        setIsExpired(true);
        const team_details = await teamData();
        if (team_details.data.rowCount <= 0) {
            navigate("/");
        }
        if (team_details.data.rowCount > 0) {
            setMyTeam(team_details.data.rows[0].video_team);
            setMyRewards(team_details.data.rows[0].reward);
        }
        const { name, image_url, event_end_time, event_start_time } = getVideos.data.contest_details[0];
        setContestInfo({
            ...contestInfo,
            event_name: name,
            image_url: image_url,
            event_start_time: event_start_time,
            event_end_time: event_end_time,
        });
        setVideoInfo(getVideos.data.contest_details);
        setIsLoading(false);
    }
    useEffect(() => {
        authenticateUser()
            .then((res) => {
                localStorage.setItem("user_id", res);
            })
            .catch((error) => {
                console.log(error);
                navigate("/login");
            });
        getAllVideos();
    }, []);
    if(isLoading){
        <Loading />
    }
    return(
        <div className="flex justify-center bg-gray-200 min-h-screen">
            <div className="flex flex-col bg-white pb-3 mobile:w-[512px] w-screen">
                <>
                    <h1 className="font-medium text-center leading-tight text-2xl mt-2 mb-2 text-[#dc5714]">
                        {videoInfo.event_name}
                    </h1>
                    <MyTeamResult
                        myTeam={myTeam}
                        videoInfo={videoInfo}
                        contestId={contestId}
                        myRewards={myRewards}
                    />
                </>
            </div>
        </div>
    )
}

export default VideoContestResult