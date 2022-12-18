import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { AllExpiredContest } from "../../components/results/AllExpiredContest";
import Loading from "../Main/Loading";
import { AllExpiredVideoContest } from "../../components/videoResults/AllExpiredVideoContest";
export const Results = () => {
    let navigate = useNavigate();

    const [expiredContests, setExpiredContests] = useState([]);
    const [expiredVideoContests, setExpiredVideoContests] = useState([]);
    const { authenticateUser } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(true);

    const fetchExpiredContests = async () => {
        const expiredContestsResponse = await axios({
            method: "get",
            url: "https://api.mtbow.com/api/v1/contests/expired",
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        return expiredContestsResponse.data;
    };
    const fetchExpiredVideoContests = async() => {
        const expiredVideoContestsResponse = await axios({
            method: "get",
            url: "https://api.mtbow.com/api/v1/videocontests/expired",
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        return expiredVideoContestsResponse.data;
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
        fetchExpiredContests()
            .then((res) => {
                setExpiredContests(res);
            })
            .catch((err) => {
                console.log(err);
            });
        fetchExpiredVideoContests()
            .then((res) => {
                setExpiredVideoContests(res)
                setIsLoading(false);
            })
    }, []);
    if (isLoading) {
        return <Loading />;
    }
    return (
        <div className="flex justify-center bg-gray-200 min-h-screen">
            <div className="flex flex-col max-w-lg bg-white pb-3">
                <div>
                    <div className="mt-4 text-center text-2xl font-bold underline mobile:w-[512px] w-screen">
                        CLOSED EVENTS!
                    </div>
                    <AllExpiredVideoContest expiredVideoContests={expiredVideoContests} />
                    {/* <AllExpiredContest expiredContests={expiredContests} /> */}
                </div>
            </div>
        </div>
    );
};
