import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import {Card, Avatar} from "antd"
import { GiftOutlined, CrownOutlined, BronzeOutlined } from "@ant-design/icons";
import { GiTargetPrize, GiSandsOfTime, GiMoneyStack } from "react-icons/gi";

const SilverOutlined = ({ className, style }) => (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* SVG path for your custom icon */}
    </svg>
  );

const VideoContest = ({ id, name, image_url, event_start_time, participation_fee, prize_pool }) => {
    const firstPrize = (0.3 * Number(prize_pool));
    const secondPrize = (0.175 * Number(prize_pool));
    const thirdPrize = (0.1 * Number(prize_pool));
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
                    <div className="text-sm col-span-2 text-slate-800 font-semibold">
                        {name}
                    </div>
                    <div className="col-span-1 row-span-2 font-medium rounded-lg text-sm px-2 text-center flex flex-col items-center">
                        <div className="flex items-center text-black">
                            <GiMoneyStack className="mr-2" style={{ color: '#85BB65' }}/>
                            <div>₹{prize_pool * 0.3}</div>
                        </div>
                        <div className="flex items-center text-black">
                            <GiMoneyStack className="mr-2" style={{ color: '#85BB65' }}/>
                            <div>₹{prize_pool * 0.15}</div>
                        </div>
                        <div className="flex items-center text-black">
                            <GiMoneyStack className="mr-2" style={{ color: '#85BB65' }}/>
                            <div>₹{prize_pool * 0.1}</div>
                        </div>
                    </div>
                    <div className="text-center col-span-2 flex items-center">
                        <GiSandsOfTime />
                        <div className="text-gray-500 ml-1">
                            {Date.now() < Date.parse(event_start_time)
                                ? `Starting ${moment(event_start_time).fromNow()}`
                                : `LIVE`}
                        </div>
                    </div>
                    <div className="text-[#FFFFFF] col-span-4 bg-gradient-to-br from-pink-500 to-orange-400 font-medium rounded-lg text-sm px-2 py-2 text-center flex items-center justify-center">
                        <span>Join ₹{participation_fee}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
};

export default VideoContest;