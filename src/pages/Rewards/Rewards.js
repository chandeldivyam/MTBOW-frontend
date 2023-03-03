import React, { useEffect, useState, useRef } from "react";
import { SingleScratchCard } from "./SingleScratchCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import Loading from "../Main/Loading";

export const Rewards = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [rewardData, setRewardData] = useState([])
    const [totalRewards, setTotalRewards] = useState(0)

    const getScratchCards = async() => {
        const scratch_card_info = await axios({
            method: "GET",
            url: `https://api.mtbow.com/api/v1/scratchcards/`,
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if(scratch_card_info?.data?.data.length === 0){
            setIsLoading(false)
            return
        }
        const sortedArray = scratch_card_info?.data?.data.sort((a, b) => {
            if (a.is_seen === b.is_seen) {
              return b.id - a.id;
            } else {
              return a.is_seen ? 1 : -1;
            }
          });
          
        setRewardData([...sortedArray])
        setTotalRewards(sortedArray.reduce((acc, reward) => {
            if(reward.is_seen) acc += reward.reward;
            console.log(reward)
            return acc;
        }, 0))
        setIsLoading(false)
    }
    useEffect(() => {
        getScratchCards()
    }, []);

    if(isLoading) return <Loading />

    return(
        <div className="text-center mobile:w-[512px] w-screen text-slate-400">
            <div className="mt-4 text-center mobile:w-[512px] w-screen text-slate-400">
                Total Rewards:{" "}
                <p className="text-black font-semibold text-2xl">
                    ₹{totalRewards}
                </p>
            </div>
            <div className="grid grid-cols-2 gap-2 mx-4 mt-4">
                {rewardData.map((item) => {
                    return <SingleScratchCard key={item.id}{...item} rewardData={rewardData} setRewardData={setRewardData} setTotalRewards={setTotalRewards} totalRewards={totalRewards}/>
                })}
            </div>
        </div>
    )
}