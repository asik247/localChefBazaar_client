import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router';
const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth()
    // console.log('current usre authProvider',user);
    if(loading){
        return <p>Loading...</p>
    }
    if(user){
        return children
    }
    return <Navigate to={'/auth'}></Navigate>
};

export default PrivateRoute;