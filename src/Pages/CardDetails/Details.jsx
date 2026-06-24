import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useParams } from 'react-router';
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
        <div className="m-10 bg-white rounded-2xl border border-gray-100 overflow-hidden max-w-md mx-auto hover:shadow-md transition-shadow">
            {/* Image */}
            <div className="relative">
                <img
                    src={cardDetailsData.image}
                    alt={cardDetailsData.name}
                    className="w-full h-56 object-cover"
                />

                <span className={`absolute top-3 right-3 text-white text-xs font-medium px-3 py-1 rounded-full ${cardDetailsData.is_available
                    ? "bg-emerald-500"
                    : "bg-red-500"
                    }`}>
                    {cardDetailsData.is_available ? "Available" : "Unavailable"}
                </span>
            </div>

            {/* Body */}
            <div className="p-5 space-y-3">
                <h2 className="text-2xl font-bold text-gray-900">
                    {cardDetailsData.name}
                </h2>

                <p className="text-gray-500">
                    By <span className="font-semibold">{cardDetailsData.chef_name}</span>
                </p>

                <p className="text-gray-700">
                    {cardDetailsData.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="font-bold text-emerald-600">
                            ৳ {cardDetailsData.price}
                        </p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Portion</p>
                        <p className="font-semibold">
                            {cardDetailsData.portion}
                        </p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Prep Time</p>
                        <p className="font-semibold">
                            {cardDetailsData.prep_time_minutes} min
                        </p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Calories</p>
                        <p className="font-semibold">
                            {cardDetailsData.calories}
                        </p>
                    </div>
                </div>

                {/* Category & Spice */}
                <div className="flex justify-between items-center">
                    <span className="badge badge-outline">
                        {cardDetailsData.category}
                    </span>

                    <span className="badge badge-error text-white">
                        Spice: {cardDetailsData.spice_level}
                    </span>
                </div>

                {/* Delivery Areas */}
                <div>
                    <h3 className="font-semibold mb-2">
                        Delivery Areas
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {cardDetailsData.delivery_areas?.map((area, index) => (
                            <span
                                key={index}
                                className="badge badge-success badge-outline"
                            >
                                {area}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Tags */}
                <div>
                    <h3 className="font-semibold mb-2">
                        Tags
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {cardDetailsData.tags?.map((tag, index) => (
                            <span
                                key={index}
                                className="badge badge-info badge-outline"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Order Button */}
                <Link to={`/orders/${cardDetailsData._id}`}
                    className="btn w-full m-2 bg-gradient-to-r from-orange-400 to-red-500 border-none text-white font-semibold rounded-full px-8 shadow-lg shadow-red-500/30"
                >
                    Order Now
                </Link>
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