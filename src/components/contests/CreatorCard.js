import React from "react";

const CreatorCard = ({
    id,
    channel_name,
    channel_image,
    browser_id,
    channel_url,
    addToTeam,
    removeFromTeam,
    myTeam,
}) => {
    const onClickHandler = () => {
        if (!myTeam.includes(browser_id)) {
            addToTeam(browser_id);
            return;
        }
        removeFromTeam(browser_id);
        return;
    };
    return (
        <div className="flex flex-col justify-center border m-2.5 p-2.5">
            <div className="flex justify-center">
                <div className="max-w-[75%] px-4">
                    <img
                        className="shadow rounded-full max-w-full h-auto align-middle border-none"
                        src={channel_image}
                        alt={channel_name}
                    />
                </div>
            </div>
            <h2 className="text-center mt-2 mb-2 font-bold">{channel_name}</h2>
            <div className="flex flex-col justify-center">
                <button
                    className={
                        myTeam.includes(browser_id)
                            ? `bg-red-500 text-white active:bg-blue-600 uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`
                            : `${
                                  myTeam.length < 4
                                      ? "bg-blue-500"
                                      : "bg-gray-500"
                              } text-white active:bg-blue-600 uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`
                    }
                    type="button"
                    onClick={onClickHandler}
                    disabled={
                        myTeam.length >= 4 && !myTeam.includes(browser_id)
                            ? true
                            : ""
                    }
                >
                    {myTeam.includes(browser_id)
                        ? "Remove From Team"
                        : "Add to Team"}
                </button>
                <button
                    className="bg-blue-500 text-white uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => window.open(channel_url)}
                >
                    Visit Channel
                </button>
            </div>
        </div>
    );
};

export default CreatorCard;
