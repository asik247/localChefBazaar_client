import React from 'react';
import useInstance from '../../Hooks/useInstance';
import { useQuery } from '@tanstack/react-query';

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
        <div>
            <h1>hell0 cards{cardsData.length}</h1>
            {
                console.log(cardsData)
            }
            {
                cardsData.map(card =>
                    <div className="card bg-base-100 w-96 shadow-sm">
                        <figure>
                            <img
                                src={card.image}
                                alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Card Title</h2>
                            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Cards;
/**{
    "_id": "6a3359fa569346dedd96fb25",
    "chefName": "Rahima Begum",
    "chefId": "CHF-101",
    "foodName": "Kacchi Biryani",
    "foodImage": "https://placehold.co/400x300/E3A23D/ffffff?text=Kacchi+Biryani",
    "price": 380,
    "rating": 4.8,
    "deliveryArea": "Dhanmondi"
} */