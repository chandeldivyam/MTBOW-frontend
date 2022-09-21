import React from "react";
import { Link } from "react-router-dom";

const Contest = ({ id, name, image_url }) => {
    return (
        <Link className="max-w-[75%]" to={`/contestInfo/${id}`}>
            <div className="rounded shadow-lg">
                <img src={image_url} alt={name} />
                <div className="px-6 py-4">
                    <div className="mb-2">{name}</div>
                </div>
            </div>
        </Link>
    );
};

export default Contest;
