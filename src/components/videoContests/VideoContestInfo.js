import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useGlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { GiTargetPrize, GiHumanPyramid } from "react-icons/gi";
import { AiOutlineClockCircle } from "react-icons/ai";
import Loading from "../../pages/Main/Loading";
import { ContestExpired } from "../contests/ContestExpired";
import { message, Button, Divider, Table, Progress, Popconfirm, Collapse, Avatar, Card } from "antd";
import {
    contest_points_data,
    contest_points_columns,
    rewards_columns,
    rewards_data,
    rewards_data_under5,
} from "../../Static/data";
import VideoCard from "./VideoCard";
import { VideoContestWaiting } from "./VideoContestWaiting";
import MyTeam from "../videoTeams/MyTeam";

const VideoContestInfo = () => {
    let navigate = useNavigate();
    const { authenticateUser, balance } = useGlobalContext();
    const { videoContestId } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [isTeamError, setIsTeamError] = useState(false);
    const [balanceError, setBalanceError] = useState(false);
    const [contestInfo, setContestInfo] = useState({
        event_name: "",
        image_url: "",
        event_start_time: "",
        event_end_time: "",
    });
    const [videoInfo, setVideoInfo] = useState([]);
    const [myTeam, setMyTeam] = useState([]);
    const [isExpired, setIsExpired] = useState(false);
    const [teamExist, setTeamExist] = useState(false);
    const [eventStarted, setEventStarted] = useState(false);
    const [showRules, setShowRules] = useState(true);
    const { Meta } = Card;

    const teamData = async () => {
        const team_details = await axios({
            method: "get",
            url: `https://api.mtbow.com/api/v1/videoteams/${videoContestId}`,
            data: { contest_id: parseInt(videoContestId) },
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        return team_details;
    };

    const getAllVideos = async() => {
        const getVideos = await axios({
            method: "get",
            url: `https://api.mtbow.com/api/v1/videocontests/contestInfo/${videoContestId}`,
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
        const { is_expired } = getVideos.data.contest_details[0];
        if (is_expired) {
            setIsExpired(true);
            setIsLoading(false);
            return;
        }
        setIsExpired(false);
        const team_details = await teamData();
        if (team_details.data.rowCount > 0) {
            setTeamExist(true);
            setMyTeam(team_details.data.rows[0].video_team);
        }
        const {
            name,
            image_url,
            event_end_time,
            event_start_time,
            participation_fee,
        } = getVideos.data.contest_details[0];
        const participants = parseInt(getVideos.data.participants);
        setContestInfo({
            ...contestInfo,
            event_name: name,
            image_url: image_url,
            event_start_time: event_start_time,
            event_end_time: event_end_time,
            participation_fee,
            participants,
        });
        if (Date.now() >= Date.parse(event_end_time)) {
            setIsExpired(true);
        }
        if (Date.now() >= Date.parse(event_start_time)) {
            setEventStarted(true);
        }
        setVideoInfo([...videoInfo, ...getVideos.data.contest_details]);
        setIsLoading(false);
    }

    const addToTeam = (member) => {
        setMyTeam([...myTeam, member]);
    };
    const removeFromTeam = (member) => {
        const newTeam = myTeam.filter((item) => item !== member);
        setMyTeam(newTeam);
    };

    const createTeam = async () => {
        if (myTeam.length !== 11) {
            setIsTeamError(true);
            message.error({
                className: "mt-[100px] z-10",
                duration: 4,
                content: "Please select 11 creators for the Team!",
            });
            return;
        }
        setIsTeamError(false);
        if (
            balance.topup + balance.promotional + balance.winnings <
            contestInfo.participation_fee
        ) {
            setBalanceError(true);
            message.error({
                className: "mt-[100px] z-10",
                duration: 4,
                content: "Insufficient Balance!",
            });
            return;
        }
        setBalanceError(false);
        axios({
            method: "post",
            url: `https://api.mtbow.com/api/v1/videoteams/`,
            data: {
                contest_id: videoContestId,
                video_ids: myTeam,
            },
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log("Team not created");
            });
    };

    const collapseButtonHandler = (video_id) => {
        return(
            <button
            className={
                myTeam.includes(video_id)
                    ? `bg-red-600 text-white uppercase text-xs ml-2 px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`
                    : `${
                            myTeam.length < 11
                                ? "bg-green-600"
                                : "bg-gray-500"
                        } text-white uppercase text-xs ml-2 px-4 py-2 rounded shadow outline-none mr-1 mb-1 ease-linear transition-all duration-150`
            }
            onClick={(event) => {
                event.stopPropagation();
                if (!myTeam.includes(video_id)) {
                    addToTeam(video_id);
                    return;
                }
                removeFromTeam(video_id);
                return;
            }}
            disabled={
                myTeam.length >= 11 && !myTeam.includes(video_id)
                    ? true
                    : ""
            }
        >
            {myTeam.includes(video_id)
                ? "-"
                : "+"}
            </button>
        )
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

    if(isLoading) return(<Loading />)
    if (isExpired) {
        return <ContestExpired />;
    }
    if (!teamExist && eventStarted) {
        return <h1>Sorry, you have not participated</h1>;
    }
    if (teamExist) {
        if(eventStarted){
            return(<MyTeam myTeam={myTeam} videoInfo={videoInfo} videoContestId={videoContestId} event_end_time={videoInfo[0].event_end_time}/>)
        }
        return(<VideoContestWaiting myTeam={myTeam} videoInfo={videoInfo}/>)
    }
    return(
        <div className="flex justify-center bg-gray-200 min-h-screen">
            <div className="max-w-lg bg-white">
                <div className="max-w-lg bg-white">
                    <div className="flex my-4 mobile:w-[512px] w-screen">
                        <div
                            className={
                                showRules
                                    ? "w-1/2 border-b-4 border-[#dc5714] text-[#dc5714] text-center text-lg pb-2"
                                    : "w-1/2 border-b-4 border-gray-400 text-gray-400 text-center text-lg pb-2"
                            }
                            onClick={() => setShowRules(true)}
                        >
                            Info
                        </div>
                        <div
                            className={
                                !showRules
                                    ? "w-1/2 border-b-4 border-[#dc5714] text-[#dc5714] text-center text-lg pb-2"
                                    : "w-1/2 border-b-4 border-gray-400 text-gray-400 text-center text-lg pb-2"
                            }
                            onClick={() => setShowRules(false)}
                        >
                            Team
                        </div>
                    </div>
                </div>
                <div className={showRules ? "hidden" : "flex flex-col"}>
                    <Collapse defaultActiveKey={[videoInfo[0].video_id]} accordion={true}>
                        {videoInfo.map((item) => {
                            return(
                                <Collapse.Panel 
                                    key={item.video_id} 
                                    header={<Meta
                                        avatar={<Avatar src={item.channel_thumbnail} />}
                                        title={item.channel_title}
                                        className="pt-2"
                                        />}
                                    extra={collapseButtonHandler(item.video_id)}
                                >
                                    <VideoCard 
                                        key={item.video_id}
                                        {...item}
                                        addToTeam={addToTeam}
                                        removeFromTeam={removeFromTeam}
                                        myTeam={myTeam}
                                    />  
                                </Collapse.Panel>
                            )
                        })}
                    </Collapse>
                    <div className="flex justify-center mt-2 sticky bottom-0 z-10 pb-10">
                        <div className="inline-flex max-h-[32px]">
                            <div className="bg-white rounded-full">
                                <Progress
                                    className={
                                        myTeam.length < 11
                                            ? "max-h-[32px]"
                                            : "hidden"
                                    }
                                    type="circle"
                                    percent={(myTeam.length * 100) / 11}
                                    format={(percent) => `${myTeam.length}/11`}
                                    // strokeColor="rgb(203 213 225)"
                                    width={32}
                                />
                            </div>
                            <div className="bg-white rounded-full">
                                <Progress
                                    className={
                                        myTeam.length === 11
                                            ? "text-[#dc5714] max-h-[32px]"
                                            : "hidden"
                                    }
                                    type="circle"
                                    percent={(myTeam.length * 100) / 11}
                                    format={() => `11/11`}
                                    width={32}
                                />
                            </div>
                            <Popconfirm
                                title="Participate with current selection?"
                                onConfirm={createTeam}
                            >
                                <Button
                                    className={
                                        myTeam.length === 11
                                            ? "inline-block bg-white px-6 mb-8 text-[#dc5714] font-medium text-l leading-tight uppercase rounded-full shadow-xl ml-2 hover:shadow-lg transition duration-150 ease-in-out"
                                            : "inline-block bg-white px-6 mb-8 text-slate-300 font-medium text-l leading-tight uppercase rounded-full shadow-xl ml-2"
                                    }
                                    type="button"
                                    disabled={
                                        myTeam.length === 11 ? false : true
                                    }
                                >
                                    PARTICIPATE
                                </Button>
                            </Popconfirm>
                        </div>
                    </div>
                </div>
                <div className={showRules ? "flex flex-col" : "hidden"}>
                    <div className="grid smobile:gap-2 grid-cols-2 justify-items-center">
                        <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white">
                            <div className="smobile:p-4 flex items-center">
                                <div className="p-3 rounded-full text-green-500 bg-green-100 mr-4">
                                    <svg
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium text-gray-600">
                                        Prize Pool
                                    </p>
                                    <p className="text-sm font-semibold text-gray-700 smobile:text-lg">
                                        ₹{" "}
                                        {(contestInfo.participants < 5 || Number(contestInfo.participation_fee) === 0 )
                                            ? "300"
                                            : `${(contestInfo.participants + 1) * contestInfo.participation_fee}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white">
                            <div className="smobile:p-4 flex items-center">
                                <div className="p-3 rounded-full text-yellow-500 bg-yellow-100 mr-4">
                                    <GiTargetPrize size={16} />
                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium text-gray-600">
                                        Entry
                                    </p>
                                    <p className="text-sm font-semibold text-gray-700 smobile:text-lg">
                                        ₹ {contestInfo.participation_fee}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white">
                            <div className="smobile:p-4 flex items-center">
                                <div className="p-3 rounded-full text-red-500 bg-red-100 mr-4">
                                    <AiOutlineClockCircle size={16} />
                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium text-gray-600">
                                        Duration
                                    </p>
                                    <p className="text-sm font-semibold text-gray-700 smobile:text-lg">
                                        {moment
                                            .duration(
                                                moment(
                                                    contestInfo.event_end_time
                                                ).diff(
                                                    moment(
                                                        contestInfo.event_start_time
                                                    )
                                                ),
                                                "milliseconds"
                                            )
                                            .humanize()}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white">
                            <div className="smobile:p-4 flex items-center">
                                <div className="p-3 rounded-full text-purple-500 bg-purple-100 mr-4">
                                    <GiHumanPyramid size={16} />
                                </div>
                                <div>
                                    <p className="mb-2 text-sm font-medium text-gray-600">
                                        Participants
                                    </p>
                                    <p className="text-sm font-semibold text-gray-700 smobile:text-lg">
                                        {contestInfo.participants < 5
                                            ? "5 / 100"
                                            : `${contestInfo.participants} / 100`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Divider>Rules</Divider>
                    <ul className="list-disc">
                        <li className="ml-10 mr-2 my-1">
                            The team should consist of 11 videos
                        </li>
                        <li className="ml-10 mr-2 my-1">
                            Participation will only be accepted before{" "}
                            {new Date(contestInfo.event_start_time).toLocaleString()}
                        </li>
                        <li className="ml-10 mr-2 my-1">
                            The contest will end at{" "}
                            {new Date(contestInfo.event_end_time).toLocaleString()}
                        </li>
                    </ul>
                    <Divider>Scoring</Divider>
                    <Table
                        className="ml-5 mr-2"
                        columns={contest_points_columns}
                        pagination={false}
                        dataSource={contest_points_data}
                    />
                    <Divider>Rewards</Divider>
                    <Table
                        className={
                            (contestInfo.participants >= 5 && Number(contestInfo.participation_fee) > 0)
                                ? "ml-5 mr-2"
                                : "hidden"
                        }
                        columns={rewards_columns}
                        pagination={false}
                        dataSource={rewards_data}
                    />
                    <Table
                        className={
                            (Number(contestInfo.participation_fee) === 0 || contestInfo.participants < 5)
                                ? "ml-5 mr-2"
                                : "hidden"
                        }
                        columns={rewards_columns}
                        pagination={false}
                        dataSource={rewards_data_under5}
                    />
                </div>
                <div className="flex justify-center mt-2 sticky bottom-0 z-10 pb-10">
                    <Button
                        className={
                            showRules
                                ? "inline-block bg-white px-6 mb-8 text-[#dc5714] font-medium text-l leading-tight uppercase rounded-full shadow-xl ml-2 hover:shadow-lg transition duration-150 ease-in-out"
                                : "hidden"
                        }
                        type="button"
                        onClick={() => setShowRules(!showRules)}
                        >
                            Create Team
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default VideoContestInfo;