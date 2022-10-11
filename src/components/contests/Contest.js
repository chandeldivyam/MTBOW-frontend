import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { GiSandsOfTime } from "react-icons/gi";

const Contest = ({ id, name, image_url, event_start_time }) => {
    return (
        <Link className="max-w-[75%]" to={`/contestInfo/${id}`}>
            <div className="rounded shadow-lg">
                <img src={image_url} alt={name} />
                <div className="px-6 pt-4 font-semibold text-l">
                    <div className="mb-2">{name}</div>
                </div>
                <div className="px-6 pb-4 text-center flex items-center">
                    <GiSandsOfTime />
                    <div className="text-gray-500 ml-1">
                        {Date.now() < Date.parse(event_start_time)
                            ? `Starting ${moment(event_start_time).fromNow()}`
                            : `LIVE`}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Contest;
