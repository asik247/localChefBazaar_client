import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Shares/Loading';
const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth()
    // console.log('current usre authProvider',user);
    const location = useLocation();
    // console.log(location);
    if(loading){
        return <Loading></Loading>
    }
    if(user){
        return children
    }
    return <Navigate state={location.pathname} to={'/auth'}></Navigate>
};

export default PrivateRoute;