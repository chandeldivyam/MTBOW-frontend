import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../context";
import axios from "axios";
import Loading from "../Main/Loading";
import TransactionCard from "../../components/payments/TransactionCard";
import { GiConsoleController } from "react-icons/gi";

const Transactions = () => {
    let navigate = useNavigate();
    const { authenticateUser, balance } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(true);
    const [transactionData, setTransactionData] = useState([]);
    const getTransactions = async () => {
        const transactions = await axios({
            method: "get",
            url: `http://localhost:3005/api/v1/payments/transactions`,
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        console.log(transactions.data.length);
        if (transactions.data.length > 0) {
            setTransactionData([...transactions.data]);
            console.log(transactionData[0]);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        getTransactions();
    }, []);

    if (isLoading === true) {
        return <Loading />;
    }

    return (
        <>
            <div>
                <div className="mt-4 text-center text-2xl font-bold underline mobile:w-[512px] w-screen">
                    My Transactions
                </div>
                {transactionData.map((item) => {
                    console.log(item.transaction_id);
                    return (
                        <TransactionCard key={item.transaction_id} {...item} />
                    );
                })}
            </div>
        </>
    );
};

export default Transactions;
