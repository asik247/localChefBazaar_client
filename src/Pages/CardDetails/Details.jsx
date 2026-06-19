import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useInstance from '../../Hooks/useInstance';
const Details = () => {
    const { id } = useParams();
    const instance = useInstance()
    const { data: cardDetailsData = [] } = useQuery({
        queryKey: ['cardsData', id],
        queryFn: async () => {
            const res = await instance(`/cardsData/${id}`);
            return res.data
        }
    })
    return (
        <div>
            <div className='mt-20'>
                <h1 className="text-3xl md:text-4xl font-extrabold text-center my-10 tracking-tight italic">
                    Freshly Made <span className="text-emerald-500">for You</span>
                </h1>
                <div className=''>
                    <div key={cardDetailsData._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden w-74  mx-auto hover:shadow-md transition-shadow">
                        {/* Image */}
                        <div className="relative">
                            <img
                                src={cardDetailsData.image}
                                alt={cardDetailsData.name}
                                className="w-full h-48 object-cover"
                            />
                            <span className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                                Available
                            </span>
                        </div>

                        {/* Body */}
                        <div className="p-4">
                            <h2 className="text-base font-medium text-gray-900">{cardDetailsData.name}</h2>
                            <p className="text-sm text-gray-400 mt-0.5">by {cardDetailsData.chef_name}</p>

                        </div>

                    </div>

                </div>

            </div>
            {
                console.log(cardDetailsData)
            }
        </div>
    );
};

export default Details;