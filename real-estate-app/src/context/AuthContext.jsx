import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check authentication on app load and when auth state changes
    const checkAuth = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/check-auth", {
                withCredentials: true,
            });

            if (response.data.authenticated) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
