import React from 'react';
import Hero from './HeroSection/Hero';
import Cards from './Cards/Cards';

const HomePage = () => {
    return (
        <div className='my-10'>
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