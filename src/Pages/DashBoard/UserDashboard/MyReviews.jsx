import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useInstanceSecqure from '../../../Hooks/useInstanceSecqure';
import Loading from '../../../Shares/Loading';

const MyReviews = () => {
    const { user, loading } = useAuth();
    const instanceSecqure = useInstanceSecqure();
    const reviewRef = useRef();

    const [selectedReview, setSelectedReview] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [saving, setSaving] = useState(false);

    const { data: reviewsData = [], isLoading, refetch } = useQuery({
        queryKey: ['reviews', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await instanceSecqure.get(`/reviews/user/${user?.email}`);
            return res.data;
        }
    });

    if (loading || isLoading) {
        return <Loading />;
    }

    // ? open edit modal with selected review info;
    const handlerModalOpen = (review) => {
        setSelectedReview(review);
        setRating(Number(review.rating));
        setComment(review.comment);
        reviewRef.current?.showModal();
    };

    // ? update review;
    const handlerEdit = async (id) => {
        const editInfo = { comment, rating };

        try {
            setSaving(true);
            await instanceSecqure.patch(`/reviews/update/${id}`, editInfo);
            reviewRef.current?.close();
            await refetch();

            Swal.fire({
                icon: 'success',
                title: 'Review Updated!',
                timer: 1500,
                showConfirmButton: false
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong',
                text: error?.response?.data?.message || 'Please try again.'
            });
        } finally {
            setSaving(false);
        }
    };

    // ? reusable readonly star rating for cards;
    const ReadonlyStars = ({ value }) => (
        <div className="rating rating-sm">
            {[1, 2, 3, 4, 5].map((n) => (
                <input
                    key={n}
                    type="radio"
                    className="mask mask-star-2 bg-red-400"
                    checked={Number(value) === n}
                    readOnly
                />
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-base-200/40">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

                {/* Header */}
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold tracking-[0.2em] text-red-500 uppercase mb-2">
                            Your feedback
                        </p>
                        <h1 className="text-3xl sm:text-4xl font-bold text-base-content tracking-tight">
                            My Reviews
                        </h1>
                    </div>

                    {/* Stat card */}
                    <div className="stats shadow rounded-2xl">
                        <div className="stat py-3 px-6">
                            <div className="stat-title text-xs">Total Reviews</div>
                            <div className="stat-value text-error text-3xl">
                                {reviewsData.length}
                            </div>
                        </div>
                    </div>
                </div>

                {reviewsData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-24 border border-dashed border-base-300 rounded-3xl bg-base-100">
                        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
                            <svg viewBox="0 0 24 24" className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8-1.06 0-2.077-.163-3.02-.463L3 21l1.5-4.5C3.55 15.163 3 13.63 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <p className="text-base-content font-semibold mb-1">No Reviews Found</p>
                        <p className="text-base-content/60 text-sm max-w-xs">
                            Meals you've reviewed will show up here so you can revisit or edit them anytime.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {reviewsData.map((review) => (
                            <div
                                key={review._id}
                                className="group flex flex-col justify-between rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm hover:shadow-xl hover:bg-red-50 transition-all duration-200"
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-2 mb-3">
                                        <h2 className="text-lg font-semibold text-base-content leading-snug">
                                            {review.mealName}
                                        </h2>
                                        <span className="badge badge-error badge-outline shrink-0 font-semibold">
                                            {review.rating}/5
                                        </span>
                                    </div>

                                    <ReadonlyStars value={review.rating} />

                                    <p className="mt-3 text-sm text-base-content/70 leading-relaxed line-clamp-3">
                                        {review.comment}
                                    </p>
                                </div>

                                <div className="mt-5 pt-4 border-t border-base-200 flex items-center justify-between">
                                    <p className="text-xs text-base-content/40 font-medium">
                                        {review.createdAt
                                            ? new Date(review.createdAt).toLocaleDateString('en-US', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })
                                            : 'N/A'}
                                    </p>
                                    <button
                                        onClick={() => handlerModalOpen(review)}
                                        className="btn btn-sm btn-error btn-outline rounded-full"
                                    >
                                        Edit Review
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal */}
                <dialog
                    ref={reviewRef}
                    className="modal backdrop:bg-transparent"
                >
                    <div className="modal-box rounded-3xl p-0 overflow-hidden max-w-md">
                        <div className="px-6 pt-6 pb-4 border-b border-base-200">
                            <p className="text-xs font-semibold tracking-widest text-red-500 uppercase mb-1">
                                Edit review
                            </p>
                            <h3 className="text-xl font-bold text-base-content">
                                {selectedReview?.mealName}
                            </h3>
                        </div>

                        <div className="px-6 py-5 space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-base-content/80 mb-2">
                                    Your rating
                                </label>
                                <div className="flex items-center gap-3">
                                    <div className="rating rating-lg">
                                        {[1, 2, 3, 4, 5].map((n) => (
                                            <input
                                                key={n}
                                                type="radio"
                                                name="edit-rating"
                                                className="mask mask-star-2 bg-red-400"
                                                checked={Number(rating) === n}
                                                onChange={() => setRating(n)}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm font-medium text-base-content/60">
                                        {rating}/5
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-base-content/80 mb-2">
                                    Your comment
                                </label>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    rows={4}
                                    placeholder="Share what you thought about this meal..."
                                    className="textarea textarea-bordered w-full rounded-xl focus:textarea-error resize-none"
                                />
                            </div>
                        </div>

                        <div className="modal-action px-6 py-4 bg-base-200/40 border-t border-base-200 m-0 flex items-center justify-end gap-2">
                            <form method="dialog">
                                <button className="btn btn-ghost rounded-full">
                                    Cancel
                                </button>
                            </form>
                            <button
                                onClick={() => handlerEdit(selectedReview?._id)}
                                disabled={saving}
                                className="btn btn-error rounded-full"
                            >
                                {saving ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm" />
                                        Saving...
                                    </>
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default MyReviews;