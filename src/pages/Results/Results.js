import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { AllExpiredContest } from "../../components/results/AllExpiredContest";
import Loading from "../Main/Loading";
import { AllExpiredVideoContest } from "../../components/videoResults/AllExpiredVideoContest";
import { Tabs, Pagination, Space } from 'antd';
export const Results = () => {
    let navigate = useNavigate();

    const [expiredContests, setExpiredContests] = useState([]);
    const [expiredVideoContests, setExpiredVideoContests] = useState([]);
    const [myExpiredVideoContests, setMyExpiredVideoContests] = useState([]);
    const { authenticateUser } = useGlobalContext();
    const [myTabIndex, setMyTabIndex] = useState(1)
    const [allTabIndex, setAllTabIndex] = useState(1)
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
    const fetchExpiredVideoContests = async() => {
        const expiredVideoContestsResponse = await axios({
            method: "get",
            url: "http://localhost:3005/api/v1/videocontests/expired",
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        return expiredVideoContestsResponse.data;
    }
    useEffect(() => {
        fetchExpiredVideoContests()
            .then((res) => {
                setExpiredVideoContests(res.allExpiredContests)
                setMyExpiredVideoContests(res.myExpiredContests)
                setIsLoading(false);
            })
    }, []);
    if (isLoading) {
        return <Loading />;
    }

    const handleAllPageChange = (page) => {
        setAllTabIndex(Number(page))
    }

    const handleMyPageChange = (page) => {
        setMyTabIndex(Number(page))
    }

    const tab_items = [
        {
            label: "My Results", 
            key: "my_results", 
            children: <>
                    <AllExpiredVideoContest expiredVideoContests={myExpiredVideoContests.slice(5*myTabIndex-5, 5*myTabIndex)} />
                    <div align="center" className="mt-2">
                        <Pagination 
                            className="items-center" 
                            defaultCurrent={1} 
                            total={myExpiredVideoContests.length} 
                            defaultPageSize={5}
                            onChange={handleMyPageChange}
                        />
                    </div>
                </>
        },
        {
            label: "Others", 
            key: "all_results", 
            children: <>
                    <AllExpiredVideoContest expiredVideoContests={expiredVideoContests.slice(5*allTabIndex-5, 5*allTabIndex)}/>
                    <div align="center" className="mt-2">
                        <Pagination 
                            className="items-center" 
                            defaultCurrent={1} 
                            total={expiredVideoContests.length} 
                            defaultPageSize={5}
                            onChange={handleAllPageChange}
                        />
                    </div>
                </>
        }
    ]

    return (
        <div className="flex justify-center bg-gray-200 min-h-screen">
            <div className="flex flex-col max-w-lg bg-white pb-3">
                <div>
                    <div className="mobile:w-[512px] w-screen">
                    </div>
                    <Tabs 
                        defaultActiveKey="my_results"
                        centered={true}
                        items={tab_items}
                        size={"large"}
                    />
                    {/* <AllExpiredContest expiredContests={expiredContests} /> */}
                </div>
            </div>
        </div>
    );
};
