import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import Contests from "../../components/contests/Contests";
import Navbar from "./Navbar";
import Loading from "./Loading";
import { GiCrown } from "react-icons/gi";
import VideoContests from "../../components/videoContests/VideoContests";
import { Alert, Tabs } from 'antd';
import HomeCarousel from "../../components/utils/HomeCarousel";

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
        getBalance();
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

    const tab_items = [
        {
            label: "Upcoming",
            key: "upcoming",
            children: <div>
                <VideoContests liveVideoContests={liveVideoContests.liveVideoContest.filter(item => new Date(item.event_start_time) > new Date())} />
            </div>
        },
        {
            label: "Live",
            key: "live",
            children: <div>
                <VideoContests liveVideoContests={liveVideoContests.liveVideoContest.filter(item => new Date(item.event_start_time) < new Date())} />
            </div>
        }
    ]

    return (
        <>
            <div className="pb-[99px]">
                <div className="mt-4 text-center text-2xl font-bold underline mobile:w-[512px] w-screen">
                </div>
                <HomeCarousel />
                <Tabs
                    defaultActiveKey="upcoming"
                    centered={true}
                    items={tab_items}
                />
                <Alert message={<span className="align-middle">Would you dare to challenge <span className="font-semibold">{liveVideoContests.previousWinner}</span>? Our Current champion!</span>} 
                    type="success" 
                    showIcon
                    icon={<GiCrown size={32}/>}
                    />
            </div>
        </>
    );
    // return <h1>home</h1>;
};

export default Home;
