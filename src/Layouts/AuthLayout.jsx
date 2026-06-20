import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            <h1>hi authlayout here</h1>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;