import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import _ from "lodash";
import { Tabs } from "antd";
import Loading from "../../pages/Main/Loading";
import Countdown from "../teams/Countdown";
import VideoStats from "./VideoStats";
import Leaderboard from "./Leaderboard";

const MyTeam = ({myTeam, videoInfo, videoContestId, event_end_time}) => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [teamScore, setTeamScore] = useState({});
    const [scoreDistribution, setScoreDistribution] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [userRank, setUserRank] = useState("");
    const [showStats, setShowStats] = useState(true);

    const getLeaderboard = async () => {
        try {
            const leaderboard_data = await axios({
                method: "get",
                url: `https://api.mtbow.com/api/v1/videoteams/score/${videoContestId}`,
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            }).then((leaderboard_data) => {
                setLeaderboard(leaderboard_data.data["leaderboard"]);
                setTeamScore({
                    ...teamScore,
                    ...leaderboard_data.data["team_score_object"],
                });
                setUserRank(
                    leaderboard_data.data["leaderboard"].filter(
                        (item) =>
                            parseInt(item.user_id) ===
                            parseInt(localStorage.getItem("user_id"))
                    )[0]["rank"]
                );
                setScoreDistribution({
                    ...scoreDistribution,
                    ...leaderboard_data.data["score_distribution"]
                })
            })
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getLeaderboard();
        setIsLoading(false);
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            getLeaderboard();
        }, 15000);
        return () => clearInterval(interval);
    });

    const playerInfoMemo = useMemo(
        () =>
          myTeam.map((item) => {
            return videoInfo.filter((info) => info.video_id === item)[0];
          }),
        [myTeam, videoInfo]
      );

    if (isLoading) {
        return <Loading />;
    }

    const tabsItems = [
        {
          key: "1",
          label: "Stats",
          children: (
            <>
              <div className="flex justify-center">
                <h1 className="m-2.5 font-semibold py-2 px-4 rounded bg-[#dc5714] text-white">
                  Total Points: {_.sum(_.values(teamScore))}
                </h1>
                <h1 className="m-2.5 font-semibold py-2 px-4 rounded bg-[#dc5714] text-white">
                  Rank: {userRank}
                </h1>
              </div>
              <div className="grid grid-cols-1 gap-y-4">
                {playerInfoMemo.sort((a, b) => {
                        const totalPointsA =
                        a.extra_details["like_points"] +
                        a.extra_details["view_points"] +
                        a.extra_details["comment_points"];
                        const totalPointsB =
                        b.extra_details["like_points"] +
                        b.extra_details["view_points"] +
                        b.extra_details["comment_points"];
                        return totalPointsB - totalPointsA;
                    }).map((player) => {
                  const { video_thumbnail, video_title, video_id, extra_details } = player;
                  return (
                    <VideoStats
                      video_id={video_id}
                      video_title={video_title}
                      video_thumbnail={video_thumbnail}
                      like_points={extra_details["like_points"]}
                      view_points={extra_details["view_points"]}
                      comment_points={extra_details["comment_points"]}
                    />
                  );
                })}
              </div>
            </>
          ),
        },
        {
          key: "2",
          label: "Leaderboard",
          children: <Leaderboard contest_id={videoContestId} leaderboard={leaderboard} />,
        },
      ];

    return (
        <div>
        <div className="col-span-2">
            <Countdown event_end_time={event_end_time} />
        </div>
        <Tabs defaultActiveKey="1" items={tabsItems} centered/>
        </div>
    );
}

export default MyTeam;
