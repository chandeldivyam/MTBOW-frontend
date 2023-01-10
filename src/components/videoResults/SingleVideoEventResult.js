import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Card } from 'antd';

export const SingleVideoEventResult = ({ id, name, image_url }) => {
    const { Meta } = Card;
    return (
        <Link className="max-w-[75%]" to={`/videoContestResult/${id}`}>
            <Card className="w-[75vw] mobile:w-[300px]">
                <Meta
                avatar={<Avatar src={image_url} />}
                description={name}
                />
                <div className="text-white mt-4 bg-gradient-to-br from-pink-500 to-orange-400 font-medium rounded-lg text-sm px-2 py-2 text-center">
                        Check
                    </div>
            </Card>
        </Link>
    );
};