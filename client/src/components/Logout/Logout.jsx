import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

export function Logout() {
    const navigate = useNavigate();
    const { userLogout } = useContext(AuthContext);
    
    useEffect(() => {
        userLogout();
        navigate('/');
    }, []);
    
    return (
        <div className="empty-container">

        </div>
    );
}