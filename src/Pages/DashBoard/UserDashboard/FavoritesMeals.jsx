import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useInstanceSecqure from '../../../Hooks/useInstanceSecqure';
import Loading from '../../../Shares/Loading';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

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
            confirmButtonColor: "#ef4444",
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
                            confirmButtonColor: "#ef4444",
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
            className={`btn btn-sm btn-error btn-outline rounded-full gap-1.5 ${full ? "w-full" : ""}`}
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
        <div className="min-h-screen bg-base-200/40">
            <Helmet>
                <title>UserDashBoard - MyFavoritesMeals | LocalChefBazaar</title>
            </Helmet>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

                {/* Header */}
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold tracking-[0.2em] text-red-500 uppercase mb-2">
                            Saved for later
                        </p>
                        <h1 className="text-3xl sm:text-4xl font-bold text-base-content tracking-tight">
                            My Favorite Meals
                        </h1>
                    </div>

                    {/* Stat card */}
                    <div className="stats shadow rounded-2xl">
                        <div className="stat py-3 px-6">
                            <div className="stat-title text-xs">
                                {favoritesData.length === 1 ? "Meal Saved" : "Meals Saved"}
                            </div>
                            <div className="stat-value text-error text-3xl">
                                {favoritesData.length}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Empty state */}
                {favoritesData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-24 border border-dashed border-base-300 rounded-3xl bg-base-100">
                        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
                            <svg viewBox="0 0 24 24" className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <p className="text-base-content font-semibold mb-1">No favorite meals yet</p>
                        <p className="text-base-content/60 text-sm max-w-xs">
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
                                    className="group rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm hover:shadow-xl hover:bg-red-50 transition-all duration-200"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <span className="text-xs font-semibold text-base-content/40">
                                                #{index + 1}
                                            </span>
                                            <h3 className="font-semibold text-base-content text-lg truncate">
                                                {favorite.mealName}
                                            </h3>
                                            <p className="text-base-content/60 text-sm mt-0.5">
                                                Chef: <span className="text-base-content/80 font-medium">{favorite.chefName}</span>
                                            </p>
                                        </div>
                                        <span className="badge badge-error badge-outline shrink-0 font-semibold">
                                            ${favorite.price}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-base-200">
                                        <span className="text-xs text-base-content/40 font-medium">
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
                        <div className="hidden md:block rounded-3xl border border-base-300 bg-base-100 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead>
                                        <tr className="bg-base-200/60 text-base-content/60 uppercase text-xs tracking-wider border-b border-base-200">
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
                                                className="border-b border-base-200 last:border-0 hover:bg-red-50 transition-colors duration-150"
                                            >
                                                <td className="px-6 py-4 text-base-content/50 font-medium">
                                                    {index + 1}
                                                </td>

                                                <td className="px-6 py-4 font-semibold text-base-content">
                                                    {favorite.mealName}
                                                </td>

                                                <td className="px-6 py-4 text-base-content/70">
                                                    {favorite.chefName}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="badge badge-error badge-outline font-semibold">
                                                        ${favorite.price}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-base-content/50">
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