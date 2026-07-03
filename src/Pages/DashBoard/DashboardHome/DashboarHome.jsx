import React from 'react';
import useRole from '../../../Hooks/useRole';
import Loading from '../../../Shares/Loading';
import AdminHome from '../AdminHome/AdminHome';
import ChefHome from '../ChefHome/ChefHome';
import UserHome from '../UserHome/UserHome';

const DashboarHome = () => {
    const { userRole, isLoading } = useRole()
    if (isLoading) {
        return <Loading></Loading>
    }
    const role =userRole.role
    if (role === 'admin') {
        return <AdminHome></AdminHome>
    }
    if (role === 'chef') {
        return <ChefHome></ChefHome>
    }
    if (role === 'user') {
        return <UserHome></UserHome>
    }
   
};

export default DashboarHome;