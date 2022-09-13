import react from "react";

export const ContestWaiting = ({ myTeam, creatorsInfo }) => {
    return (
        <div>
            <h1 className="text-center m-2.5 text-lg font-bold">My TEAM</h1>
            <div className="grid grid-cols-2 justify-items-center">
                {myTeam.map((item) => {
                    const player_info = creatorsInfo.filter(
                        (info) => info.browser_id === item
                    );
                    const { channel_image, channel_name } = player_info[0];

                    return (
                        <div className="max-w-sm flex flex-col justify-center border m-2.5 p-2.5">
                            <div className="flex justify-center">
                                <div className="w-6/12 sm:w-4/12 px-4">
                                    <img
                                        className="shadow rounded-full max-w-full h-auto align-middle border-none"
                                        src={channel_image}
                                        alt={channel_name}
                                    />
                                </div>
                            </div>
                            <h2 className="text-center">{channel_name}</h2>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
