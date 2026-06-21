import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../Firebase/firebase.init';
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    //! user setUser state here;
    const [user, setUser] = useState(null);
    //Todo create user/register user code;
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //? updateUser;
    const updateUser = (profile)=>{
        return updateProfile(auth.currentUser,profile)
    }
    //! onAuthStateChange;
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
        return () => {
            unsubscribe()
        }
    }, [])
    const usersInfo = {
        createUser,
        updateUser,
        user
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