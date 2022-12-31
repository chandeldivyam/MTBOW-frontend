import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { useNavigate, Link } from "react-router-dom";
import Contests from "../../components/contests/Contests";
import Navbar from "./Navbar";
import Loading from "./Loading";
import { GiCrown } from "react-icons/gi";
import VideoContests from "../../components/videoContests/VideoContests";
import { Alert } from 'antd';

const Home = () => {
    let navigate = useNavigate();
    const { authenticateUser, getBalance } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState("");
    const [liveContests, setLiveContests] = useState([]);
    const [liveVideoContests, setLiveVideoContests] = useState([])

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

    const fetchLiveVideoContests = async() => {
        const liveVideoContestsResponse = await axios({
            method: "get",
            url: "https://api.mtbow.com/api/v1/videocontests/live",
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
        return liveVideoContestsResponse.data
    }

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
            })
            .catch((err) => {
                console.log(err);
            });
        fetchLiveVideoContests()
            .then((res) => {
                setLiveVideoContests(res)
                setIsLoading(false);
            })
            .catch((err) => console.log(err))
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
                <Contests className={liveContests.length ? "" : "hidden"} liveContests={liveContests} />
                <VideoContests liveVideoContests={liveVideoContests.liveVideoContest} />
                <Alert message={<span className="align-middle">Would you dare to challenge <span className="font-semibold">{liveVideoContests.previousWinner}</span>? Our Current champion!</span>} 
                    type="success" 
                    showIcon
                    icon={<GiCrown size={32}/>}
                    />
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
