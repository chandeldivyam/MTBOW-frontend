import React from "react";
import { Space, Spin, Skeleton } from 'antd';

const Loading = () => {
    // return (
    //     <div className="flex justify-center mobile:w-[512px] w-screen mt-8">
    //         <div className="flex justify-center items-center h-screen">
    //             <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-[#dc5714] via-purple-400 to-[#dc5714] ">
    //                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full border-2 border-white"></div>
    //             </div>
    //         </div>
    //     </div>
    // );
    // return(
    //     <div className="flex justify-center mobile:w-[512px] w-screen mt-8">
    //         <div className="flex justify-center items-center h-screen">
    //             <Space size="middle">
    //                 <Spin size="large" />
    //             </Space>
    //         </div>
    //     </div>
    // )
    return(
        <div className="mobile:w-[512px] w-screen mt-8 px-10">
            <Skeleton avatar paragraph={{ rows: 4 }} active />
            <Skeleton avatar paragraph={{ rows: 4 }} active className="mt-10"/>
            <Skeleton avatar paragraph={{ rows: 4 }} active className="mt-10"/>
        </div>
    )
};

export default Loading;
