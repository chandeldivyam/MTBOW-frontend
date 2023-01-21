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
import ProtectedRoute from "./components/utils/ProtectedRoute"
import { initializeGa } from "./components/utils/gaHelper";
function App() {
    initializeGa()
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<ProtectedRoute path="/"><Home /></ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                    path="/contestInfo/:contestId"
                    element={<ContestInfo />}
                />
                <Route
                    path="/videoContestInfo/:videoContestId"
                    element={<ProtectedRoute path="/videoContestInfo/:videoContestId"><VideoContestInfo /></ProtectedRoute>}
                />
                <Route path="/myResults/" element={<ProtectedRoute path="/myResults/"><Results /></ProtectedRoute>} />
                <Route
                    path="/contestResult/:contestId"
                    element={<ContestResult />}
                />
                <Route
                    path="/videoContestResult/:contestId"
                    element={<ProtectedRoute path="/videoContestResult/:contestId"><VideoContestResult /></ProtectedRoute>}
                />
                <Route
                    path="/videoTeamOther/:videoContestId/:userId"
                    element={<ProtectedRoute path="/videoTeamOther/:videoContestId/:userId"><VideoTeamOther /></ProtectedRoute>}
                />
                <Route path="/payments/" element={<ProtectedRoute path="/payments/"><Payments /></ProtectedRoute>} />
                <Route path="/recharge" element={<ProtectedRoute path="/recharge"><Recharge /></ProtectedRoute>} />
                <Route path="/transactions" element={<ProtectedRoute path="/transactions"><Transactions /></ProtectedRoute>} />
                <Route path="/kyc" element={<ProtectedRoute path="/kyc"><PanKyc /></ProtectedRoute>} />
                <Route path="/account" element={<ProtectedRoute path="/account"><AccountVerification /></ProtectedRoute>} />
                <Route path="/withdraw" element={<ProtectedRoute path="/withdraw"><Withdraw /></ProtectedRoute>} />
                <Route path="/refer" element={<ProtectedRoute path="/refer"><Refer /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}
export default App;
