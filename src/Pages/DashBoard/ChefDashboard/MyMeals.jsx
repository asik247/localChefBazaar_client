import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useInstanceSecqure from '../../../Hooks/useInstanceSecqure';
import Loading from '../../../Shares/Loading';
import { Link } from 'react-router';

const MyMeals = () => {
    const { user, loading } = useAuth();
    const instanceSecqure = useInstanceSecqure();

    const {
        data: meals = [],
        isLoading,
        refetch
    } = useQuery({
        queryKey: ['cardsData-chef', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await instanceSecqure.get(
                `/cardsData/chef/${user?.email}`
            );
            return res.data;
        }
    });

    if (loading || isLoading) {
        return <Loading />;
    }

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This meal will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await instanceSecqure.delete(`/cardsData/remove/${id}`);
                await refetch();
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Meal has been removed.',
                    timer: 1500,
                    showConfirmButton: false
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong',
                    text:
                        error?.response?.data?.message ||
                        'Please try again.'
                });
            }
        }
    };

    // const handleUpdate = (mealId) => {
    //     console.log(mealId);
    //     // modal open korbi
    // };

    return (
        <div className="min-h-screen bg-base-200/40">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

                {/* Header */}
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold tracking-[0.2em] text-red-500 uppercase mb-2">
                            Chef Meals
                        </p>

                        <h1 className="text-3xl sm:text-4xl font-bold text-base-content tracking-tight">
                            My Meals
                        </h1>
                    </div>

                    <div className="stats shadow rounded-2xl">
                        <div className="stat py-3 px-6">
                            <div className="stat-title text-xs">
                                Total Meals
                            </div>

                            <div className="stat-value text-error text-3xl">
                                {meals.length}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                {meals.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-24 border border-dashed border-base-300 rounded-3xl bg-base-100">

                        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
                            🍽️
                        </div>

                        <p className="text-base-content font-semibold mb-1">
                            No Meals Found
                        </p>

                        <p className="text-base-content/60 text-sm max-w-xs">
                            Meals you create will show up here so you can manage them anytime.
                        </p>

                    </div>
                ) : (
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                        {meals.map((meal) => (
                            <div
                                key={meal._id}
                                className="group flex flex-col justify-between rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm hover:shadow-xl hover:bg-red-50 transition-all duration-200"
                            >
                                <div>

                                    {/* Meal Image */}
                                    <img
                                        src={meal.image}
                                        alt={meal.name}
                                        className="w-full h-52 object-cover rounded-2xl mb-4"
                                    />

                                    {/* Meal Name + Price */}
                                    <div className="flex items-start justify-between gap-2 mb-3">
                                        <h2 className="text-lg font-semibold text-base-content leading-snug">
                                            {meal.name}
                                        </h2>

                                        <span className="badge badge-error badge-outline shrink-0 font-semibold">
                                            ৳{meal.price}
                                        </span>
                                    </div>

                                    {/* Rating */}
                                    <div className="mb-3">
                                        <span className="badge badge-warning badge-outline">
                                            ⭐ {meal.rating}/5
                                        </span>
                                    </div>

                                    {/* Meal Info */}
                                    <div className="space-y-1.5 text-sm text-base-content/70">

                                        <p>
                                            <span className="font-semibold text-base-content/90">
                                                Delivery:
                                            </span>{' '}
                                            {meal.prep_time_minutes} Minutes
                                        </p>

                                        <p>
                                            <span className="font-semibold text-base-content/90">
                                                Chef:
                                            </span>{' '}
                                            {meal.chef_name}
                                        </p>

                                        <p>
                                            <span className="font-semibold text-base-content/90">
                                                Chef ID:
                                            </span>{' '}
                                            {meal.chef_id}
                                        </p>

                                        <p className="line-clamp-2">
                                            <span className="font-semibold text-base-content/90">
                                                Ingredients:
                                            </span>{' '}
                                            {
                                                Array.isArray(meal.ingredients)
                                                    ? meal.ingredients.join(', ')
                                                    : meal.ingredients
                                            }
                                        </p>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="mt-5 pt-4 border-t border-base-200 flex items-center justify-between">

                                    <p className="text-xs text-base-content/40 font-medium">
                                        {meal.createdAt
                                            ? new Date(
                                                meal.createdAt
                                            ).toLocaleDateString('en-US', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })
                                            : 'N/A'}
                                    </p>

                                    <div className="flex items-center gap-2">

                                        <Link
                                            to={`/dashboardLayouts/myMeals_update/${meal._id}`}
                                            className="btn btn-sm btn-error btn-outline rounded-full"
                                        >
                                            Update
                                        </Link>

                                        <button
                                            onClick={() =>
                                                handleDelete(meal._id)
                                            }
                                            className="btn btn-sm btn-ghost text-error hover:bg-error/10 rounded-full"
                                        >
                                            Delete
                                        </button>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyMeals;