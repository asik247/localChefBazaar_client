import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useInstance from '../../Hooks/useInstance';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
const Meals = () => {
    const instance = useInstance()
    const { data: meals = [] } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const res = await instance('/cardsData/meals');
            return res.data
        }
    })
    //! serarch input field code implement;
    const handlerSearch = (e)=>{
        console.log(e);
    }
    return (
        <div>
            <Helmet>
                <title>Meals | LocalChefBazaar</title>
            </Helmet>
            {/* <h1>All Meals here{meals.length}</h1> */}
            <div className="text-center my-10">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight italic text-base-content">
                    All Freshly Made <span className="text-emerald-500">for You</span>
                </h1>
                <p className="mt-3 text-shadow-2xs text-base-content/60">
                    Showing{' '}
                    <span className="badge badge-error badge-outline font-semibold align-middle">
                        {meals.length}
                    </span>{' '}
                    {meals.length === 1 ? 'meal' : 'meals'} available right now
                </p>
                {/* Search input field */}
                <div className='my-4'>
                    <label className="input">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input onChange={(e)=>handlerSearch(e.target.value)} type="search" required placeholder="Search" />
                    </label>
                </div>
            </div>
            <div className='mt-20'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {meals.map(meal => (
                        <div key={meal._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden w-full  mx-auto  hover:shadow-md transition-shadow">
                            {/* Image */}
                            <div className="relative">
                                <img
                                    src={meal.image}
                                    alt={meal.name}
                                    className="w-full h-48 object-cover"
                                />
                                <span className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                                    Available
                                </span>
                            </div>

                            {/* Body */}
                            <div className="p-4">
                                <h2 className="text-base font-medium text-gray-900">{meal.name}</h2>
                                <p className="text-sm text-gray-400 mt-0.5">by {meal.chef_name}</p>

                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-xl font-semibold text-gray-900">${meal.price}</span>
                                    <Link to={`/details/${meal._id}`} className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-gray-700 transition-colors">
                                        view details
                                    </Link>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Meals;