import Login from "./pages/Onboarding/Login";
import Signup from "./pages/Onboarding/Signup";
import Home from "./pages/Main/Home";
import ContestInfo from "./components/contests/ContestInfo";
import { ContestResult } from "./pages/Results/ContestResult";
import { Results } from "./pages/Results/Results";
import Payments from "./pages/Payments/Pyaments";
import Navbar from "./pages/Main/Navbar";
import Recharge from "./pages/Payments/Recharge";
import Transactions from "./pages/Payments/Transactions";
import PanKyc from "./pages/Payments/PanKyc";
import AccountVerification from "./pages/Payments/AccountVerification";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Withdraw from "./pages/Payments/Withdraw";
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
                <Route path="/myResults/" element={<Results />} />
                <Route
                    path="/contestResult/:contestId"
                    element={<ContestResult />}
                />
                <Route path="/payments/" element={<Payments />} />
                <Route path="/recharge" element={<Recharge />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/kyc" element={<PanKyc />} />
                <Route path="/account" element={<AccountVerification />} />
                <Route path="/withdraw" element={<Withdraw />} />
            </Routes>
        </Router>
    );
}
export default App;
