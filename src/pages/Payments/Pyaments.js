import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { BiWallet, BiGift } from "react-icons/bi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { GiPodiumWinner, GiTakeMyMoney } from "react-icons/gi";
import { AiOutlineRightCircle } from "react-icons/ai";
import Loading from "../Main/Loading";

const Payments = () => {
    const { authenticateUser, balance, getBalance } = useGlobalContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        authenticateUser()
            .then((res) => {
                localStorage.setItem("user_id", res);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                navigate("/login");
            });
        getBalance();
    }, []);

    if (isLoading === true) {
        return <Loading />;
    }

    return (
        <>
            <div className="mt-4 text-center mobile:w-[512px] w-screen text-slate-400">
                Balance:{" "}
                <p className="text-black font-semibold text-2xl">
                    ₹{balance.topup + balance.promotional + balance.winnings}
                </p>
            </div>
            <div className="grid grid-cols-2 my-8 px-4 justify-items-center items-center">
                <div className="grid grid-cols-2">
                    <div className="row-span-2 mr-3 my-1 w-[55px] items-center bg-transparent text-red-500 font-semibold py-2 px-4 border border-red-700 rounded">
                        <BiWallet size={22} />
                    </div>
                    <div className="text-slate-400">Deposit</div>
                    <div>₹{balance.topup}</div>
                </div>
                <button
                    onClick={() => {
                        navigate("/recharge");
                    }}
                    className="text-white bg-[#dc5714] font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center "
                >
                    <IoIosAddCircleOutline className="mr-1" />
                    Add Money
                </button>
            </div>
            <div className="grid grid-cols-2 my-8 px-4 justify-items-center items-center">
                <div className="grid grid-cols-2">
                    <div className="row-span-2 mr-3 my-1 w-[55px] items-center bg-transparent text-green-700 font-semibold py-2 px-4 border border-green-500 rounded">
                        <GiPodiumWinner size={22} />
                    </div>
                    <div className="text-slate-400">Winnings</div>
                    <div>₹{balance.winnings}</div>
                </div>
                <button
                    type="button"
                    className="text-white bg-[#dc5714] font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center "
                    onClick={() => {
                        navigate("/withdraw");
                    }}
                >
                    <MdOutlineLogout className="mr-1" />
                    Withdraw
                </button>
            </div>
            <div className="grid grid-cols-2 my-8 px-4 justify-items-center items-center">
                <div className="grid grid-cols-2">
                    <div className="row-span-2 mr-3 my-1 w-[55px] items-center bg-transparent text-yellow-700 font-semibold py-2 px-4 border border-yellow-500 rounded">
                        <BiGift size={22} />
                    </div>
                    <div className="text-slate-400">Promotional</div>
                    <div>₹{balance.promotional}</div>
                </div>
                <button
                    type="button"
                    className="text-white bg-[#dc5714] font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center "
                    onClick={() => {
                        navigate("/refer");
                    }}
                >
                    <GiTakeMyMoney className="mr-1" />
                    Refer
                </button>
            </div>
            <div className="flex flex-col bg-gray-50 mx-10 rounded-3xl px-5">
                <div
                    className="flex px-5 py-4 justify-between border-b-2"
                    onClick={() => {
                        navigate("/transactions");
                    }}
                >
                    <h2 className="text-lg">Transactions</h2>
                    <AiOutlineRightCircle size={22} />
                </div>
                <div className="flex px-5 py-4 justify-between border-b-2"
                    onClick={() => {
                        navigate("/kyc");
                    }}
                >
                    <h2 className="text-lg">KYC</h2>
                    <AiOutlineRightCircle size={22} />
                </div>
                <div className="flex px-5 py-4 justify-between"
                        onClick={() => {
                            navigate("/account");
                        }}    
                    >
                    <h2 className="text-lg">Account Verification</h2>
                    <AiOutlineRightCircle size={22} />
                </div>
            </div>
        </>
    );
};

export default Payments;
