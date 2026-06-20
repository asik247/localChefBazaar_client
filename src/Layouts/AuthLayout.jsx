import React from 'react';
import { Outlet } from 'react-router';
import Nav from '../Components/Navbar/Nav';

const AuthLayout = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;