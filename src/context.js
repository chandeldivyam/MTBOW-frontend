import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const authenticateUser = async () => {
        var config = {
            method: "get",
            url: "http://localhost:3005/api/v1/auth/me",
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        };
        const user_details = await axios(config);
        return user_details.data.data.user_id_mongo;
    };

    return (
        <AppContext.Provider value={{ authenticateUser }}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
