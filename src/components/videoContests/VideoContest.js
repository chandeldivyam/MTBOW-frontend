import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import {Card, Avatar} from "antd"
import { GiTargetPrize, GiSandsOfTime } from "react-icons/gi";
const VideoContest = ({ id, name, image_url, event_start_time, participation_fee }) => {
    const { Meta } = Card
    // return (
    //     <Link className="max-w-[75%]" to={`/videoContestInfo/${id}`}>
    //         <div className="rounded shadow-lg">
    //             <img src={image_url} alt={name} />
    //             <div className="px-6 pt-4 font-semibold text-l">
    //                 <div className="mb-2">{name}</div>
    //             </div>
    //             <div className="px-6 pb-4 text-center flex items-center">
    //                 <GiSandsOfTime />
    //                 <div className="text-gray-500 ml-1">
    //                     {Date.now() < Date.parse(event_start_time)
    //                         ? `Starting ${moment(event_start_time).fromNow()}`
    //                         : `LIVE`}
    //                 </div>
    //             </div>
    //         </div>
    //     </Link>
    // );
    return(
        <Link className="p-2 smobile:p-5 max-w-[100%] smobile:w-[100%]" to={`/videoContestInfo/${id}`}>
            <div className="rounded shadow-lg">
                <div className="grid grid-cols-4 gap-[5px] px-2 py-1">
                    <div className={Number(participation_fee) === 0 ? "col-span-4 bg-green-200 text-center text-green-600" : "hidden"}>Free to Play</div>
                    <img 
                        className="row-span-2 col-span-1 rounded-full h-[60px] w-[60px]" 
                        src={image_url} 
                        alt={name} 
                    />
                    <div className="text-sm col-span-3 text-slate-800 font-semibold">
                        {name}
                    </div>
                    <div className="text-center col-span-3 flex items-center">
                        <GiSandsOfTime />
                        <div className="text-gray-500 ml-1">
                            {Date.now() < Date.parse(event_start_time)
                                ? `Starting ${moment(event_start_time).fromNow()}`
                                : `LIVE`}
                        </div>
                    </div>  
                    <div class="text-white col-span-4 bg-gradient-to-br from-pink-500 to-orange-400 font-medium rounded-lg text-sm px-2 py-2 text-center">
                        Participate
                    </div>
                </div>
            </div>
        </Link>
    )
};

export default VideoContest;