import React from 'react';
import { Outlet } from 'react-router';
import Nav from '../Components/Navbar/Nav';
import Foot from '../Components/Footer/Foot';

const RootLayout = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <Nav></Nav>
            <main className='flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>
                <Outlet></Outlet>
            </main>
            <Foot></Foot>
        </div>
    );
};

export default RootLayout;