import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import { AllExpiredContest } from "../components/results/AllExpiredContest";
export const Results = () => {
    let navigate = useNavigate();

    const [expiredContests, setExpiredContests] = useState([]);
    const { authenticateUser } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(true);

    const fetchExpiredContests = async () => {
        const expiredContestsResponse = await axios({
            method: "get",
            url: "http://localhost:3005/api/v1/contests/expired",
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        return expiredContestsResponse.data;
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
        fetchExpiredContests()
            .then((res) => {
                setExpiredContests(res);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    return (
        <div className="flex justify-center bg-gray-200 min-h-screen">
            <div className="flex flex-col max-w-lg bg-white pb-3">
                <div>
                    <div className="mt-4 text-center mobile:w-[512px] w-screen">
                        CLOSED EVENTS!
                    </div>
                    <AllExpiredContest expiredContests={expiredContests} />
                </div>
            </div>
        </div>
    );
};
