import React from 'react';
import { Divider, Table } from 'antd';
import { rewards_columns, rewards_data, contest_points_columns, contest_points_data } from '../../Static/data';

const Rules = () => {
    return (
        <div className="mobile:w-[512px] w-screen text-slate-400 pb-[99px] px-6">
            <h1 className="text-xl font-semibold mb-5 text-center mt-2">How to Play</h1>
            <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/LnT8v0WxbKk"
                title="How to Play"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            <Divider>Scoring</Divider>
            <Table
                className="ml-5 mr-2"
                columns={contest_points_columns}
                pagination={false}
                dataSource={contest_points_data}
            />
            <Divider>Rewards</Divider>
            <Table
                className="ml-5 mr-2 mb-8"
                columns={rewards_columns}
                pagination={false}
                dataSource={rewards_data}
            />
        </div>
    );
};

export default Rules;
