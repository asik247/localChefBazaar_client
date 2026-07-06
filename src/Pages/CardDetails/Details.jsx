import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useParams } from 'react-router';

import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { Heart, Star, Clock, Flame, ChefHat, ShoppingBag, MapPin, Tag } from 'lucide-react';
import useInstanceSecqure from '../../Hooks/useInstanceSecqure';

const focusStyle = {
    background: 'rgba(127,119,221,0.12)',
    border: '0.5px solid rgba(83,74,183,0.7)',
    boxShadow: '0 0 0 3px rgba(83,74,183,0.12)',
};

const blurStyle = {
    background: 'rgba(127,119,221,0.06)',
    border: '0.5px solid rgba(127,119,221,0.3)',
    boxShadow: 'none',
};

const inputBase = {
    ...blurStyle,
    outline: 'none',
    transition: 'all 0.2s ease',
    borderRadius: '0.75rem',
    width: '100%',
    padding: '0.75rem 1rem',
    fontSize: '0.95rem',
    color: '#1e1b4b',
};

const Details = () => {
    const { user } = useAuth();
    const instanceSecqure = useInstanceSecqure()
    const { id } = useParams();
    // Todo cardDetailData get;
    const { data: cardDetailsData = [] } = useQuery({
        queryKey: ['cardsData', id],
        queryFn: async () => {
            const res = await instanceSecqure(`/cardsData/${id}`);
            return res.data;
        }
    });
    //Todo reviewsData get in db;
    const { refetch, data: reviewsData = [] } = useQuery({
        queryKey: ['reviews', id],
        queryFn: async () => {
            const res = await instanceSecqure(`/reviews/${id}`);
            return res.data;
        }
    });
    // ? get curent user user coll data;
    const { data: usersData = {} } = useQuery({
        queryKey: ['users', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await instanceSecqure.get(`/users/${user?.email}`)
            return res.data
        }
    })

    //? handler favrites;
    const handleFavorite = async () => {
        const favoriteInfo = {
            userEmail: user?.email,
            mealId: cardDetailsData._id,
            mealName: cardDetailsData.name,
            chefId: cardDetailsData.chef_id,
            chefName: cardDetailsData.chef_name,
            price: cardDetailsData.price,
            addedTime: new Date().toISOString()
        };

        Swal.fire({
            title: "Add to Favorite?",
            text: "This meal will be added to your favorites.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await instanceSecqure.post('/favorites', favoriteInfo);
                if (res.data.insertedId) {
                    Swal.fire('Success!', 'Added to favorites.', 'success');
                }
                if (res.data.message === 'already-exists') {
                    Swal.fire('Already Exists', 'This meal is already in favorites.', 'warning');
                }
            }
        });
    };
    //? handler reviews;
    const handleReviews = async (e) => {
        e.preventDefault();
        const form = e.target;
        const reviewData = {
            mealId: cardDetailsData._id,
            mealName: cardDetailsData.name,
            userName: user?.displayName,
            userEmail: user?.email,
            userImage: user?.photoURL,
            rating: form.rating.value,
            comment: form.comment.value,
            createdAt: new Date().toISOString()
        };
        form.reset();
        Swal.fire({
            title: "Post your review?",
            text: "This will be visible to everyone.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#534ab7",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, post it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await instanceSecqure.post('/reviews', reviewData);
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Posted!",
                        text: "Your review has been published.",
                        icon: "success"
                    });
                }
                refetch()
            }
        });
    };

    const avgRating = reviewsData.length
        ? (reviewsData.reduce((sum, r) => sum + Number(r.rating), 0) / reviewsData.length).toFixed(1)
        : null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-orange-50/20">
            <div className="max-w-5xl mx-auto px-4 py-12">

                {/* ── DETAILS CARD ── */}
                <div className="bg-white rounded-3xl shadow-2xl shadow-purple-100/60 overflow-hidden border border-purple-100/40">
                    <div className="grid md:grid-cols-2">

                        {/* IMAGE SIDE */}
                        <div className="relative min-h-72 md:min-h-full">
                            <img
                                src={cardDetailsData.image}
                                alt={cardDetailsData.name}
                                className="w-full h-full object-cover"
                            />

                            {/* Dark gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                            {/* Availability badge */}
                            <span className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase backdrop-blur-sm ${cardDetailsData.is_available
                                ? 'bg-emerald-500/90 text-white'
                                : 'bg-red-500/90 text-white'}`}>
                                {cardDetailsData.is_available ? '● Available' : '● Unavailable'}
                            </span>

                            {/* Favorite button */}
                            <button
                                onClick={handleFavorite}
                                className="absolute cursor-pointer top-4 left-4 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 hover:bg-white transition-all duration-200"
                            >
                                <Heart className="text-rose-500" size={20} fill="#f43f5e" />
                            </button>

                            {/* Rating pill at bottom of image */}
                            {avgRating && (
                                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow">
                                    <Star size={14} className="text-amber-400 fill-amber-400" />
                                    <span className="text-sm font-semibold text-gray-800">{avgRating}</span>
                                    <span className="text-xs text-gray-500">({reviewsData.length})</span>
                                </div>
                            )}
                        </div>

                        {/* CONTENT SIDE */}
                        <div className="p-8 flex flex-col justify-between">
                            <div>
                                {/* Category eyebrow */}
                                <span className="text-xs font-semibold tracking-widest uppercase text-orange-600">
                                    {cardDetailsData.category}
                                </span>

                                <h1 className="text-3xl font-extrabold text-gray-900 mt-1 mb-1 leading-tight">
                                    {cardDetailsData.name}
                                </h1>

                                <div className="flex items-center gap-2 mb-4">
                                    <ChefHat size={15} className="text-orange-600" />
                                    <span className="text-sm text-gray-500">
                                        by <span className="font-semibold text-gray-700">{cardDetailsData.chef_name}</span>
                                    </span>
                                </div>

                                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                    {cardDetailsData.description}
                                </p>

                                {/* STATS GRID */}
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 p-4 rounded-2xl">
                                        <p className="text-xs text-orange-600 font-medium mb-1">Price</p>
                                        <p className="text-2xl font-black text-orange-600">৳{cardDetailsData.price}</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 p-4 rounded-2xl">
                                        <p className="text-xs text-emerald-500 font-medium mb-1">Portion</p>
                                        <p className="text-lg font-bold text-emerald-700">{cardDetailsData.portion}</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100 p-4 rounded-2xl flex items-center gap-2">
                                        <Clock size={18} className="text-orange-600 shrink-0" />
                                        <div>
                                            <p className="text-xs text-orange-600 font-medium">Prep Time</p>
                                            <p className="font-bold text-orange-600">{cardDetailsData.prep_time_minutes} min</p>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 p-4 rounded-2xl flex items-center gap-2">
                                        <Flame size={18} className="text-emerald-500 shrink-0" />
                                        <div>
                                            <p className="text-xs text-emerald-500 font-medium">Calories</p>
                                            <p className="font-bold text-emerald-500">{cardDetailsData.calories} kcal</p>
                                        </div>
                                    </div>
                                </div>

                                {/* SPICE + CATEGORY BADGES */}
                                <div className="flex flex-wrap gap-2 mb-5">
                                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-violet-100 text-orange-600 border border-violet-200">
                                        {cardDetailsData.category}
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-500 border border-red-200">
                                        🌶 Spice {cardDetailsData.spice_level}
                                    </span>
                                </div>

                                {/* DELIVERY AREAS */}
                                <div className="mb-4">
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <MapPin size={14} className="text-gray-400" />
                                        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                                            Delivery Areas
                                        </h3>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {
                                            Array.isArray(cardDetailsData?.delivery_areas)
                                                ? cardDetailsData.delivery_areas.map((area, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium"
                                                    >
                                                        {area}
                                                    </span>
                                                ))
                                                : (
                                                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                                                        {cardDetailsData?.delivery_areas}
                                                    </span>
                                                )
                                        }
                                    </div>
                                </div>

                                {/* TAGS */}
                                <div className="mb-6">
                                    <div className="flex items-center gap-1.5 mb-2">
                                        <Tag size={14} className="text-gray-400" />
                                        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                                            Tags
                                        </h3>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {(Array.isArray(cardDetailsData?.tags)
                                            ? cardDetailsData.tags
                                            : String(cardDetailsData?.tags || '')
                                                .split(',')
                                                .map(tag => tag.trim())
                                                .filter(Boolean)
                                        ).map((tag, i) => (
                                            <span
                                                key={i}
                                                className="text-xs px-2.5 py-1 rounded-full bg-sky-50 text-orange-600 border border-sky-200 font-medium"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* ORDER BUTTON */}
                            {
                                usersData?.status === 'fraud' ? (
                                    <button
                                        disabled
                                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-sm tracking-wide btn btn-error"
                                    >
                                        <ShoppingBag size={18} />
                                        Fraud Users Can't Order
                                    </button>
                                ) : (
                                    <Link
                                        to={`/orders/${cardDetailsData._id}`}
                                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-white text-sm tracking-wide bg-gradient-to-r from-orange-400 to-red-500"
                                    >
                                        <ShoppingBag size={18} />
                                        Order Now
                                    </Link>
                                )
                            }

                        </div>
                    </div>
                </div>

                {/* ── REVIEW FORM ── */}
                <div className="mt-10 bg-white rounded-3xl shadow-xl shadow-purple-100/40 border border-purple-100/40 p-8">
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Leave a Review</h2>
                    <p className="text-sm text-gray-400 mb-6">Share your experience with this meal</p>

                    <form onSubmit={handleReviews} className="space-y-4">

                        {/* Rating input */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
                                Rating (1–5)
                            </label>
                            <input
                                type="number"
                                name="rating"
                                min="1"
                                max="5"
                                placeholder="e.g. 4"
                                required
                                style={inputBase}
                                onFocus={e => Object.assign(e.target.style, focusStyle)}
                                onBlur={e => Object.assign(e.target.style, blurStyle)}
                            />
                        </div>

                        {/* Comment textarea */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
                                Your Comment
                            </label>
                            <textarea
                                name="comment"
                                placeholder="Write your honest review..."
                                required
                                rows={4}
                                style={{ ...inputBase, resize: 'vertical' }}
                                onFocus={e => Object.assign(e.target.style, focusStyle, { resize: 'vertical' })}
                                onBlur={e => Object.assign(e.target.style, blurStyle, { resize: 'vertical' })}
                            />
                        </div>

                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-orange-400 to-red-500"
                        >
                            <Star size={16} />
                            Submit Review
                        </button>
                    </form>
                </div>

                {/* ── REVIEWS LIST ── */}
                <div className="mt-10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-extrabold text-gray-900">
                            Customer Reviews
                        </h2>
                        <span className="text-sm font-semibold px-3 py-1 rounded-full bg-violet-100 text-orange-600 border border-violet-200">
                            {reviewsData.length} {reviewsData.length === 1 ? 'review' : 'reviews'}
                        </span>
                    </div>

                    {reviewsData.length === 0 ? (
                        <div className="text-center py-16 text-gray-400">
                            <Star size={40} className="mx-auto mb-3 opacity-30" />
                            <p className="font-medium">No reviews yet — be the first!</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {reviewsData.map((review, index) => (
                                <div
                                    key={index}
                                    className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-violet-100 transition-all duration-200"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={review.userImage}
                                                alt={review.userName}
                                                className="w-12 h-12 rounded-full object-cover border-2 border-violet-100 shrink-0"
                                            />
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-sm">
                                                    {review.userName}
                                                </h3>
                                                <div className="flex items-center gap-1 mt-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={12}
                                                            className={i < Number(review.rating)
                                                                ? 'text-amber-400 fill-amber-400'
                                                                : 'text-gray-200 fill-gray-200'}
                                                        />
                                                    ))}
                                                    <span className="text-xs text-gray-400 ml-1">
                                                        {review.rating}/5
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-400 shrink-0 mt-1">
                                            {new Date(review.createdAt).toLocaleDateString('en-US', {
                                                month: 'short', day: 'numeric', year: 'numeric'
                                            })}
                                        </span>
                                    </div>

                                    <p className="mt-3 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                                        {review.comment}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Details;