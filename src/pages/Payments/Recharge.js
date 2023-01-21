import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../context";
import axios from "axios";
import Loading from "../Main/Loading";
import { Alert, Button, Space } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const Recharge = () => {
    const [amount, setAmount] = useState("");
    const { authenticateUser } = useGlobalContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [paymentStated, setPaymentStated] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("");
    const [amountError, setAmountError] = useState(false);

    let testCashfree = {};
    let payment_div = document.getElementById("payment_div");

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const requestPayment = async (e) => {
        e.preventDefault();
        if (!amount) {
            setAmountError(true);
            return;
        }
        setPaymentStated(true);
        setAmountError(false);
        const redirection_url = await axios({
            method: "POST",
            url: `https://api.mtbow.com/api/v1/payments/recharge`,
            data: { amount: parseInt(amount) },
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        window.location.href = redirection_url.data.redirect_url;
    };

    if (isLoading) {
        return <Loading />;
    }
    return (
        <>
            <form
                className={
                    paymentStated ? "hidden" : "flex flex-col px-10 py-4"
                }
                onSubmit={requestPayment}>
                <label className="text-base pl-2 mb-4">
                    Enter Amount {`(in ₹)`}
                </label>
                <input
                    type="text"
                    placeholder="Enter Amount"
                    className="my-1.5 px-5 py-2 bg-gray-50 rounded-xl"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}></input>
                <button
                    type="submit"
                    className="text-white bg-[#dc5714] font-medium rounded-lg text-sm px-3 py-2.5 my-4 text-center items-center text-center">
                    Recharge
                </button>
            </form>
            <div
                className={`${
                    amountError
                        ? "bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700"
                        : "hidden"
                }`}>
                Please enter the amount
            </div>
            <Alert
                message="Initiate Refund"
                description={`Please email the transaction ID to admin@mtbow.com. The transaction ID is available in "Transactions" page.`}
                type="info"
                showIcon
                icon={
                    <Space direction="vertical" align="center">
                        <SmileOutlined />
                    </Space>
                }
                action={
                    <Space direction="vertical">
                        <Button
                            size="small"
                            type="primary"
                            onClick={() =>
                                (window.location = "mailto:admin@mtbow.com")
                            }>
                            Email
                        </Button>
                        <Button
                            size="small"
                            type="primary"
                            onClick={() => {
                                navigate("/transactions");
                            }}>
                            Transactions
                        </Button>
                    </Space>
                }
            />
        </>
    );
};

export default Recharge;
