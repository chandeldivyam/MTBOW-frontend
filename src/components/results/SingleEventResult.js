import React from "react";
import { Link } from "react-router-dom";

export const SingleEventResult = ({ id, name, image_url }) => {
    return (
        <Link className="max-w-[75%]" to={`/contestResult/${id}`}>
            <div className="rounded  shadow-lg">
                <img src={image_url} alt={name} />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{name}</div>
                </div>
            </div>
        </Link>
    );
};
