import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
    return (
        <div className="d-flex flex-column min-vh-100 ">
            {/* Navbar en haut */}
            <Navbar />

            {/* Contenu principal */}
            <main className="container my-4 flex-grow-1">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
