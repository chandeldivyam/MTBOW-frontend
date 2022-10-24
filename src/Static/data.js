export const contest_points_columns = [
    {
        title: "Type",
        dataIndex: "type",
        key: "type",
    },
    {
        title: "Change",
        dataIndex: "change",
        key: "change",
    },
    {
        title: "Points",
        dataIndex: "points",
        key: "points",
    },
];

export const contest_points_data = [
    {
        key: "1",
        type: "Views",
        change: "+10",
        points: "+1",
    },
    {
        key: "1",
        type: "Views",
        change: "-10",
        points: "-1",
    },
    {
        key: "2",
        type: "Likes",
        change: "+1",
        points: "+1",
    },
    {
        key: "2",
        type: "Likes",
        change: "-1",
        points: "-1",
    },
    {
        key: "3",
        type: "Comments",
        change: "+1",
        points: "+2",
    },
    {
        key: "3",
        type: "Comments",
        change: "-1",
        points: "-2",
    },
];

export const rewards_columns = [
    {
        title: "Rank",
        dataIndex: "rank",
        key: "rank",
    },
    {
        title: "Winning",
        dataIndex: "winning",
        key: "winning",
    },
];

export const rewards_data = [
    {
        key: "1",
        rank: "#1",
        winning: "40% of total pool",
    },
    {
        key: "2",
        rank: "#2",
        winning: "20% of total pool",
    },
    {
        key: "3",
        rank: "Top 50 percentile",
        winning: "40% of total pool distributed equally",
    },
];
