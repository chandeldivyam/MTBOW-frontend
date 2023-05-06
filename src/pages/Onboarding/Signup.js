import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { message, Input, Statistic } from "antd"
import mtbow_logo from "../../Static/mtbow-logo.png";

const Signup = () => {
    let navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [referralCodeUsed, setReferralCodeUsed] = useState("")
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [phoneRegexError, setPhoneRegexError] = useState(false);
    const [nameRegexError, setNameRegexError] = useState(false);
    const [optRegexError, setOtpRegexError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [ resendOtpTime, setResendOtpTime ] = useState(null)
    const { Countdown } = Statistic;

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
        if (!name) {
            message.info({
                className: "mt-[100px] z-10",
                duration: 4,
                content: "Name can not be empty",
            })
            return;
        }
        axios({
            method: "post",
            url: "https://api.mtbow.com/api/v1/auth/register",
            data: {
                phone,
                name,
                referral_code_used: referralCodeUsed.trim()
            },
        })
            .then((response) => {
                localStorage.setItem("userId", response.data.data.userId);
                setIsOtpSent(true);
                setResendOtpTime(new Date().getTime() + 45000);
            })
            .catch((error) => {
                if(error.response.data.success === false){
                    message.info({
                        className: "mt-[100px] z-10",
                        duration: 4,
                        content: error.response.data.message,
                    });
                }
                setIsOtpSent(false);
                return
            });
    };
    const resendOtp = async (e) => {
        e.preventDefault();
        if (!phone.match(/^\d{10}$/)) {
            message.info({
                className: "mt-[100px] z-10",
                duration: 4,
                content: "Please enter a valid 10 digit phone number",
            })
            return;
        }
        if (!name) {
            message.info({
                className: "mt-[100px] z-10",
                duration: 4,
                content: "Name can not be empty",
            })
            return;
        }
        axios({
            method: "post",
            url: "https://api.mtbow.com/api/v1/auth/register",
            data: {
                phone,
                name,
                referral_code_used: referralCodeUsed.trim()
            },
        })
            .then((response) => {
                localStorage.setItem("userId", response.data.data.userId);
                setIsOtpSent(true);
                setResendOtpTime(new Date().getTime() + 60000)
                message.info({
                        className: "mt-[100px] z-10",
                        duration: 1,
                        content: "Please check your SMS section for OTP ",
                    });
            })
            .catch((error) => {
                if(error.response.data.success === false){
                    message.info({
                        className: "mt-[100px] z-10",
                        duration: 4,
                        content: error.response.data.message,
                    });
                }
                setIsOtpSent(false);
                return
            });
    };
    const verifyOtp = async (e) => {
        e.preventDefault();
        if (!otp.match(/^\d{6}$/)) {
            setOtpRegexError(true);
            message.info({
                className: "mt-[100px] z-10",
                duration: 4,
                content: "Please enter a six digit numeric OTP",
            })
            return
        }
        axios({
            method: "post",
            url: "https://api.mtbow.com/api/v1/auth/verifySignup",
            data: {
                otp: otp,
                userId: localStorage.getItem("userId"),
                referral_code_used: referralCodeUsed.trim()
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
                if(error.response.data.success === false){
                    message.info({
                        className: "mt-[100px] z-10",
                        duration: 4,
                        content: error.response.data.message,
                    });
                }
                setOtpRegexError(true);
            });
    };
    if(!isOtpSent){
        return(
            <div className="bg-gradient-to-b from-[#FFFFFF] to-[#F6E8EA] h-screen">
                <div className="flex justify-center mobile:w-[512px] w-screen mt-8 bg-slate-300"></div>
                <div className="grid grid-cols-1 gap-4 justify-items-center mb-5">
                    <img src={mtbow_logo} className="w-[70%] mobile:w-[50%]" alt="mtbow logo" />
                </div>
                <div className="flex justify-center mt-[75px]">
                    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
                        <form onSubmit={requestOtp}>
                            <div className="flex flex-col">
                                <Input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    className="my-2"
                                    onChange={(e) => setName(e.target.value)}
                                ></Input>
                            </div>
                            <div className="flex flex-col">
                                <Input
                                    type="text"
                                    placeholder="Phone Number"
                                    value={phone}
                                    className="my-2"
                                    addonBefore="+91"
                                    onChange={(e) => setPhone(e.target.value)}
                                ></Input>
                            </div>
                            <div className="flex flex-col">
                                <Input
                                    type="text"
                                    placeholder="Referral Code (Optional)"
                                    className="my-2"
                                    value={referralCodeUsed}
                                    onChange={(e) => setReferralCodeUsed(e.target.value)}
                                ></Input>
                            </div>
                            <div className="form-group mb-6">
                                <button
                                    onClick={requestOtp}
                                    type="submit"
                                    className="inline-block px-6 py-2.5 my-2.5 bg-[#dc5714] text-white font-medium text-xs leading-tight uppercase rounded shadow-md"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                        <p className="text-sm font-semibold mt-2 pt-1 mb-2">
                            Already have an account?
                            <button
                                onClick={() => {
                                    navigate("/login");
                                }}
                                className="text-[#dc5714] ml-3"
                            >
                                Login
                            </button>
                        </p>
                        <div
                            className={`${
                                nameRegexError
                                    ? "bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700"
                                    : "invisible"
                            }`}
                        >
                            Name can not be empty
                        </div>
                        <div
                            className={`${
                                phoneRegexError
                                    ? "bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700"
                                    : "invisible"
                            }`}
                        >
                            Please enter a valid phone number
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
            <div className="flex justify-center mt-[75px]">
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
                                    className="inline-block px-6 py-2.5 my-2.5 bg-[#dc5714] text-white font-medium text-xs leading-tight uppercase rounded shadow-md "
                                >
                                    Verify OTP
                                </button>
                            </div>
                            {
                                resendOtpTime && 
                                <div className="flex flex-col text-slate-400">
                                    <Countdown title="Resend OTP in" value={resendOtpTime} format="mm:ss" onFinish={() => setResendOtpTime(null)}/>
                                </div>
                            }
                            {
                                !resendOtpTime &&
                                <p>
                                    Didn't receive the OTP?{""}
                                    <button
                                        onClick={resendOtp}
                                        disabled={resendOtpTime}
                                        className={`${
                                        !resendOtpTime ? "text-[#dc5714]" : "text-gray-300"
                                        } ml-1`}
                                    >
                                        Resend
                                    </button>
                                </p>
                            }
                        </form>
                </div>
            </div>
        </div>
    )
};

export default Signup;
