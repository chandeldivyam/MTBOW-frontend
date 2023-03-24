import React, { useEffect, useState } from "react";
import ScratchCard from 'react-scratchcard-v4';
import axios from "axios";
import BRONZE_SCRATCH_CARD from "../../Static/BRONZE_SCRATCH_CARD.png"
import GOLDEN_SCRATCH_CARD from "../../Static/GOLDEN_SCRATCH_CARD.png"
import SILVER_SCRATCH_CARD from "../../Static/SILVER_SCRATCH_CARD.png"
import SCRATCH_CARD from "../../Static/SCRATCH_CARD.png"
import coin from "../../Static/coin.png"
import { useGlobalContext } from "../../context";

import { Button, Modal, Image } from 'antd';

export const SingleScratchCard = ({id, card_type, reward, is_seen, rewardData, setRewardData, totalRewards, setTotalRewards}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { balance, setBalance } = useGlobalContext();
    const { height, width } = useWindowDimensions();
    const showModal = () => {
        setIsModalOpen(true);
      };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleScratch = async () => {
        const scratch_completed = await axios({
            method: "POST",
            url: `http://localhost:3005/api/v1/scratchcards/scratch`,
            headers: {
                Authorization: localStorage.getItem("token"),
            },
            data: {
                scratch_card_id: id
            }
        });
        const updatedRewardsData = rewardData.map(item => {
            if (item.id === id) {
                setTotalRewards(totalRewards + item.reward)
                return {
                    ...item,
                    is_seen: true
                }
            }
            return item;
        });
        setBalance({ ...balance, ...scratch_completed?.data?.balance });
        setRewardData(updatedRewardsData);
    };
    var cardImg

    if(card_type === 'GOLDEN'){
        cardImg = GOLDEN_SCRATCH_CARD
    }
    else if(card_type === 'SILVER'){
        cardImg = SILVER_SCRATCH_CARD
    }
    else if(card_type === 'BRONZE'){
        cardImg = BRONZE_SCRATCH_CARD
    }
    else if(card_type === 'BLUE'){
        cardImg = SCRATCH_CARD
    }
    if(is_seen){
        return(<SeenCard reward={reward} card_type={card_type}/>)
    }
    return(
        <>
            <img src={cardImg} onClick={showModal} className="rounded-xl h-[193px]"/>
            <Modal title="Scratch Card" open={isModalOpen} 
                    onOk={handleOk} 
                    onCancel={handleCancel} 
                    bodyStyle={{ display: "flex", alignItems: "center", justifyContent: "center",  }} 
                    width={400}
                    footer={null}
                >
                    <ScratchCard
                        width={width*0.6}
                        height={226}
                        image={cardImg}
                        finishPercent={30}
                        className="px-[100px]"
                        onComplete={() => handleScratch()}
                    >
                        <SeenCardScratch reward={reward} card_type={card_type}/>
                    </ScratchCard>
            </Modal>
        </>
    )
}

const SeenCard = ({reward, card_type}) => {
    let borderColour;
    if(card_type === 'GOLDEN'){
        borderColour = "border-2 border-[#FFD700] bg-[#FFD700] grid grid-cols-1 h-[193px] items-center justify-items-center"
    }
    else if(card_type === 'SILVER'){
        borderColour = "border-2 border-[#C0C0C0] bg-[#C0C0C0] grid grid-cols-1 h-[193px] items-center justify-items-center"
    }
    else if(card_type === 'BRONZE'){
        borderColour = "border-2 border-[#CD7F32] bg-[#CD7F32] grid grid-cols-1 h-[193px] items-center justify-items-center"
    }
    else{
        borderColour = "border-2 border-[#368BC1] bg-[#368BC1] grid grid-cols-1 h-[193px] items-center justify-items-center"
    }
    if(Number(reward) === 0){
        return(
            <div className={borderColour + "p-4"}>
                <h3 className="text-[#FFFFFF] text-lg">Better luck next time</h3>
            </div>
        )
    }
    return(
        <div className={borderColour}>
            <img src={coin} className="mb-2 max-h-[100px] max-w-[100px]"/>
            <h3 className="text-[#FFFFFF] text-lg">You have won <br /><strong>₹{reward}</strong></h3>
        </div>
    )
}

const SeenCardScratch = ({reward, card_type}) => {
    let borderColour;
    if(card_type === 'GOLDEN'){
        borderColour = "border-2 border-[#FFD700] grid grid-cols-1 h-[193px] items-center justify-items-center"
    }
    else if(card_type === 'SILVER'){
        borderColour = "border-2 border-[#C0C0C0] grid grid-cols-1 h-[193px] items-center justify-items-center"
    }
    else if(card_type === 'BRONZE'){
        borderColour = "border-2 border-[#CD7F32] grid grid-cols-1 h-[193px] items-center justify-items-center"
    }
    else{
        borderColour = "border-2 border-[#368BC1] grid grid-cols-1 h-[193px] items-center justify-items-center"
    }
    if(Number(reward) === 0){
        return(
            <div className={borderColour}>
                <h3 className="text-lg">Better luck next time</h3>
            </div>
        )
    }
    return(
        <div className={borderColour}>
            <img src={coin} className="mb-2 max-h-[100px] max-w-[100px]"/>
            <h3 className="text-lg">You have won <br /><strong>₹{reward}</strong></h3>
        </div>
    )
}

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    if(width > 512){
        return { width: 512, height};
    }
    return { width, height }
  }
  
function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
  }