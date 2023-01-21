import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import Navbar from "./Navbar";
import axios from "axios";
import Loading from "../Main/Loading";

const Login = () => {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [phoneRegexError, setPhoneRegexError] = useState(false);
    const [optRegexError, setOtpRegexError] = useState(false);
    const [badLoginRequest, setBadLoginRequest] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { authenticateUser } = useGlobalContext();

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

    let navigate = useNavigate();
    const requestOtp = async (e) => {
        e.preventDefault();
        if (!phone.match(/^\d{10}$/)) {
            setPhoneRegexError(true);
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
                console.log(error);
                setBadLoginRequest(true);
                return;
            });
    };
    const verifyOtp = async (e) => {
        e.preventDefault();
        if (!otp.match(/^\d{6}$/)) {
            setOtpRegexError(true);
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
                console.log("I am in the catch");
                console.log(error);
                setOtpRegexError(true);
            });
    };

    if (isLoading) {
        return <Loading />;
    }

    if (!isOtpSent) {
        return (
            <>
                <Navbar />
                <div className="flex justify-center mobile:w-[512px] w-screen mt-8">
                    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
                        <form onSubmit={requestOtp}>
                            <div className="flex flex-col">
                                <h2 className="font-bold text-xl">
                                    Enter your Phone Number
                                </h2>
                                <h2 className="text-slate-400 my-3">
                                    We will send an OTP
                                </h2>
                                <input
                                    type="text"
                                    placeholder="Phone number"
                                    className="my-1.5 px-5 py-2 bg-gray-50 rounded-xl"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                ></input>
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
            </>
        );
    }
    console.log(isOtpSent);
    return (
        <>
            <Navbar />
            <div className="flex justify-center mobile:w-[512px] w-screen mt-8">
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
        </>
    );
};

export default Login;
