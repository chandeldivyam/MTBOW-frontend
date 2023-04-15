import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [balance, setBalance] = useState({});
    const [deferredInstallEvent, setDeferredInstallEvent] = useState(null)
    const getBalance = async () => {
        if(!localStorage.getItem("token")) return
        const fetchBalance = await axios({
            method: "get",
            url: "https://api.mtbow.com/api/v1/wallet/balance",
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        setBalance({ ...balance, ...fetchBalance.data });
    };
    const authenticateUser = async () => {
        if(!localStorage.getItem("token")) throw new Error("Auth Token not present")
        var config = {
            method: "get",
            url: "https://api.mtbow.com/api/v1/auth/me",
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        };
        const user_details = await axios(config);
        return user_details.data.data.user_id_mongo;
    };
    useEffect(() => {
        getBalance();
    }, []);
    return (
        <AppContext.Provider value={{ authenticateUser, balance, getBalance, setBalance, setDeferredInstallEvent, deferredInstallEvent }}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
