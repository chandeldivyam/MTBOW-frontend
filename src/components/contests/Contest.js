import React from "react";
import { Link } from "react-router-dom";

const Contest = ({ id, name, image_url }) => {
    return (
        <Link to={`/contestInfo/${id}`}>
            <div className="w-2px rounded  shadow-lg">
                <img className="max-w-xs" src={image_url} alt={name} />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{name}</div>
                </div>
            </div>
        </Link>
    );
};

export default Contest;
