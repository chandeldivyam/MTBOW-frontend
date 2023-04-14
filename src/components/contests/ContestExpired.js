import react from "react";
import { Link } from "react-router-dom";

export const ContestExpired = () => {
    return (
        <div>
            <h1 className="text-center m-5 text-l font-bold">
                Scored are settling and money getting deposited to the winners!
            </h1>
            <Link to="/myResults/">
                <div className="flex justify-center">
                    <div className="bg-transparent text-center mt-5 max-w-xs hover:bg-[#dc5714] text-[#dc5714] font-semibold hover:text-white py-2 px-4 border border-[#dc5714] hover:border-transparent rounded">
                        My Results
                    </div>
                </div>
            </Link>
        </div>
    );
};
