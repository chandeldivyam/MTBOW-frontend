import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import CreatorCard from "./CreatorCard";
import moment from "moment";
import MyTeam from "../teams/MyTeam";
import { useGlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { ContestExpired } from "./ContestExpired";
import { ContestWaiting } from "./ContestWaiting";
import Loading from "../../pages/Main/Loading";
import { message, Button, Divider, Table } from "antd";
import {
    contest_points_data,
    contest_points_columns,
    rewards_columns,
    rewards_data,
} from "../../Static/data";

const ContestInfo = () => {
    let navigate = useNavigate();
    const { authenticateUser, balance } = useGlobalContext();
    const { contestId } = useParams();
    const [contestInfo, setContestInfo] = useState({
        event_name: "",
        image_url: "",
        event_start_time: "",
        event_end_time: "",
    });
    const [creatorsInfo, setCreatorsInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [myTeam, setMyTeam] = useState([]);
    const [isTeamError, setIsTeamError] = useState(false);
    const [balanceError, setBalanceError] = useState(false);
    const [isExpired, setIsExpired] = useState(false);
    const [teamExist, setTeamExist] = useState(false);
    const [eventStarted, setEventStarted] = useState(false);
    const [showRules, setShowRules] = useState(true);

    const teamData = async () => {
        const team_details = await axios({
            method: "get",
            url: `https://api.mtbow.com/api/v1/teams/${contestId}`,
            data: { contest_id: parseInt(contestId) },
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        return team_details;
    };

    const getAllCreators = async () => {
        const getCreators = await axios({
            method: "get",
            url: `https://api.mtbow.com/api/v1/contests/contestInfo/${contestId}`,
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        const { is_expired } = getCreators.data[0];
        if (is_expired) {
            setIsExpired(true);
            setIsLoading(false);
            return;
        }
        setIsExpired(false);
        const team_details = await teamData();
        if (team_details.data.rowCount > 0) {
            setTeamExist(true);
            setMyTeam(team_details.data.rows[0].team);
        }
        const {
            name,
            image_url,
            event_end_time,
            event_start_time,
            participation_fee,
        } = getCreators.data[0];
        setContestInfo({
            ...contestInfo,
            event_name: name,
            image_url: image_url,
            event_start_time: event_start_time,
            event_end_time: event_end_time,
            participation_fee,
        });
        if (Date.now() >= Date.parse(event_end_time)) {
            setIsExpired(true);
        }
        if (Date.now() >= Date.parse(event_start_time)) {
            setEventStarted(true);
        }
        setCreatorsInfo(getCreators.data);
        setIsLoading(false);
    };

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
            url: `https://api.mtbow.com/api/v1/teams/`,
            data: {
                contest_id: contestId,
                browser_ids: myTeam,
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

    useEffect(() => {
        authenticateUser()
            .then((res) => {
                localStorage.setItem("user_id", res);
            })
            .catch((error) => {
                console.log(error);
                navigate("/login");
            });
        getAllCreators();
    }, []);

    if (isLoading) {
        return <Loading />;
    }
    if (isExpired) {
        return <ContestExpired />;
    }
    if (teamExist) {
        if (eventStarted) {
            return (
                <MyTeam
                    myTeam={myTeam}
                    creatorsInfo={creatorsInfo}
                    contestId={contestId}
                    event_end_time={contestInfo.event_end_time}
                />
            );
        }
        return <ContestWaiting myTeam={myTeam} creatorsInfo={creatorsInfo} />;
    }
    if (!teamExist && eventStarted) {
        return <h1>Sorry, you have not participated</h1>;
    }
    return (
        <div className="flex justify-center bg-gray-200 min-h-screen">
            <div className="max-w-lg bg-white">
                <div className="max-w-lg bg-white">
                    <div class="flex my-4 mobile:w-[512px] w-screen">
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
                    <div className="grid grid-cols-2">
                        {creatorsInfo.map((item) => {
                            return (
                                <CreatorCard
                                    key={item.id}
                                    {...item}
                                    addToTeam={addToTeam}
                                    removeFromTeam={removeFromTeam}
                                    myTeam={myTeam}
                                />
                            );
                        })}
                    </div>
                    <div className="flex justify-center mt-2 sticky bottom-0 z-10">
                        <Button
                            className={
                                myTeam.length === 11
                                    ? "inline-block bg-white px-6 mb-8 text-[#dc5714] font-medium text-l leading-tight uppercase rounded-full shadow-xl hover:shadow-lg transition duration-150 ease-in-out"
                                    : "inline-block bg-white px-6 mb-8 text-slate-300 font-medium text-l leading-tight uppercase rounded-full shadow-xl"
                            }
                            type="button"
                            onClick={createTeam}
                            disabled={myTeam.length === 11 ? false : true}
                        >
                            PARTICIPATE
                        </Button>
                    </div>
                </div>
                <div className={showRules ? "flex flex-col" : "hidden"}>
                    <h1 className="text-center text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight underline my-4">
                        Create Your Team
                    </h1>
                    <div className="flex justify-around">
                        <div
                            type="button"
                            className="focus:outline-none text-white bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600"
                        >
                            Invest: ₹{contestInfo.participation_fee}
                        </div>
                        <div
                            type="button"
                            className="focus:outline-none text-white bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 0"
                        >
                            Prize Pool: ₹10000
                        </div>
                    </div>
                    <Divider>Rules</Divider>
                    <ul className="list-disc">
                        <li className="ml-10 mr-2 my-1">
                            The team should consist of 11 creators
                        </li>
                        <li className="ml-10 mr-2 my-1">
                            Participation will only be accepted before{" "}
                            {new Date(contestInfo.event_start_time).toString()}
                        </li>
                        <li className="ml-10 mr-2 my-1">
                            The contest will end at{" "}
                            {new Date(contestInfo.event_end_time).toString()}
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
                        className="ml-5 mr-2"
                        columns={rewards_columns}
                        pagination={false}
                        dataSource={rewards_data}
                    />
                </div>
            </div>
        </div>
    );
};

export default ContestInfo;
