import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { getUser } from "../../utils/links";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(()=> {
        const fetchUser = async () => {
            try {
                const res = await axios.get(getUser, { withCredentials: true });
                setUser(res.data.user);
            } catch (e) {
                setUser(null);
            }
        };
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}