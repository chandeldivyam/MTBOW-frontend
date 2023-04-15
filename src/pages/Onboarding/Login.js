import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import Navbar from "./Navbar";
import axios from "axios";
import Loading from "../Main/Loading";
import c_1 from "../../Static/onboarding/c1_new.png"
import c_2 from "../../Static/onboarding/c2_new.png"
import c_3 from "../../Static/onboarding/c3_new.png"
import mtbow_logo from "../../Static/mtbow-logo.png";
import { Carousel, Space, Button, message, Input } from 'antd';

const Login = () => {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [phoneRegexError, setPhoneRegexError] = useState(false);
    const [optRegexError, setOtpRegexError] = useState(false);
    const [badLoginRequest, setBadLoginRequest] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [genericPage, setGenericPage] = useState(true)
    const { authenticateUser, deferredInstallEvent } = useGlobalContext();

    useEffect(() => {
        authenticateUser()
            .then((res) => {
                setIsLoading(false);
                navigate("/");
            })
            .catch((err) => {
                setIsLoading(false);
            });
    }, []);

    const installPrompt = async () => {
        deferredInstallEvent.prompt()
        const { outcome } = await deferredInstallEvent.userChoice;
        if (outcome === 'accepted') {
            console.log('User accepted the install prompt.');
        } else if (outcome === 'dismissed') {
            console.log('User dismissed the install prompt');
        }
    }

    let navigate = useNavigate();
    const requestOtp = async (e) => {
        e.preventDefault();
        if (!phone.match(/^\d{10}$/)) {
            message.info({
                className: "mt-[100px] z-10",
                duration: 4,
                content: "Please enter a valid 10 digit phone number",
            })
            return;
        }
        axios({
            method: "post",
            url: "https://api.mtbow.com/api/v1/auth/login",
            data: {
                phone,
            },
        })
            .then((response) => {
                localStorage.setItem("userId", response.data.data.userId);
                setPhoneRegexError(false);
                setIsOtpSent(!isOtpSent);
            })
            .catch((error) => {
                message.info({
                    className: "mt-[100px] z-10",
                    duration: 4,
                    content: "The User does not exist. Please sign up!",
                })
                return;
            });
    };
    const verifyOtp = async (e) => {
        e.preventDefault();
        if (!otp.match(/^\d{6}$/)) {
            message.info({
                className: "mt-[100px] z-10",
                duration: 4,
                content: "Please enter Valid OTP",
            })
        }
        axios({
            method: "post",
            url: "https://api.mtbow.com/api/v1/auth/verifyLogin",
            data: {
                otp: otp,
                userId: localStorage.getItem("userId"),
            },
        })
            .then((response) => {
                setOtpRegexError(false);
                localStorage.setItem(
                    "token",
                    `Bearer ${response.data.data.token}`
                );
                console.log(response);
                navigate("/");
            })
            .catch((error) => {
                message.info({
                    className: "mt-[100px] z-10",
                    duration: 4,
                    content: "Please enter Valid OTP",
                })
            });
    };

    if (isLoading) {
        return <Loading />;
    }

    if(genericPage){
        return(
        <div className="bg-gradient-to-b from-[#FFFFFF] to-[#F6E8EA] h-screen">
            <div className="flex justify-center mobile:w-[512px] w-screen mt-8 bg-slate-300">
            </div>
            <div className="grid grid-cols-1 gap-4 justify-items-center mb-5">
                <img src={mtbow_logo} className="w-[50%]" alt="mtbow logo" />
            </div>
            <Carousel autoplay={true} dots={false} className="h-3/10">
                <div className="grid grid-cols-1 mt-2 justify-items-center">
                    <img src={c_1} className="max-h-[350px]"/>
                </div>
                <div className="grid grid-cols-1 px-4 justify-items-center">
                    <img src={c_2} className="max-h-[350px]"/>
                </div>
                <div className="grid grid-cols-1 pl-3 pr-2 justify-items-center">
                    <img src={c_3} className="max-h-[350px]"/>
                </div>
            </Carousel>
            <div className="grid grid-cols-1 justify-items-center mt-6">
                <h2 className="text-2xl font-bold">Welcome to MTBOW</h2>
                <h3>Pridict the virality of videos and win money</h3>
                <div className="flex justify-around w-[50%]">
                    <Button 
                        className="bg-[#000000] text-white mt-3 min-h-[50px]"
                        onClick={() => navigate("/signup")}
                    >
                        REGISTER
                    </Button>
                    <Button
                        className="bg-[#000000] text-white mt-3 min-h-[50px]"
                        onClick={() => setGenericPage(false)}
                    >
                        LOGIN
                    </Button>
                </div>
                {deferredInstallEvent && <div className="flex justify-around w-[50%] mt-1">
                    <Button
                        className="bg-[#000000] text-white min-h-[50px]"
                        onClick={() => installPrompt()}
                    >
                        <span className="align-middle">INSTALL</span>
                    </Button>
                </div>}
            </div>
            <div className="flex justify-between mt-6 mx-3">
                <div className="grid grid-cols-1 justify-items-start">
                    <h3>Invited by a friend?</h3>
                    <button className="font-bold" onClick={() => navigate("/signup")}>Enter Code</button>
                </div>
                <div className="grid grid-cols-1 justify-items-end">
                    <h3>Already a user?</h3>
                    <button className="font-bold" onClick={() => setGenericPage(false)}>Login</button>
                </div>
            </div>
        </div>
        )
    }
    if(!isOtpSent){
        return(
            <div className="bg-gradient-to-b from-[#FFFFFF] to-[#F6E8EA] h-screen">
                <div className="flex justify-center mobile:w-[512px] w-screen mt-8 bg-slate-300"></div>
                <div className="grid grid-cols-1 gap-4 justify-items-center mb-5">
                    <img src={mtbow_logo} className="w-[70%] mobile:w-[50%]" alt="mtbow logo" />
                </div>
                <div className="flex justify-center">
                    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md mt-[50px]">
                        <form onSubmit={requestOtp}>
                            <div className="flex flex-col">
                                <h2 className="font-bold text-xl">
                                    Enter your Phone Number
                                </h2>
                                <h2 className="text-slate-400 my-3">
                                    We will send an OTP
                                </h2>
                                <Input
                                    type="text"
                                    placeholder="Phone number"
                                    addonBefore="+91"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                ></Input>
                            </div>
                            <div className="form-group mb-6">
                                <button
                                    type="submit"
                                    className="inline-block px-6 py-2.5 my-2.5 bg-[#dc5714] text-white font-medium text-xs leading-tight uppercase rounded shadow-md"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                        <p className="text-sm font-semibold mt-2 pt-1 mb-2">
                            Don't have an account?
                            <button
                                onClick={() => {
                                    navigate("/signup");
                                }}
                                className="text-[#dc5714] ml-3"
                            >
                                Register
                            </button>
                        </p>
                        <div
                            className={`${
                                phoneRegexError
                                    ? "bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700"
                                    : "invisible"
                            }`}
                        >
                            Please enter a valid 10 digit phone number
                        </div>
                        <div
                            className={`${
                                badLoginRequest
                                    ? "bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700"
                                    : "invisible"
                            }`}
                        >
                            The User does not exist. Please sign up
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return(
        <div className="bg-gradient-to-b from-[#FFFFFF] to-[#F6E8EA] h-screen">
            <div className="flex justify-center mobile:w-[512px] w-screen mt-8 bg-slate-300"></div>
            <div className="grid grid-cols-1 gap-4 justify-items-center mb-5">
                <img src={mtbow_logo} className="w-[70%] mobile:w-[50%]" alt="mtbow logo" />
            </div>
            <div className="flex justify-center mt-[40px]">
                <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
                    <form>
                        <div className="flex flex-col">
                            <h2 className="font-bold text-xl">
                                Verify Phone Number
                            </h2>
                            <h2 className="text-slate-400 my-3">
                                OTP has been sent to +91-{phone}
                            </h2>
                            <input
                                type="text"
                                placeholder="XXXXXX"
                                value={otp}
                                className="my-1.5 px-5 py-2 bg-gray-50 rounded-xl"
                                onChange={(e) => setOtp(e.target.value)}
                            ></input>
                        </div>
                        <div className="form-group mb-6">
                            <button
                                onClick={verifyOtp}
                                type="submit"
                                className="inline-block px-6 py-2.5 my-2.5 bg-[#dc5714] text-white font-medium text-xs leading-tight uppercase rounded"
                            >
                                Verify OTP
                            </button>
                        </div>
                    </form>
                    <div
                        className={`${
                            optRegexError
                                ? "bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700"
                                : "invisible"
                        }`}
                    >
                        Please enter Valid OTP
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;
