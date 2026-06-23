import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../Firebase/firebase.init';
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    //! user setUser state here;
    const [user, setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    //Todo create user/register user code;
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //! Email verification;
    const verifyEmail = ()=>{
        return sendEmailVerification(auth.currentUser);
    }
    //? LogIn user/SignIn user;
    const logInUsers = (email,password) =>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    //? sendPasswordReset Email;
    const forgotPassword = (userEmail)=>{
        return sendPasswordResetEmail(auth,userEmail)
    }
    //Todo logOut/signOut user;
    const logOutUsers = ()=>{
        return signOut(auth)
    }
    //? updateUser;
    const updateUser = (profile)=>{
        return updateProfile(auth.currentUser,profile)
    }
    //! onAuthStateChange;
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])
    const usersInfo = {
        createUser,
        verifyEmail,
        logInUsers,
        forgotPassword,
        logOutUsers,
        updateUser,
        user,
        loading
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