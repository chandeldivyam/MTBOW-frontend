import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ContestInfo from "./components/contests/ContestInfo";
import { ContestResult } from "./pages/ContestResult";
import { Results } from "./pages/Results";
import Navbar from "./pages/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
            </Routes>
        </Router>
    );
}
export default App;
