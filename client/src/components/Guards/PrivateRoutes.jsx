import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

export function PrivateRoutes() {
    const { isAuth } = useContext(AuthContext);

    if (!isAuth) {
        return <Navigate to='/login' replace />
    }

    return <Outlet />
}