import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useInstance from '../../Hooks/useInstance';
import { Link } from 'react-router';
const Meals = () => {
    const instance = useInstance()
    const {data:meals=[]} = useQuery({
        queryKey:['meals'],
        queryFn:async()=>{
            const res = await instance('/cardsData/meals');
            return res.data
        }
    })
    return (
        <div>
            <h1>All Meals here{meals.length}</h1>
             <div className='mt-20'>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-2'>
                {meals.map(meal => (
                    <div key={meal._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden w-74  mx-auto hover:shadow-md transition-shadow">
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