import React, { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useInstanceSecqure from '../../../Hooks/useInstanceSecqure';
import Loading from '../../../Shares/Loading';

const MyReviews = () => {
    const { user, loading } = useAuth();
    const instanceSecqure = useInstanceSecqure();
    const reviewRef = useRef();
    const [sellectedReview, setSellectedReview] = useState(null);
    // ? 2 null state for rating and commented;
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const { data: reviewsData = [], isLoading } = useQuery({
        queryKey: ['reviews', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await instanceSecqure.get(
                `/reviews/user/${user?.email}`
            );
            return res.data;
        }
    });

    if (loading || isLoading) {
        return <Loading />;
    }
    //? Update reviews;
    const handlerModalOpen = (review) => {
        //! all review info store;
        setSellectedReview(review)
        // ? rating + comment;
        setRating(review.rating);
        setComment(review.comment)
        //! show moald
        reviewRef.current?.showModal()
    }
    const handlerEdit = (id) => {
        const editeInfo = {
            comment,
            rating
        }
        // console.log(editeInfo);
        instanceSecqure.patch(`/reviews/update/${id}`, editeInfo)
    }
    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                My Reviews ({reviewsData.length})
            </h1>

            {reviewsData.length === 0 ? (
                <p className="text-center text-gray-500">
                    No reviews found.
                </p>
            ) : (
                <div className="grid gap-4">
                    {reviewsData.map((review) => (
                        <div
                            key={review._id}
                            className="border rounded-lg p-5 shadow-sm"
                        >
                            <h2 className="text-xl font-semibold mb-2">
                                {review.mealName}
                            </h2>

                            <p className="mb-2">
                                <span className="font-semibold">
                                    Rating:
                                </span>{' '}
                                {review.rating}/5
                            </p>

                            <p className="mb-2">
                                <span className="font-semibold">
                                    Comment:
                                </span>{' '}
                                {review.comment}
                            </p>

                            <p className="text-sm text-gray-500">
                                <span className="font-semibold">
                                    Date:
                                </span>{' '}
                                {review.createdAt
                                    ? new Date(
                                        review.createdAt
                                    ).toLocaleDateString()
                                    : 'N/A'}
                            </p>
                            {/* edit + remove btn */}
                            <button onClick={() => handlerModalOpen(review)} className='my-2 bg-gray-500 p-2 rounded-2xl cursor-pointer'>Edit Review</button>
                        </div>
                    ))}
                </div>
            )}
            {/* modal */}

            <dialog ref={reviewRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{sellectedReview?.mealName}</h3>
                    <p className="py-4">Press ESC key or click the button below to close {sellectedReview?.rating}</p>
                    <label>Rating</label>
                    <input value={rating} onChange={(e) => setRating(e.target.value)} type="text" placeholder='Rating' />
                    <input value={comment} onChange={(e) => setComment(e.target.value)} type="text" placeholder='Rating' />
                    <div className="modal-action">
                        <button onClick={() => handlerEdit(sellectedReview._id)} className="btn">Edit</button>
                        <form method="dialog">

                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyReviews;