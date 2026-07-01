import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useInstanceSecqure from '../../../Hooks/useInstanceSecqure';
import Loading from '../../../Shares/Loading';

const FavoritesMeals = () => {
    const { user, loading } = useAuth();
    const instanceSecqure = useInstanceSecqure();

    const { data: favoritesData = [], isLoading } = useQuery({
        queryKey: ['favorites', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await instanceSecqure.get(
                `/favorites/${user?.email}`
            );
            return res.data;
        }
    });

    if (loading || isLoading) {
        return <Loading />;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                Favorite Meals ({favoritesData.length})
            </h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Meal Name</th>
                            <th>Chef Name</th>
                            <th>Price</th>
                            <th>Date Added</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {favoritesData.map((favorite, index) => (
                            <tr key={favorite._id}>
                                <td>{index + 1}</td>

                                <td>{favorite.mealName}</td>

                                <td>{favorite.chefName}</td>

                                <td>${favorite.price}</td>

                                <td>
                                    {new Date(
                                        favorite.addedTime
                                    ).toLocaleDateString()}
                                </td>

                                <td>
                                    <button className="btn btn-error btn-sm">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FavoritesMeals;