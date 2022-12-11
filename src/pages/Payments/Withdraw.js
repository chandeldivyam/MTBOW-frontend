import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../context";
import axios from "axios";
import Loading from "../Main/Loading";
import { Button, Form, Input, Select, Result, message,  Alert, Space  } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const Withdraw = () => {
    const [amount, setAmount] = useState("");
    const { authenticateUser, balance } = useGlobalContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [withdrawInfo, setWithdrawInfo] = useState("ACTIVE") //ACTIVE, PENDING, INACTIVE
    const [buttonLoading, setButtonLoading] = useState(false)
    const [form] = Form.useForm()
    const [apiResult, setApiResult] = useState(false)

    useEffect(() => {
        authenticateUser()
            .then((res) => {
                localStorage.setItem("user_id", res);
            })
            .catch((error) => {
                console.log(error);
                navigate("/login");
            });
        checkWithdrawStatus()
    }, []);

    const checkWithdrawStatus = async() => {
        const withdraw_info = await axios({
            method: "get",
            url: `https://api.mtbow.com/api/v1/payments/checkWithdrawal`,
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
        if(withdraw_info.data.success && withdraw_info.data.status === 'ACTIVE'){
            setIsLoading(false)
            return
        }
        if(withdraw_info.data.success && withdraw_info.data.status === 'WITHDRAW_PENDING'){
            setWithdrawInfo("WITHDRAW_PENDING")
            setAmount(withdraw_info.data.amount)
            setIsLoading(false)
            return
        }
        if(withdraw_info.data.status === 'UNVERIFIED_VPA' || withdraw_info.data.status === 'UNVERIFIED_PAN' || withdraw_info.data.status === 'NO_ENTRY'){
            setWithdrawInfo('INACTIVE')
            setIsLoading(false)
            return
        }
    }

    const generateWithdrawRequest = async(values) => {
        setButtonLoading(true)
        if(Number(values.amount) > Number(balance.winnings)){
            message.error({
                className: "mt-[50px] z-10",
                duration: 4,
                content: "Amount Entered can't be greater than Winnings",
                });
            setButtonLoading(false)
            return;
        }
        await axios({
            method: "post",
            url: "https://api.mtbow.com/api/v1/payments/withdraw",
            headers: {
                Authorization: localStorage.getItem("token"),
            },
            data: {
                amount: Number(values.amount.trim())
            }
        })
        .then((response) => {
            if(response.data.success === true){
                setAmount(values.amount.trim())
                setApiResult(true)
                setButtonLoading(false)
            }
        })
        .catch((error) => {
            message.error({
                className: "mt-[50px] z-10",
                duration: 4,
                content: error.data.message,
                });
            setButtonLoading(false)
            return;
        })
    }

    if(isLoading){
        return(<Loading />)
    }

    if(apiResult === true){
        return(
            <div className="mobile:w-[512px] w-screen px-10 py-4 pt-10">
                <Result
                    icon={<SmileOutlined />}
                    title="Withdrawal Request Successful"
                    subTitle={`The amount (₹${amount}) will be credited to your account within 3 hours`}
                />
            </div>
        )
    }

    if(withdrawInfo === 'ACTIVE'){
        return(
            <div className="mobile:w-[512px] w-screen px-10 py-4 pt-10">
                <div className="text-center text-2xl font-semibold mb-3">
                    Withdraw
                </div>
                <Form form={form} onFinish={generateWithdrawRequest} layout="vertical">
                    <Form.Item 
                        name="amount" 
                        label="Amount (in ₹)" 
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={buttonLoading}>
                            Submit
                        </Button>   
                    </Form.Item>
                </Form>
                <Alert
                    message="Withdrawal Time"
                    description={`Withdrawal Request is processed within 3 hours.`}
                    type="info"
                    showIcon
                    icon={
                        <Space direction="vertical" align="center">
                            <SmileOutlined />
                        </Space>
                    }
                />
            </div>
        )
    }

    if(withdrawInfo === 'WITHDRAW_PENDING'){
        return(
            <div className="mobile:w-[512px] w-screen px-10 py-4 pt-10">
            <Alert
                message="Withdrawal in Progress"
                description={`Previous withdrawal request of ₹${amount} is currently being processed. It will soon be deposited to your bank account`}
                type="success"
                showIcon
                icon={
                    <Space direction="vertical" align="center">
                        <SmileOutlined />
                    </Space>
                }
            />
        </div>
        )
    }

    return(
        <div className="mobile:w-[512px] w-screen px-10 py-4 pt-10">
            <Alert
                message="KYC Incomplete"
                description={`Please complete the Bank Account and Pan Verification`}
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
                            onClick={() => {
                                navigate("/account");
                            }}>
                            Bank Verification
                        </Button>
                        <Button
                            size="small"
                            type="primary"
                            onClick={() => {
                                navigate("/kyc");
                            }}>
                            Pan Verification
                        </Button>
                    </Space>
                }
            />
        </div>
    )
}

export default Withdraw