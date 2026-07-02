import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useInstanceSecqure from '../../../Hooks/useInstanceSecqure';
import Loading from '../../../Shares/Loading';
import Swal from 'sweetalert2';

const FavoritesMeals = () => {
    const { user, loading } = useAuth();
    const instanceSecqure = useInstanceSecqure();

    const { data: favoritesData = [], isLoading, refetch } = useQuery({
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

    //? handler remove;
    const handlerRemove = (id) => {
        //? confirmation checked;
        Swal.fire({
            title: "Are you sure?",
            text: "Your favorite meal will be removed!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#f97316",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, remove it!",
            background: "#fff",
        }).then((result) => {
            if (result.isConfirmed) {
                instanceSecqure.delete(`/favorites/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your favorite meal has been removed.",
                            icon: "success",
                            confirmButtonColor: "#f97316",
                        });
                        refetch();
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong. Please try again.",
                            icon: "error",
                        });
                    });
            }
        });
    };

    const DeleteButton = ({ id, full }) => (
        <button
            onClick={() => handlerRemove(id)}
            className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-red-50 text-red-600 font-medium text-xs hover:bg-red-500 hover:text-white transition-colors duration-200 border border-red-100 hover:border-red-500 ${full ? "w-full" : ""}`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
            </svg>
            Delete
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-50 px-3 py-6 sm:p-6 md:p-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-6 md:mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800">
                        My Favorite Meals
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm sm:text-base">
                        You have{" "}
                        <span className="font-semibold text-orange-500">
                            {favoritesData.length}
                        </span>{" "}
                        {favoritesData.length === 1 ? "meal" : "meals"} saved as favorite
                    </p>
                </div>

                {/* Empty state */}
                {favoritesData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100 py-16 sm:py-20 px-4 sm:px-6">
                        <div className="text-5xl sm:text-6xl mb-4">🍽️</div>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 text-center">
                            No favorite meals yet
                        </h2>
                        <p className="text-gray-400 mt-2 text-center text-sm sm:text-base">
                            Meals you mark as favorite will show up here.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* ---------- Mobile Card View (below md) ---------- */}
                        <div className="grid grid-cols-1 gap-4 md:hidden">
                            {favoritesData.map((favorite, index) => (
                                <div
                                    key={favorite._id}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <span className="text-xs font-semibold text-gray-400">
                                                #{index + 1}
                                            </span>
                                            <h3 className="font-bold text-gray-800 text-base truncate">
                                                {favorite.mealName}
                                            </h3>
                                            <p className="text-gray-500 text-sm mt-0.5">
                                                Chef: <span className="text-gray-700">{favorite.chefName}</span>
                                            </p>
                                        </div>
                                        <span className="shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                            ${favorite.price}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                                        <span className="text-xs text-gray-400">
                                            Added:{" "}
                                            {new Date(favorite.addedTime).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </span>
                                        <div className="w-28">
                                            <DeleteButton id={favorite._id} full />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ---------- Desktop / Tablet Table View (md and up) ---------- */}
                        <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider border-b border-gray-100">
                                            <th className="px-6 py-4 font-semibold">#</th>
                                            <th className="px-6 py-4 font-semibold">Meal Name</th>
                                            <th className="px-6 py-4 font-semibold">Chef Name</th>
                                            <th className="px-6 py-4 font-semibold">Price</th>
                                            <th className="px-6 py-4 font-semibold">Date Added</th>
                                            <th className="px-6 py-4 font-semibold text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {favoritesData.map((favorite, index) => (
                                            <tr
                                                key={favorite._id}
                                                className="border-b border-gray-100 last:border-0 hover:bg-orange-50/50 transition-colors duration-150"
                                            >
                                                <td className="px-6 py-4 text-gray-500 font-medium">
                                                    {index + 1}
                                                </td>

                                                <td className="px-6 py-4 font-semibold text-gray-800">
                                                    {favorite.mealName}
                                                </td>

                                                <td className="px-6 py-4 text-gray-600">
                                                    {favorite.chefName}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                                        ${favorite.price}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-gray-500">
                                                    {new Date(
                                                        favorite.addedTime
                                                    ).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                    })}
                                                </td>

                                                <td className="px-6 py-4 text-center">
                                                    <DeleteButton id={favorite._id} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default FavoritesMeals;