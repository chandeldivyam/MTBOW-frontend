import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { trackPageView } from "./gaHelper";

const ProtectedRoute = ({ path, children }) => {
    const { authenticateUser } = useGlobalContext();

    let navigate = useNavigate();
    useEffect(() => {
        authenticateUser()
            .then((res) => {
                localStorage.setItem("user_id", res);
            })
            .catch((error) => {
                console.log(error);
                navigate("/login");
            });
        if(localStorage.getItem("user_id") && path){
            trackPageView(localStorage.getItem("user_id"), path)
        }
    }, [children]);
    return children
}

export default ProtectedRoute
