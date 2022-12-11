import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../context";
import axios from "axios";
import Loading from "../Main/Loading";
import { Button, Form, Input, Select, Result, message } from 'antd';
import { AiFillCheckCircle } from "react-icons/ai";

const AccountVerification = () => {
    const navigate = useNavigate();
    const [upi, setUpi] = useState("")
    const [name, setName] = useState("")
    const { authenticateUser } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(true);
    const [isVerified, setIsVerified] = useState(false)
    const [form] = Form.useForm()
    const [apiResult, setApiResult] = useState(false)
    const [buttonLoading, setButtonLoading] = useState(false)

    useEffect(() => {
        authenticateUser()
            .then((res) => {
                localStorage.setItem("user_id", res);
            })
            .catch((error) => {
                console.log(error);
                navigate("/login");
            });
        checkVPA()
    }, []);

    const checkVPA = async() => {
        const vpa_info = await axios({
            method: "get",
            url: `https://api.mtbow.com/api/v1/payments/checkVPA`,
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
        if(vpa_info.data.status === "VERIFIED"){
            setIsVerified(true)
            setUpi(vpa_info.data.upi_id)
            setName(vpa_info.data.upi_name)
        }
        setIsLoading(false);
    }

    const verifyVPA = async(values) => {
        setButtonLoading(true)
        if(!values.Name || !values["UPI Id"]) return 1
        await axios({
            method: "post",
            url: "https://api.mtbow.com/api/v1/payments/validateVPA",
            headers: {
                Authorization: localStorage.getItem("token"),
            },
            data: {
                vpa: values["UPI Id"].trim(),
                name: values.Name.trim()
            }
        })
        .then((verify_response) => {
            if(verify_response.data.success === true){
                setUpi(values["UPI Id"].trim())
                setName(values.Name.trim())
                setApiResult(true)
                setUpi(verify_response.data.vpa)
                setIsLoading(false)
            }
            if(verify_response.data.success === false){
                message.error({
                className: "mt-[30px] z-10",
                duration: 4,
                content: "Invalid UPI ID",
                });
                setButtonLoading(false)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    if (isLoading) {
        return <Loading />;
    }

    if(isVerified === false && apiResult === false){
        return(
            <div className="mobile:w-[512px] w-screen px-10 py-4 pt-10">
                <Form form={form} onFinish={verifyVPA} layout="vertical">
                    <Form.Item 
                        name="Name" 
                        label="Name" 
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="UPI Id" label="UPI" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={buttonLoading}>
                            Submit
                        </Button>   
                    </Form.Item>
                </Form>
            </div>
        )
    }

    if(apiResult === true){
        return(
            <div className="mobile:w-[512px] w-screen px-10 py-4 pt-10">
            <Result
                status="success"
                title="Successfully Verified UPI ID!"
                subTitle={`UPI ID: ${upi}`}
            />
            </div>
        )
    }

    return(
            <div className="mobile:w-[512px] w-screen px-10 py-4 pt-10">
                <Form form={form} onFinish={verifyVPA} layout="vertical" disabled={true}>
                    <Form.Item 
                        name="Name" 
                        label="Name"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder={name}/>
                    </Form.Item>
                    <Form.Item name="UPI Id" label="UPI" rules={[{ required: true }]}>
                        <Input placeholder={upi}/>
                    </Form.Item>
                </Form>
                <div className="flex items-center justify-center">
                    <AiFillCheckCircle size={28} className="fill-green-500 mr-1"/>
                    <div className="ml-1 items-center">Successfully Verified</div>
                </div>
            </div>
        )
}

export default AccountVerification;