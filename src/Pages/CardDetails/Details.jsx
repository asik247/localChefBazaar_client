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
            <div className='mt-20 mb-10'>
                <h1 className="text-3xl md:text-4xl font-extrabold text-center my-10 tracking-tight italic">
                    More <span className="text-emerald-500">Info this meal</span>
                </h1>
                <div>
                    <div key={cardDetailsData._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden w-90  mx-auto hover:shadow-md transition-shadow">
                        {/* Image */}
                        <div className="relative">
                            <img
                                src={cardDetailsData.image}
                                alt={cardDetailsData.name}
                                className="w-full h-48 object-cover"
                            />
                            <span className={`absolute top-3 right-3 text-white text-xs font-medium px-3 py-1 rounded-full ${cardDetailsData.is_available
                                    ? "bg-emerald-500"
                                    : "bg-red-500"
                                }`}>
                                {cardDetailsData.is_available ? "Available" : "Unavailable"}
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


        </div>
    );
};

export default Details;

/**{
    "_id": "6a354ceecfb9033f92def692",
    "id": 5,
    "name": "Chicken BBQ Platter",
    "category": "BBQ & Grills",
    "chef_id": 3,
    "chef_name": "Karim Hossain",
    "price": 380,
    "portion": "2 persons",
    "prep_time_minutes": 60,
    "calories": 890,
    "spice_level": "High",
    "is_available": true,
    "delivery_areas": [
        "Agrabad",
        "GEC Circle",
        "Nasirabad",
        "Halishahar"
    ],
    "tags": [
        "party",
        "bestseller"
    ],
    "description": "Smoky grilled chicken marinated overnight with chef's special spice blend.",
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400"
} */