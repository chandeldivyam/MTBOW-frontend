import React from "react";
import { Avatar } from "antd";
import { TiTickOutline } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { AiFillExclamationCircle } from "react-icons/ai";

const TransactionCard = ({
    recharge_status,
    recharge_amount,
    created_at,
    transaction_id,
}) => {
    if (recharge_status === "PAYMENT_SUCCESS") {
        return (
            <div className="flex border-2 border-gray-200 m-2.5 p-2 justify-between items-center">
                <div className="flex items-center">
                    <TiTickOutline size={36} className="fill-green-400 ml-1" />
                    <div className="flex flex-col ml-6">
                        <h2 className="text-xs text-gray-500">
                            Payment Success: {transaction_id}
                        </h2>
                        <h2 className="items-center">
                            {new Date(created_at).toLocaleString()}
                        </h2>
                    </div>
                </div>
                <div className="mr-2 text-xl">₹{recharge_amount}</div>
            </div>
        );
    } else if (
        recharge_status === "PAYMENT_PENDING" ||
        recharge_status === "ACTIVE"
    ) {
        return (
            <div className="flex border-2 border-gray-200 m-2.5 p-2 justify-between items-center">
                <div className="flex items-center">
                    <AiFillExclamationCircle
                        size={30}
                        className="fill-yellow-400 ml-1"
                    />
                    <div className="flex flex-col ml-6">
                        <h2 className="text-xs text-gray-500">
                            Payment Pending: {transaction_id}
                        </h2>
                        <h2 className="items-center">
                            {new Date(created_at).toLocaleString()}
                        </h2>
                    </div>
                </div>
                <div className="mr-2 text-xl">₹{recharge_amount}</div>
            </div>
        );
    } else {
        return (
            <div className="flex border-2 border-gray-200 m-2.5 p-2 justify-between items-center">
                <div className="flex items-center">
                    <ImCross size={22} className="fill-red-400 ml-1" />
                    <div className="flex flex-col ml-6">
                        <h2 className="text-xs text-gray-500">
                            Payment Failed: {transaction_id}
                        </h2>
                        <h2 className="items-center">
                            {new Date(created_at).toLocaleString()}
                        </h2>
                    </div>
                </div>
                <div className="mr-2 text-xl">₹{recharge_amount}</div>
            </div>
        );
    }
};

export default TransactionCard;
