import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { apiFetch } from "@/lib/apiClient";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    const [accessToken, setAccessToken] = useState(() => localStorage.getItem("accessToken"));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = useCallback(async () => {
        try {
            setTimeout(async() => {
                const res = await apiFetch("/api/user/current");
                setUser(res.user);
            }, 0)
        } catch (e) {
            console.error(e);
            setUser(null);
            setAccessToken(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {

        const localToken = localStorage.getItem("accessToken");
        if (accessToken) {
            loadUser();
        } else if (localToken) {
            setAccessToken(localToken);
        }
        
    }, [accessToken, loadUser]);

    useEffect(() => {
        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
        }
    }, [accessToken]);

    const logout = async () => {
        try {
            await apiFetch("/api/auth/logout", { method: "POST" }); // запрос на сервер
        } catch (e) {
            console.error("Logout failed", e);
        } finally {
            setAccessToken(null);
            setUser(null);
            localStorage.removeItem("accessToken");
            navigate('/catalog');
        }
    };

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser, loading, logout, loadUser }}>
            {children}
        </AuthContext.Provider>
    );
};