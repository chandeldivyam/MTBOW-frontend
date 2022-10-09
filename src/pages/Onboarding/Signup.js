import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    let navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [phoneRegexError, setPhoneRegexError] = useState(false);
    const [nameRegexError, setNameRegexError] = useState(false);
    const [optRegexError, setOtpRegexError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const requestOtp = async (e) => {
        e.preventDefault();
        if (!phone.match(/^\d{10}$/)) {
            setIsOtpSent(false);
            setPhoneRegexError(true);
            return;
        }
        if (!name) {
            setIsOtpSent(false);
            setNameRegexError(true);
            return;
        }
        axios({
            method: "post",
            url: "https://api.mtbow.com/api/v1/auth/register",
            data: {
                phone,
                name,
            },
        })
            .then((response) => {
                console.log(response);
                localStorage.setItem("userId", response.data.data.userId);
            })
            .catch((error) => {
                console.log(error);
            });
        setIsOtpSent(true);
    };
    const verifyOtp = async (e) => {
        e.preventDefault();
        if (!otp.match(/^\d{6}$/)) {
            setOtpRegexError(true);
        }
        axios({
            method: "post",
            url: "https://api.mtbow.com/api/v1/auth/verifySignup",
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
    if (!isOtpSent) {
        return (
            <div className="flex justify-center content-center">
                <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
                    <form onSubmit={requestOtp}>
                        <div className="flex flex-col">
                            <label className="my-1.5">Name</label>
                            <input
                                type="text"
                                placeholder="Harish Singh"
                                value={name}
                                className="my-1.5"
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </div>
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
                                onClick={requestOtp}
                                type="submit"
                                className="inline-block px-6 py-2.5 my-2.5 bg-[#dc5714] text-white font-medium text-xs leading-tight uppercase rounded shadow-md"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    <p class="text-sm font-semibold mt-2 pt-1 mb-2">
                        Already have an account?
                        <button
                            onClick={() => {
                                navigate("/login");
                            }}
                            class="text-[#dc5714] ml-3"
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
        );
    }
    return (
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
                        className="inline-block px-6 py-2.5 my-2.5 bg-[#dc5714] text-white font-medium text-xs leading-tight uppercase rounded shadow-md "
                    >
                        Verify OTP
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
