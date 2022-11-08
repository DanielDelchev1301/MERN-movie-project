import { createContext } from "react";

import { useLocalStorage } from "../hooks/uselocalStorage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useLocalStorage('user', {});

    function userLogin(userData) {
        setUser(userData);
    }

    function userLogout() {
        setUser({});
    }

    const isAuth = Boolean(user._id);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuth,
                userLogin,
                userLogout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}