import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { useGlobalContext } from "../../context";
import { FcMoneyTransfer, FcApproval } from "react-icons/fc";
import { FaUserFriends, FaUmbrellaBeach } from "react-icons/fa";
import { Alert, Space, Button, Steps, Input, Tooltip, message } from 'antd';
import { AiFillCopy } from "react-icons/ai";
import { TbCurrencyRupee } from "react-icons/tb";

const referral_steps_items = [
    {
        title: "Invite your Friends",
        description: "Share your referral code and ask them to signup",
        icon: <FaUserFriends size={28} color={"#FFD700"}/>
    },
    {
        title: "Performs KYC",
        description: "You both get ₹10 on their KYC verification",
        icon: <FcApproval size={28}/>
    },
    {
        title: "Make more money",
        description: "Everytime your referral participate in a contest, you get extra ₹5",
        icon: <FaUmbrellaBeach size={28} color={"#B19CD9"}/>
    }
]

const Refer = () => {
    let navigate = useNavigate();
    const Step = Steps.Step
    const { authenticateUser, getBalance } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(true);
    const [referralCode, setReferralCode] = useState("")
    const [referralBonus, setReferralBonus] = useState("")

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralCode)
        message.success({
            duration: 3,
            className: "mt-[100px]",
            content: "Referral Code Copied",
        });
    }

    const getInfo = async() => {
        const referral_info = await axios({
            method: "GET",
            url: `http://localhost:3005/api/v1/refer/info`,
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        if(!referral_info.data){
            return
        }
        setReferralCode(referral_info.data.referral_code)
        setReferralBonus(referral_info.data.referral_bonus)
        setIsLoading(false)
    }

    useEffect(() => {
        getInfo()
    }, []);
    if(isLoading){
        return(<Loading />)
    }
    return(
        <div className="text-center mobile:w-[512px] w-screen text-slate-400">
            <div className="pl-6 mt-1 pt-3 pr-2 bg-slate-100">
                <h2 className="text-lg">How to Refer?</h2>
                <Steps 
                    direction="vertical"
                    size="large"
                    current={3}
                >
                    {referral_steps_items.map((step_item) => {
                        return(
                            <Step 
                                title={<h2 className="text-md">{step_item.title}</h2>} 
                                description={step_item.description}
                                icon={step_item.icon}
                                key={step_item.title}
                                />
                        )
                    })}
                </Steps>
                <Space>
                    <h1 className="text-center">Referral Code:</h1>
                    <button
                            type="button"
                            className="text-xl text-[#dc5714] bg-white font-medium rounded-lg my-2 px-3 py-2.5 text-center inline-flex items-center border-[2px] border-gray-400"
                            onClick={copyToClipboard}
                        >
                            {referralCode}
                            <AiFillCopy className="ml-2" color="gray"/>
                    </button>
                </Space>
                <Space>
                    <h1 className="text-center">{`Earned via referrals:`}</h1>
                    <div
                            className="text-lg text-[#008000] bg-white font-medium rounded-lg my-2 px-3 py-2.5 text-center inline-flex items-center border-[2px] border-gray-400"
                        >
                            <TbCurrencyRupee color="#008000" size={22}/>
                            {referralBonus}
                    </div>
                </Space>
            </div>
            <Alert 
                message={
                    <div>
                        <h1 className="ml-3 text-left text-lg">Refer and Earn</h1>
                        <h2 className="ml-3 mt-[-10px] text-left text-gray-500">Make money everytime your referral participates</h2>
                    </div>
                } 
                className="bg-white m-1 border-[2px] shadow-lg"
                showIcon
                icon={<FcMoneyTransfer size={32}/>}
            />
        </div>
    )
}

export default Refer;