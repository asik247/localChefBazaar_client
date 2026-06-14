import React from 'react';
import { Outlet } from 'react-router';
import Nav from '../Components/Navbar/Nav';
import Foot from '../Components/Footer/Foot';

const RootLayout = () => {
    return (
        <div className='w-11/12 min-h-screen mx-auto flex flex-col overflow-x-hidden'>
            <Nav></Nav>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
            <Foot></Foot>
        </div>
    );
};

export default RootLayout;