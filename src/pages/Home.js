import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../context";
import { useNavigate, Link } from "react-router-dom";
import Contests from "../components/contests/Contests";

const Home = () => {
    let navigate = useNavigate();
    const { authenticateUser } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState("");
    const [liveContests, setLiveContests] = useState([]);

    const fetchLiveContests = async () => {
        const liveContestsResponse = await axios({
            method: "get",
            url: "http://localhost:3005/api/v1/contests/live",
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        return liveContestsResponse.data;
    };

    useEffect(() => {
        authenticateUser()
            .then((res) => {
                setUserName(res);
                localStorage.setItem("user_id", res);
            })
            .catch((error) => {
                console.log(error);
                navigate("/login");
            });
        fetchLiveContests()
            .then((res) => {
                setLiveContests(res);
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
        <div className="flex flex-col justify-center">
            <div>
                <div className="text-center bg-gray-50 text-xl py-20 px-6 font-bold">
                    MTBOW
                </div>
                <div className="mt-4 text-center">OPEN EVENTS!</div>
                <Contests liveContests={liveContests} />
            </div>
            <Link to="/myResults/">
                <div className="flex justify-center">
                    <div className="bg-transparent text-center mt-5 max-w-xs hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        My Results
                    </div>
                </div>
            </Link>
        </div>
    );
    // return <h1>home</h1>;
};

export default Home;
