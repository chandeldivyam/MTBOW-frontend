import React, { useState, useEffect } from "react";
import mtbow_logo from "../../Static/mtbow-logo2.svg";

const Navbar = () => {
    return (
        <div className="flex justify-center border-b-2 shadow-[0_0_5px_0_rgba(0,0,0,0.1)] mobile:w-[512px] w-[100%]">
            <img src={mtbow_logo} className="w-[50%]" alt="mtbow logo" />
        </div>
    );
};
export default Navbar;
