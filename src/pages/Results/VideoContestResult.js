import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyTeamResult from "../../components/videoTeams/MyTeamResult";
import Loading from "../Main/Loading";
import OtherTeamResult from "../../components/videoTeams/OtherTeamResult";
import { GiPartyPopper } from "react-icons/gi";
import { Modal, Result, Button } from 'antd';
import gift_open from "../../Static/gift_open.png"

const VideoContestResult = () => {
    let navigate = useNavigate();
    const { authenticateUser } = useGlobalContext();
    const { contestId } = useParams();
    const [videoInfo, setVideoInfo] = useState([])
    const [isExpired, setIsExpired] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [myTeam, setMyTeam] = useState([]);
    const [participationFee, setParticipationFee] = useState(false)
    const [myRewards, setMyRewards] = useState("");
    const [myCardType, setMyCardType] = useState("")
    const [contestInfo, setContestInfo] = useState({
        event_name: "",
        image_url: "",
        event_start_time: "",
        event_end_time: "",
    });
    const [showPrizeModal, setShowPrizeModal] = useState(false)

    const teamData = async (participation_fee) => {
        if(participation_fee){
            var team_details = await axios({
                method: "get",
                url: `https://api.mtbow.com/api/v1/videoteams/${contestId}`,
                data: { contest_id: parseInt(contestId) },
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
        }
        else{
            var team_details = await axios({
                method: "get",
                url: `https://api.mtbow.com/api/v1/videoteams/expired/${contestId}`,
                data: { contest_id: parseInt(contestId) },
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
        }
        console.log(team_details.data)
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
        const { is_expired, participation_fee } = getVideos.data.contest_details[0];
        if(participation_fee > 0) setParticipationFee(true)
        if (!is_expired) {
            setIsExpired(false);
            setIsLoading(false);
            navigate("/");
            return;
        }
        setIsExpired(true);
        const team_details = await teamData(participation_fee);
        // if (team_details.data.rowCount <= 0) {
        //     navigate("/");
        // }
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
        if(team_details.data.rows[0].first_seen === false && team_details.data.rows[0].card_type){
            setMyCardType(team_details.data.rows[0].card_type)
            setShowPrizeModal(true)
        }
    }
    useEffect(() => {
        getAllVideos();
    }, []);
    if(isLoading){
        <Loading />
    }
    if(myTeam.length === 0){
        return(
            <>
                <h1 className="font-medium text-center leading-tight text-2xl mt-2 mb-2 text-[#dc5714]">
                            {videoInfo.event_name}
                </h1>
                <OtherTeamResult 
                    videoInfo={videoInfo}
                    contestId={contestId}
                />
            </>
        )
    }
    return(
        <div className="flex justify-center bg-gray-200 min-h-screen">
            <div className="flex flex-col bg-white pb-3 mobile:w-[512px] w-screen">
                <>
                    <h1 className="font-medium text-center leading-tight text-2xl mt-2 mb-2 text-[#dc5714]">
                        {videoInfo.event_name}
                    </h1>
                    {!participationFee && <Modal 
                        title="Congratulations" 
                        open={showPrizeModal} 
                        footer={null} 
                        onCancel={() => setShowPrizeModal(false)}
                        bodyStyle={{ display: "flex", alignItems: "center", justifyContent: "center",  padding: 0}} 
                        width={400}
                        >
                            <Result 
                                status={"success"}
                                title={`You have won a ${myCardType} card!`}
                                icon={<div  className="flex justify-center"><img src={gift_open} alt="gift opening image in modal" className="max-h-[200px]"/></div>}
                                extra={<Button onClick={() => navigate("/rewards")}>Scratch Now</Button>}
                            />
                    </Modal>}
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