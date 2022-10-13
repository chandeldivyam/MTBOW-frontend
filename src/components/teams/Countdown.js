import React, { useEffect, useState } from "react";

const Countdown = ({ event_end_time }) => {
    console.log(event_end_time);
    const targetTime = new Date(event_end_time).getTime();
    const [currentTime, setCurrentTime] = useState(Date.now());

    const timeBetween = targetTime - currentTime;
    const seconds = Math.floor((timeBetween / 1000) % 60).toLocaleString(
        "en-US",
        { minimumIntegerDigits: 2, useGrouping: false }
    );
    const minutes = Math.floor((timeBetween / 1000 / 60) % 60);
    const hours = Math.floor((timeBetween / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeBetween / (1000 * 60 * 60 * 24));

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    if (days <= 0 && hours <= 0 && minutes <= 0 && Number(seconds) <= 0) {
        return (
            <h2 className="mt-4 text-center text-[#dc5714] text-2xl underline mobile:w-[512px] w-screen">
                Event Completed!!!
            </h2>
        );
    }
    return (
        <>
            <h2 className="mt-2 text-center text-slate-400 text-xl  mobile:w-[512px] w-screen">
                Time Remaining
            </h2>
            <div className="flex justify-center">
                <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                    <div
                        className={
                            days <= 0
                                ? "hidden"
                                : "flex flex-col p-2 bg-neutral rounded-box text-neutral-content"
                        }
                    >
                        <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": 15 }}>{days}</span>
                        </span>
                        days
                    </div>
                    <div
                        className={
                            hours <= 0
                                ? "hidden"
                                : "flex flex-col p-2 bg-neutral rounded-box text-neutral-content"
                        }
                    >
                        <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": 10 }}>{hours}</span>
                        </span>
                        hours
                    </div>
                    <div
                        className={
                            minutes <= 0
                                ? "hidden"
                                : "flex flex-col p-2 bg-neutral rounded-box text-neutral-content"
                        }
                    >
                        <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": minutes }}>
                                {minutes}
                            </span>
                        </span>
                        min
                    </div>
                    <div
                        className={
                            Number(seconds) < 0
                                ? "hidden"
                                : "flex flex-col p-2 bg-neutral rounded-box text-neutral-content"
                        }
                    >
                        <span className="countdown font-mono text-5xl">
                            <span style={{ "--value": seconds }}>
                                {seconds}
                            </span>
                        </span>
                        sec
                    </div>
                </div>
            </div>
        </>
    );
};
export default Countdown;
