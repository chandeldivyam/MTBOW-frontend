import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../context";
import axios from "axios";
import Loading from "../Main/Loading";
import { Button, Form, Input, Select, Result, message } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const PanKyc = () => {
    const navigate = useNavigate();
    const [pan, setPan] = useState("")
    const [name, setName] = useState("")
    const { authenticateUser } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(true);
    const [verificationStatus, setverificationStatus] = useState("UNVERIFIED")
    const [form] = Form.useForm()
    const [buttonLoading, setButtonLoading] = useState(false)
    const [apiResult, setApiResult] = useState(false)

    useEffect(() => {
        checkPan()
    }, []);

    const checkPan = async() => {
        const pan_info = await axios({
            method: "get",
            url: `https://api.mtbow.com/api/v1/payments/checkPan`,
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        })
        if(!pan_info.data.status) return
        if(pan_info.data.status === "VERIFIED"){
            setverificationStatus("VERIFIED")
            setPan(pan_info.data.pan_number)
        }
        if(pan_info.data.status === "UNVERIFIED"){
            setverificationStatus("UNVERIFIED")
        }
        if(pan_info.data.status === "PENDING"){
            setverificationStatus("PENDING")
        }
        setIsLoading(false)
    }

    const verifyPan = async(values) => {
        setButtonLoading(true)
        if(!values.name || !values.pan_number) return
        var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
        if (!regex.test(values.pan_number.toUpperCase())) {
            message.error({
                className: "mt-[50px] z-10",
                duration: 4,
                content: "Invalid Pan Number",
                });
            setButtonLoading(false)
            return;
        }
        await axios({
            method: "post",
            url: "https://api.mtbow.com/api/v1/payments/validatePan",
            headers: {
                Authorization: localStorage.getItem("token"),
            },
            data: {
                pan: values.pan_number.trim(),
                name: values.name.trim()
            }
        })
        .then((verify_response) => {
            if(verify_response.data.success === true && verify_response.data.status === "PENDING"){
                setApiResult(true)
            }
        })
        .catch((error) => {
            console.log(error)
        }) 
        setButtonLoading(false)
    }

    if (isLoading) {
        return <Loading />;
    }

    if(apiResult === true || verificationStatus === "PENDING"){
        return(
            <div className="mobile:w-[512px] w-screen px-10 py-4 pt-10">
                <Result
                    icon={<SmileOutlined />}
                    title="We are verifying the PAN Details"
                    subTitle={`The process will be completed within 24 hours`}
                />
            </div>
        )
    }

    if(verificationStatus === "UNVERIFIED"){
        return(
            <div className="mobile:w-[512px] w-screen px-10 py-4 pt-10">
                <Form form={form} onFinish={verifyPan} layout="vertical">
                    <Form.Item 
                        name="name" 
                        label="Full Name" 
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="pan_number" label="Pan Number" rules={[{ required: true }]}>
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

    return(
        <div className="mobile:w-[512px] w-screen px-10 py-4 pt-10">
            <Result
                status="success"
                title="Successfully Verified Pan Card"
                subTitle={`PAN NUMBER: ${pan}`}
            />
        </div>
    )

    // return (
    //     <>
    //         <form
    //             className="flex flex-col px-10 py-4 mobile:w-[512px] w-screen"
    //             onSubmit={requestKyc}
    //         >
    //             <label className="text-base pl-2 mb-4">
    //                 Submit Pan Details
    //             </label>
    //             <input
    //                 type="text"
    //                 placeholder="Pan Number"
    //                 className="my-1.5 px-5 py-2 bg-gray-50 rounded-xl"
    //                 value={pan}
    //                 onChange={(e) => setPan(e.target.value)}
    //             ></input>
    //             <input
    //                 type="text"
    //                 placeholder="First Name"
    //                 className="my-1.5 px-5 py-2 bg-gray-50 rounded-xl"
    //                 value={panFirstName}
    //                 onChange={(e) => setPanFirstName(e.target.value)}
    //             ></input>
    //             <input
    //                 type="text"
    //                 placeholder="Last Name"
    //                 className="my-1.5 px-5 py-2 bg-gray-50 rounded-xl"
    //                 value={panLastName}
    //                 onChange={(e) => setPanLastName(e.target.value)}
    //             ></input>
    //             <button
    //                 type="submit"
    //                 className="text-white bg-[#dc5714] font-medium rounded-lg text-sm px-3 py-2.5 my-4 text-center items-center text-center"
    //             >
    //                 Verify
    //             </button>
    //         </form>
    //     </>
    // );
}

export default PanKyc;