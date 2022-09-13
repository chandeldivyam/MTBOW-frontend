import react from "react";
import { Link } from "react-router-dom";

export const ContestExpired = () => {
    return (
        <div>
            <h1 className="text-center m-5 text-l font-bold">
                Event Expired, Please visit "My Result" section to view the
                results!
            </h1>
            <Link to="/myResults/">
                <div className="flex justify-center">
                    <div className="bg-transparent text-center mt-5 max-w-xs hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        My Results
                    </div>
                </div>
            </Link>
        </div>
    );
};
