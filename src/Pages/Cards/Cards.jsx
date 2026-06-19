import React from 'react';
import useInstance from '../../Hooks/useInstance';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
const Cards = () => {
    const instance = useInstance();
    const { data: cardsData = [], isLoading } = useQuery({
        queryKey: ['cardsData'],
        queryFn: async () => {
            const res = await instance('/cardsData');
            return res.data
        }
    })
    if (isLoading) {
        return <p>loading...</p>
    }
    return (
        <div className='mt-20'>
            <h1 className="text-3xl md:text-4xl font-extrabold text-center my-10 tracking-tight italic">
                Freshly Made <span className="text-emerald-500">for You</span>
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-2'>
                {cardsData.map(card => (
                    <div key={card._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden w-74  mx-auto hover:shadow-md transition-shadow">
                        {/* Image */}
                        <div className="relative">
                            <img
                                src={card.image}
                                alt={card.name}
                                className="w-full h-48 object-cover"
                            />
                            <span className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                                Available
                            </span>
                        </div>

                        {/* Body */}
                        <div className="p-4">
                            <h2 className="text-base font-medium text-gray-900">{card.name}</h2>
                            <p className="text-sm text-gray-400 mt-0.5">by {card.chef_name}</p>

                            <div className="flex items-center justify-between mt-4">
                                <span className="text-xl font-semibold text-gray-900">${card.price}</span>
                                <Link to={`/details/${card._id}`} className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-gray-700 transition-colors">
                                    view details
                                </Link>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
            <div className="flex justify-center my-8">
                <Link to={'/meals'} className="btn btn-ghost bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold px-10 rounded-full">
                    All Meals Here
                </Link>
            </div>
        </div>
    );
};

export default Cards;
