import React from 'react';
import Hero from './HeroSection/Hero';
import Cards from './Cards/Cards';
import { Helmet } from 'react-helmet-async';

const HomePage = () => {
    return (
        <div className='my-10'>
            <Helmet>
                <title>Home | LocalChefBazaar</title>
            </Helmet>
            {/* hero section code here */}
            <Hero></Hero>
            {/* cards section code here */}
            <section>
                <Cards></Cards>
            </section>
        </div>
    );
};

export default HomePage;