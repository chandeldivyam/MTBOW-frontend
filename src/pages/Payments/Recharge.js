import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { cashfreeSandbox } from "cashfree-dropjs";
import axios from "axios";

const Recharge = () => {
    const [amount, setAmount] = useState("");
    const { authenticateUser, balance } = useGlobalContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [paymentStated, setPaymentStated] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("");
    const [amountError, setAmountError] = useState(false);

    let testCashfree = new cashfreeSandbox.Cashfree();
    let payment_div = document.getElementById("payment_div");

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
    }, []);

    const payment_success = async (res_data) => {
        if (res_data.order && res_data.order.status === "PAID") {
            const update_wallet = await axios({
                method: "POST",
                url: "https://api.mtbow.com/api/v1/payments/recharge/success",
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
                data: {
                    order_id: res_data.order.orderId,
                },
            });
            if (update_wallet.data.success) {
                setPaymentStatus("SUCCESS");
                navigate("/payments");
            }
        }
    };
    const payment_failure = async (res_data) => {
        const update_failed_status = await axios({
            method: "POST",
            url: "https://api.mtbow.com/api/v1/payments/recharge/failed",
            headers: {
                Authorization: localStorage.getItem("token"),
            },
            data: {
                order_id: res_data.order.orderId,
            },
        });
        setPaymentStatus("FAILED");
    };

    const requestPayment = async (e) => {
        e.preventDefault();
        if (!amount) {
            setAmountError(true);
            return;
        }
        setPaymentStated(true);
        setAmountError(false);
        const token_res = await axios({
            method: "POST",
            url: "https://api.mtbow.com/api/v1/payments/recharge",
            headers: {
                Authorization: localStorage.getItem("token"),
            },
            data: {
                amount: amount,
            },
        });
        testCashfree.initialiseDropin(payment_div, {
            orderToken: token_res.data.order_token,
            onSuccess: payment_success,
            onFailure: payment_failure,
            components: ["card", "upi", "netbanking"],
            style: {
                backgroundColor: "#ffffff",
                color: "#dc5714",
                fontFamily: "Lato",
                fontSize: "14px",
                errorColor: "#ff0000",
                theme: "light",
            },
        });
        setPaymentStatus("ACTIVE");
    };

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (paymentStatus === "FAILED") {
        return (
            <div className="flex flex-col items-center ">
                <div className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 text-center mobile:w-[512px] w-screen">
                    Payment failed
                </div>
                <button
                    onClick={() => {
                        navigate("/");
                    }}
                    className="text-white bg-[#dc5714] font-medium rounded-lg text-sm px-8 py-2.5 text-center items-center text-center"
                >
                    Home
                </button>
            </div>
        );
    }
    if (paymentStatus === "SUCCESS") {
        return (
            <h1>
                Payment Success, Please reload the page to update the balance
            </h1>
        );
    }
    return (
        <>
            <form
                className={
                    paymentStated ? "hidden" : "flex flex-col px-10 py-4"
                }
                onSubmit={requestPayment}
            >
                <label className="text-base pl-2 mb-4">
                    Enter Amount {`(in ₹)`}
                </label>
                <input
                    type="text"
                    placeholder="Enter Amount"
                    className="my-1.5 px-5 py-2 bg-gray-50 rounded-xl"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                ></input>
                <button
                    type="submit"
                    className="text-white bg-[#dc5714] font-medium rounded-lg text-sm px-3 py-2.5 my-4 text-center items-center text-center"
                >
                    Recharge
                </button>
            </form>
            <div
                className={`${
                    amountError
                        ? "bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700"
                        : "hidden"
                }`}
            >
                Please enter the amount
            </div>
            <div
                id="payment_div"
                className="mt-5 mobile:w-[512px] w-screen h-[80%]"
            ></div>
        </>
    );
};

export default Recharge;
