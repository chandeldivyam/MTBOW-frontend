import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { useNavigate, Link } from "react-router-dom";
import Contests from "../../components/contests/Contests";
import Navbar from "./Navbar";
import Loading from "./Loading";

const Home = () => {
    let navigate = useNavigate();
    const { authenticateUser, getBalance } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState("");
    const [liveContests, setLiveContests] = useState([]);

    const fetchLiveContests = async () => {
        const liveContestsResponse = await axios({
            method: "get",
            url: "https://api.mtbow.com/api/v1/contests/live",
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
        getBalance();
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
        return <Loading />;
    }
    return (
        <>
            <div>
                <div className="mt-4 text-center text-2xl font-bold underline mobile:w-[512px] w-screen">
                    OPEN EVENTS!
                </div>
                <Contests liveContests={liveContests} />
            </div>
            <Link to="/myResults/">
                <div className="flex justify-center">
                    <div className="bg-transparent text-center mt-5 max-w-xs hover:bg-[#dc5714] text-[#dc5714] font-semibold hover:text-white py-2 px-4 border border-[#dc5714] hover:border-transparent rounded">
                        My Results
                    </div>
                </div>
            </Link>
        </>
    );
    // return <h1>home</h1>;
};

export default Home;
