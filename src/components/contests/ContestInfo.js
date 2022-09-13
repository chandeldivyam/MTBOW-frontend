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

const ContestInfo = () => {
    let navigate = useNavigate();
    const { authenticateUser } = useGlobalContext();
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
    const [isExpired, setIsExpired] = useState(false);
    const [teamExist, setTeamExist] = useState(false);
    const [eventStarted, setEventStarted] = useState(false);

    const teamData = async () => {
        const team_details = await axios({
            method: "get",
            url: `http://localhost:3005/api/v1/teams/${contestId}`,
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
            url: `http://localhost:3005/api/v1/contests/contestInfo/${contestId}`,
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
        const { name, image_url, event_end_time, event_start_time } =
            getCreators.data[0];
        setContestInfo({
            ...contestInfo,
            event_name: name,
            image_url: image_url,
            event_start_time: event_start_time,
            event_end_time: event_end_time,
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
        const newTeam = myTeam.filter((item) => item != member);
        setMyTeam(newTeam);
    };

    const createTeam = async () => {
        if (myTeam.length !== 4) {
            setIsTeamError(true);
            return;
        }
        axios({
            method: "post",
            url: `http://localhost:3005/api/v1/teams/`,
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
        return <h1>loading...</h1>;
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
                />
            );
        }
        return <ContestWaiting myTeam={myTeam} creatorsInfo={creatorsInfo} />;
    }
    if (!teamExist && eventStarted) {
        return <h1>Sorry, you have not participated</h1>;
    }
    return (
        <>
            <h1 className="text-center mt-2.5">Create Your Team</h1>
            <div className="grid grid-cols-3">
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
            <div className="flex justify-center">
                <button
                    className="inline-block px-6 py-2.5 mt-5 bg-green-500 text-white font-medium text-l leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
                    type="button"
                    onClick={createTeam}
                >
                    PARTICIPATE
                </button>
            </div>
            <div
                className={`${
                    isTeamError
                        ? "bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700"
                        : "invisible"
                }`}
            >
                Please select 4 creators for the Team!
            </div>
        </>
    );
};

export default ContestInfo;
