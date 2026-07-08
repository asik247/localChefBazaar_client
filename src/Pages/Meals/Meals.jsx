import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import useInstanceSecqure from '../../Hooks/useInstanceSecqure';

const Meals = () => {
    const instanceSecqure = useInstanceSecqure();
    const [searchText, setSearchText] = useState('');
    // All Meals
    const { data: meals = [], isLoading } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const res = await instanceSecqure.get('/cardsData/meals');
            return res.data;
        }
    });
    // Search Meals
    const { data: searchResults = [] } = useQuery({
        queryKey: ['searchMeals', searchText],
        enabled: !!searchText,
        queryFn: async () => {
            const res = await instanceSecqure.get(
                `/cardsData/search/partial/${searchText}`
            );
            return res.data;
        }
    });

    const displayedMeals = searchText ? searchResults : meals;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div>
            <Helmet>
                <title>Meals | LocalChefBazaar</title>
            </Helmet>

            <div className="text-center my-10">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight italic text-base-content">
                    All Freshly Made{' '}
                    <span className="text-emerald-500">for You</span>
                </h1>

                <p className="mt-3 text-base-content/60">
                    Showing{' '}
                    <span className="badge badge-error badge-outline font-semibold">
                        {displayedMeals.length}
                    </span>{' '}
                    {displayedMeals.length === 1 ? 'meal' : 'meals'} available
                    right now
                </p>

                {/* Search */}
                <div className="my-4 flex justify-center">
                    <label className="input w-full max-w-md">
                        <svg
                            className="h-[1em] opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
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

                        <input
                            type="search"
                            placeholder="Search meals..."
                            value={searchText}
                            onChange={(e) =>
                                setSearchText(e.target.value)
                            }
                        />
                    </label>
                </div>
            </div>

            {/* No Result */}
            {searchText && displayedMeals.length === 0 && (
                <div className="text-center py-10">
                    <h2 className="text-xl font-semibold text-red-500">
                        No meals found
                    </h2>
                </div>
            )}

            <div className="mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedMeals.map((meal) => (
                        <div
                            key={meal._id}
                            className="bg-white rounded-2xl border border-gray-100 overflow-hidden w-full mx-auto hover:shadow-md transition-shadow"
                        >
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

                            <div className="p-4">
                                <h2 className="text-base font-medium text-gray-900">
                                    {meal.name}
                                </h2>

                                <p className="text-sm text-gray-400 mt-0.5">
                                    by {meal.chef_name}
                                </p>

                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-xl font-semibold text-gray-900">
                                        ${meal.price}
                                    </span>

                                    <Link
                                        to={`/details/${meal._id}`}
                                        className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-gray-700 transition-colors"
                                    >
                                        View Details
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

