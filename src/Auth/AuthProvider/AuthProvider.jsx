import React, { createContext } from 'react';
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const usersInfo = {
        name: 'ar',
        age: 21
    }
    return (
        <div>
            <AuthContext.Provider value={usersInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;