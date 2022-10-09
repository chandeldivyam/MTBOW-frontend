import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import axios from "axios";

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
        return <h1>Loading...</h1>;
    }

    if (!isOtpSent) {
        return (
            <div className="flex justify-center">
                <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
                    <form onSubmit={requestOtp}>
                        <div className="flex flex-col">
                            <label className="my-1.5">Phone Number</label>
                            <input
                                type="text"
                                placeholder="9826098260"
                                className="my-1.5"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            ></input>
                        </div>
                        <div className="form-group mb-6">
                            <button
                                type="submit"
                                className="inline-block px-6 py-2.5 my-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                            >
                                Login
                            </button>
                        </div>
                    </form>
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
        );
    }
    console.log(isOtpSent);
    return (
        <div className="flex justify-center">
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
                <form>
                    <div className="flex flex-col">
                        <label className="my-1.5">Enter OTP</label>
                        <input
                            type="text"
                            placeholder="XXXXXX"
                            value={otp}
                            className="my-1.5"
                            onChange={(e) => setOtp(e.target.value)}
                        ></input>
                    </div>
                    <div className="form-group mb-6">
                        <button
                            onClick={verifyOtp}
                            type="submit"
                            className="inline-block px-6 py-2.5 my-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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
    );
};

export default Login;
