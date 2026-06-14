import React from 'react';
import { Outlet } from 'react-router';
import Nav from '../Components/Navbar/Nav';
import Foot from '../Components/Footer/Foot';

const RootLayout = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
            <Foot></Foot>
        </div>
    );
};

export default RootLayout;