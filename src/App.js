import Login from "./pages/Onboarding/Login";
import Signup from "./pages/Onboarding/Signup";
import Home from "./pages/Main/Home";
import ContestInfo from "./components/contests/ContestInfo";
import VideoContestInfo from "./components/videoContests/VideoContestInfo";
import { ContestResult } from "./pages/Results/ContestResult";
import VideoContestResult from "./pages/Results/VideoContestResult";
import { Results } from "./pages/Results/Results";
import Payments from "./pages/Payments/Pyaments";
import Navbar from "./pages/Main/Navbar";
import Recharge from "./pages/Payments/Recharge";
import Transactions from "./pages/Payments/Transactions";
import PanKyc from "./pages/Payments/PanKyc";
import AccountVerification from "./pages/Payments/AccountVerification";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Withdraw from "./pages/Payments/Withdraw";
import VideoTeamOther from "./components/videoTeams/VideoTeamOther";
import Refer from "./pages/Main/Refer";
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                    path="/contestInfo/:contestId"
                    element={<ContestInfo />}
                />
                <Route
                    path="/videoContestInfo/:videoContestId"
                    element={<VideoContestInfo />}
                />
                <Route path="/myResults/" element={<Results />} />
                <Route
                    path="/contestResult/:contestId"
                    element={<ContestResult />}
                />
                <Route
                    path="/videoContestResult/:contestId"
                    element={<VideoContestResult />}
                />
                <Route
                    path="/videoTeamOther/:videoContestId/:userId"
                    element={<VideoTeamOther />}
                />
                <Route path="/payments/" element={<Payments />} />
                <Route path="/recharge" element={<Recharge />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/kyc" element={<PanKyc />} />
                <Route path="/account" element={<AccountVerification />} />
                <Route path="/withdraw" element={<Withdraw />} />
                <Route path="/refer" element={<Refer />} />
            </Routes>
        </Router>
    );
}
export default App;
