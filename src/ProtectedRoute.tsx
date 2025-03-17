import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "./context/AuthContext.tsx";

const ProtectedRoute: React.FC = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Chargement...</div>; // Vous pouvez remplacer ceci par un composant de chargement plus élaboré
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
