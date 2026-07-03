
import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import axios from 'axios';
import useInstanceSecqure from '../../../Hooks/useInstanceSecqure';
import Swal from 'sweetalert2';
const CreateMeal = () => {
    const { user } = useAuth();
    const instanceSecqure = useInstanceSecqure()
    const {
        register,
        handleSubmit,
        reset
    } = useForm();
    const handleCreateMeal = async (data) => {
        try {
            const imageFile = data.image[0];
            if (!imageFile) {
                alert("Please select an image");
                return;
            }
            const formData = new FormData();
            formData.append("image", imageFile);
            const image_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imabb_key}`;
            const imgRes = await axios.post(image_api_url, formData);
            const mealInfo = {
                name: data.foodName,
                category: data.category,
                chef_id: data.chefId,
                chef_name: data.chefName,
                price: Number(data.price),
                portion: data.portion,
                prep_time_minutes: Number(data.deliveryTime),
                calories: Number(data.calories),
                spice_level: data.spiceLevel,
                is_available: true,
                delivery_areas: data.deliveryAreas.split(',').map(area => area.trim()),
                tags: data.tags.split(',').map(tag => tag.trim()),
                ingredients: data.ingredients.split(',').map(item => item.trim()),
                description: data.description,
                rating: Number(data.rating),
                chefExperience: data.chefExperience,
                image: imgRes.data.data.url,
                userEmail: user?.email,
                createdAt: new Date(),
            };
            instanceSecqure.post('/cardsData', mealInfo)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your meal has been successfully created",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
            // reset();
        } catch (error) {
            console.error(error);
            alert("Failed to create meal. Please try again.");
        }
    };
    return (
        <div className="min-h-screen bg-base-200/40">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

                {/* Header */}
                <div className="mb-8">
                    <p className="text-xs font-semibold tracking-[0.2em] text-red-500 uppercase mb-2">
                        Chef Panel
                    </p>

                    <h1 className="text-3xl sm:text-4xl font-bold text-base-content">
                        Create Meal
                    </h1>

                    <p className="text-base-content/60 mt-2">
                        Add a new meal to the platform.
                    </p>
                </div>

                <div className="bg-base-100 rounded-3xl border border-base-300 shadow-sm p-6 md:p-8">

                    <form
                        onSubmit={handleSubmit(handleCreateMeal)}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    >

                        {/* Food Name */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">
                                    Food Name
                                </span>
                            </label>

                            <input
                                {...register('foodName')}
                                type="text"
                                placeholder="Food Name"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">
                                    Category
                                </span>
                            </label>

                            <input
                                {...register('category')}
                                type="text"
                                placeholder="Beef & Mutton"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Chef Name */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">
                                    Chef Name
                                </span>
                            </label>

                            <input
                                {...register('chefName')}
                                defaultValue={user?.displayName}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Chef ID ✅✅ */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">
                                    Chef ID
                                </span>
                            </label>

                            <input
                                {...register('chefId')}
                                placeholder="CHEF-1001"
                                className="input input-bordered w-full bg-base-200"
                                required
                            />
                        </div>

                        {/* Food Image✅✅ */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">
                                    Food Image
                                </span>
                            </label>

                            <input
                                {...register('image')}
                                type="file"

                                className="file-input file-input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">
                                    Price
                                </span>
                            </label>

                            <input
                                {...register('price')}
                                type="number"
                                placeholder="420"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Portion */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">
                                    Portion
                                </span>
                            </label>

                            <input
                                {...register('portion')}
                                type="text"
                                placeholder="2 Persons"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Delivery Time */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">
                                    Preparation Time (Minutes)
                                </span>
                            </label>

                            <input
                                {...register('deliveryTime')}
                                type="number"
                                placeholder="150"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Calories */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">
                                    Calories
                                </span>
                            </label>

                            <input
                                {...register('calories')}
                                type="number"
                                placeholder="820"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">
                                    Rating
                                </span>
                            </label>

                            <input
                                {...register('rating')}
                                type="number"
                                defaultValue={0}
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* Spice Level */}
                        <div>
                            <label className="label">
                                <span className="label-text font-medium">
                                    Spice Level
                                </span>
                            </label>

                            <select
                                {...register('spiceLevel')}
                                className="select select-bordered w-full"
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>

                        {/* Chef Experience */}
                        <div className="md:col-span-2">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Chef Experience
                                </span>
                            </label>

                            <textarea
                                {...register('chefExperience')}
                                rows="3"
                                className="textarea textarea-bordered w-full"
                                placeholder="5 years of experience..."
                                required
                            />
                        </div>

                        {/* Ingredients */}
                        <div className="md:col-span-2">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Ingredients
                                </span>
                            </label>

                            <textarea
                                {...register('ingredients')}
                                rows="4"
                                className="textarea textarea-bordered w-full"
                                placeholder="Mutton, Onion, Garlic, Salt"
                                required
                            />
                        </div>

                        {/* Delivery Areas */}
                        <div className="md:col-span-2">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Delivery Areas
                                </span>
                            </label>

                            <input
                                {...register('deliveryAreas')}
                                placeholder="Dhaka, Savar, Gazipur"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        {/* Tags */}
                        <div className="md:col-span-2">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Tags
                                </span>
                            </label>

                            <input
                                {...register('tags')}
                                placeholder="Popular, Spicy, Eid Special"
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Description
                                </span>
                            </label>

                            <textarea
                                {...register('description')}
                                rows="5"
                                className="textarea textarea-bordered w-full"
                                placeholder="Write meal description..."
                                required
                            />
                        </div>

                        {/* User Email */}
                        <div className="md:col-span-2">
                            <label className="label">
                                <span className="label-text font-medium">
                                    User Email
                                </span>
                            </label>

                            <input
                                value={user?.email || ''}
                                readOnly
                                className="input input-bordered w-full bg-base-200"
                            />
                        </div>

                        <div className="md:col-span-2 mt-3">
                            <button
                                type="submit"
                                className="btn btn-error w-full rounded-xl"
                            >
                                Create Meal
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateMeal;

