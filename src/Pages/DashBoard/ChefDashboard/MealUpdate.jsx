import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useInstanceSecqure from '../../../Hooks/useInstanceSecqure';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
const MealUpdate = () => {
    const { id } = useParams();
    const instanceSecqure = useInstanceSecqure()
    const { user } = useAuth()
    const { data: mealData } = useQuery({
        queryKey: ['cardsData', id],
        queryFn: async () => {
            const res = await instanceSecqure.get(`/cardsData/${id}`)
            return res.data
        }
    })
    //? upadte handler;
    const handleUpdateMeal = async (e) => {
        e.preventDefault();

        const form = e.target;

        const updatedMeal = {
            name: form.name.value,
            category: form.category.value,
            chef_name: form.chefName.value,
            chef_id: form.chefId.value,
            price: parseFloat(form.price.value),
            portion: form.portion.value,
            prep_time_minutes: parseFloat(form.deliveryTime.value),
            calories: parseFloat(form.calories.value),
            rating: parseFloat(form.rating.value),
            spice_level: form.spiceLevel.value,
            chefExperience: form.chefExperience.value,
            ingredients: form.ingredients.value
                .split(',')
                .map(item => item.trim()),
            delivery_areas: form.deliveryAreas.value,
            tags: form.tags.value,
            description: form.description.value,
            userEmail: user?.email,
            image: mealData?.image,
        };


        instanceSecqure.patch(
            `/cardsData/update/${id}`,
            updatedMeal
        ).then(res => {
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Meal Updated Successfully',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        })




    };

    return (
        <div className="min-h-screen bg-base-200/40">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

                {/* Header */}
                <div className="mb-8">
                    <p className="text-xs font-semibold tracking-[0.2em] text-red-500 uppercase mb-2">
                        Chef Dashboard
                    </p>

                    <h1 className="text-3xl sm:text-4xl font-bold text-base-content">
                        Update Meal Details
                    </h1>

                    <p className="text-base-content/60 mt-2">
                        Modify meal information, pricing, ingredients, and delivery details.
                    </p>
                </div>

                <div className="bg-base-100 rounded-3xl border border-base-300 shadow-sm p-6 md:p-8">

                    <form onSubmit={handleUpdateMeal} className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div>
                            <label className="label">
                                <span className="label-text">Food Name</span>
                            </label>
                            <input
                                name="name"
                                defaultValue={mealData?.name}
                                type="text"
                                placeholder="Food Name"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <input
                                name="category"
                                defaultValue={mealData?.category}
                                type="text"
                                placeholder="Category"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Chef Name</span>
                            </label>
                            <input
                                name="chefName"
                                defaultValue={user?.displayName}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Chef ID</span>
                            </label>
                            <input
                                name="chefId"
                                defaultValue={mealData?.chef_id}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input
                                name="price"
                                defaultValue={mealData?.price}
                                type="number"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Portion</span>
                            </label>
                            <input
                                name="portion"
                                defaultValue={mealData?.portion}
                                type="text"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Preparation Time (Minutes)</span>
                            </label>
                            <input
                                name="deliveryTime"
                                defaultValue={mealData?.prep_time_minutes}
                                type="number"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Calories</span>
                            </label>
                            <input
                                name="calories"
                                defaultValue={mealData?.calories}
                                type="number"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Rating</span>
                            </label>
                            <input
                                name="rating"
                                defaultValue={mealData?.rating}
                                type="number"
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Spice Level</span>
                            </label>
                            <select
                                name="spiceLevel"
                                defaultValue={mealData?.spice_level}
                                className="select select-bordered w-full"
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="label">
                                <span className="label-text">Chef Experience</span>
                            </label>
                            <textarea
                                name="chefExperience"
                                defaultValue={mealData?.chefExperience}
                                rows="3"
                                className="textarea textarea-bordered w-full"
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="label">
                                <span className="label-text">Ingredients</span>
                            </label>
                            <textarea
                                name="ingredients"
                                defaultValue={
                                    Array.isArray(mealData?.ingredients)
                                        ? mealData.ingredients.join(', ')
                                        : mealData?.ingredients || ''
                                }
                                rows="4"
                                className="textarea textarea-bordered w-full"
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="label">
                                <span className="label-text">Delivery Areas</span>
                            </label>
                            <input
                                name="deliveryAreas"
                                defaultValue={mealData?.delivery_areas}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="label">
                                <span className="label-text">Tags</span>
                            </label>
                            <input
                                name="tags"
                                defaultValue={mealData?.tags}
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                name="description"
                                defaultValue={mealData?.description}
                                rows="5"
                                className="textarea textarea-bordered w-full"
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="label">
                                <span className="label-text">User Email</span>
                            </label>
                            <input
                                value={user?.email || ''}
                                readOnly
                                className="input input-bordered w-full bg-base-200"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-error md:col-span-2"
                        >
                            Update Meal
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default MealUpdate;