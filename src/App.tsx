import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./ProtectedRoute.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
import Quiz from "./pages/Quiz.tsx";
import QuizSummary from "./pages/QuizSummary.tsx";
import Profile from "./pages/Profile.tsx";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Routes protégées */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/quiz/:quizId" element={<Quiz/>} />
                        <Route path="/quiz-summary" element={<QuizSummary />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
};

export default App;
