import react from "react";

import { Statistic } from 'antd';
import { isCompositeComponent } from "react-dom/test-utils";

export const VideoContestWaiting = ({myTeam, videoInfo}) => {
    const {Countdown} = Statistic

    const handleCountdownFinish = () => {
        window.location.reload();
    };

    return(
        <div className="flex justify-center min-h-screen mobile:w-[512px] w-screen">
            <div className="flex flex-col max-w-lg bg-white pb-3 justify-center justify-items-center">
                <div>
                    <div className="grid grid-cols-2 justify-items-center">
                    <Countdown className="mt-3 col-span-2" onFinish={handleCountdownFinish} title="Starting in:" value={new Date(videoInfo[0].event_start_time)} />
                        {myTeam.map((item) => {
                            const player_info = videoInfo.filter((info) => info.video_id === item)
                            const {video_thumbnail, video_title} = player_info[0]
                            return(
                                <div className="max-w-sm flex flex-col justify-center border m-2.5 p-2.5">
                                    <div className="flex justify-center">
                                        <div className="w-6/12 sm:w-4/12 px-4">
                                            <img
                                                className="w-[100%] h-auto align-middle border-none mb-2"
                                                src={video_thumbnail}
                                                alt={video_title}
                                            />
                                        </div>
                                    </div>
                                    <h2 className="text-center text-xs">
                                        {video_title}
                                    </h2>
                                </div>
                            )
                        })}
                    </div>  
                </div>
            </div>
        </div>
    )
}