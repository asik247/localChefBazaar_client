import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import Loading from '../../../Shares/Loading';
import { useQuery } from '@tanstack/react-query';
import useInstanceSecqure from '../../../Hooks/useInstanceSecqure';
import { Helmet } from 'react-helmet-async';

const MyOrders = () => {
    //? current user get;
    const { user, loading } = useAuth();
    const instanceSecqure = useInstanceSecqure();

    //! load login user orders info in db;
    const { data: ordersData = [], isLoading } = useQuery({
        queryKey: ['orders', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await instanceSecqure.get(`/orders/${user?.email}`);
            return res.data;
        }
    });

    if (loading || isLoading) {
        return <Loading></Loading>;
    }

    //! handler payment;
    const handlerPayment = (order) => {
        //? post ordersInfo server side;
        const ordersInfo = {
            mealName: order.mealName,
            foodId: order.foodId,
            trackingId: order.trackingId,
            price: order.price,
            buyerEmail: order.buyerEmail
        };
        instanceSecqure.post('/create-checkout-session', ordersInfo)
            .then(res => {
                window.location.assign(res.data.url);
            }).catch(err => {
                console.log(err);
            });
    };

    // ? quick stats derived from orders;
    const totalOrders = ordersData.length;
    const paidCount = ordersData.filter((o) => o.paymentStatus === 'paid').length;
    const pendingCount = ordersData.filter((o) => o.paymentStatus === 'pending').length;
    const totalSpent = ordersData
        .filter((o) => o.paymentStatus === 'paid')
        .reduce((sum, o) => sum + Number(o.price || 0), 0);

    return (
        <div className="min-h-screen bg-base-200/40">
             <Helmet>
                <title>UserDashBoard - MyOrders | LocalChefBazaar</title>
            </Helmet>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

                {/* Header */}
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold tracking-[0.2em] text-red-500 uppercase mb-2">
                            Order history
                        </p>
                        <h1 className="text-3xl sm:text-4xl font-bold text-base-content tracking-tight">
                            My Orders
                        </h1>
                    </div>

                    {/* Stats row */}
                    <div className="stats shadow rounded-2xl">
                        <div className="stat py-3 px-6">
                            <div className="stat-title text-xs">Total Orders</div>
                            <div className="stat-value text-base-content text-3xl">
                                {totalOrders}
                            </div>
                        </div>
                        <div className="stat py-3 px-6">
                            <div className="stat-title text-xs">Paid</div>
                            <div className="stat-value text-success text-3xl">
                                {paidCount}
                            </div>
                        </div>
                        <div className="stat py-3 px-6">
                            <div className="stat-title text-xs">Pending</div>
                            <div className="stat-value text-error text-3xl">
                                {pendingCount}
                            </div>
                        </div>
                        <div className="stat py-3 px-6">
                            <div className="stat-title text-xs">Total Spent</div>
                            <div className="stat-value text-base-content text-3xl">
                                ৳{totalSpent}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Empty state */}
                {ordersData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-24 border border-dashed border-base-300 rounded-3xl bg-base-100">
                        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
                            <svg viewBox="0 0 24 24" className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <p className="text-base-content font-semibold mb-1">No orders yet</p>
                        <p className="text-base-content/60 text-sm max-w-xs">
                            Meals you order will show up here so you can track and pay for them.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {ordersData.map((order) => (
                            <div
                                key={order._id}
                                className="group flex flex-col justify-between rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm hover:shadow-xl hover:bg-red-50 transition-all duration-200"
                            >
                                <div>
                                    <div className="flex items-start justify-between gap-2 mb-3">
                                        <h2 className="text-lg font-semibold text-base-content leading-snug">
                                            {order.mealName}
                                        </h2>
                                        <span
                                            className={`badge badge-outline shrink-0 font-semibold capitalize ${order.paymentStatus === 'paid' ? 'badge-success' : 'badge-error'
                                                }`}
                                        >
                                            {order.paymentStatus}
                                        </span>
                                    </div>

                                    <div className="space-y-1.5 text-sm text-base-content/70">
                                        <p>
                                            <span className="font-semibold text-base-content/90">Price:</span> ৳{order.price}
                                        </p>
                                        <p>
                                            <span className="font-semibold text-base-content/90">Quantity:</span> {order.quantity}
                                        </p>
                                        <p>
                                            <span className="font-semibold text-base-content/90">Delivery Time:</span> {order.orderTime}
                                        </p>
                                        <p>
                                            <span className="font-semibold text-base-content/90">Chef Name:</span> {order.chefName}
                                        </p>
                                        <p className="truncate">
                                            <span className="font-semibold text-base-content/90">Chef ID:</span> {order.chefId}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 pt-4 border-t border-base-200 flex items-center justify-between">
                                    <span className="text-xs text-base-content/40 font-medium capitalize">
                                        {order.orderStatus}
                                    </span>

                                    {order.orderStatus === 'accepted' && order.paymentStatus === 'pending' && (
                                        <button
                                            onClick={() => handlerPayment(order)}
                                            className="btn btn-sm rounded-full text-white bg-gradient-to-r from-orange-400 to-red-500 border-none shadow-md shadow-red-500/30 hover:scale-105 hover:shadow-red-500/50 active:scale-95 transition-all duration-300"
                                        >
                                            Pay Now
                                        </button>
                                    )}
                                </div>
                                {/* pipeline */}
                                <div className="mt-4 border-t border-base-200 pt-4">
                                    <h3 className="font-semibold text-sm mb-3">
                                        Order Tracking
                                    </h3>

                                    <ul className="timeline timeline-vertical">

                                        {/* Order Placed */}
                                        <li>
                                            <div className="timeline-start text-xs text-base-content/60">
                                                {order.orderTime
                                                    ? new Date(order.orderTime).toLocaleString()
                                                    : "--"}
                                            </div>

                                            <div className="timeline-middle text-success">
                                                ✅
                                            </div>

                                            <div className="timeline-end timeline-box">
                                                Order Placed
                                            </div>

                                            {(order.orderStatus !== "pending") && <hr />}
                                        </li>

                                        {/* Accepted */}
                                        {order.acceptedAt && (
                                            <li>
                                                <hr />

                                                <div className="timeline-start text-xs text-base-content/60">
                                                    {new Date(order.acceptedAt).toLocaleString()}
                                                </div>

                                                <div className="timeline-middle text-info">
                                                    🍳
                                                </div>

                                                <div className="timeline-end timeline-box">
                                                    Accepted By Chef
                                                </div>

                                                {(order.orderStatus === "delivered" ||
                                                    order.orderStatus === "canceled") && <hr />}
                                            </li>
                                        )}
                                        {order.preparingAt && (
                                            <li>
                                                <hr />

                                                <div className="timeline-start text-xs text-base-content/60">
                                                    {new Date(order.preparingAt).toLocaleString()}
                                                </div>

                                                <div className="timeline-middle text-warning">
                                                    👨‍🍳
                                                </div>

                                                <div className="timeline-end timeline-box">
                                                    Preparing Food
                                                </div>

                                                {(order.orderStatus === "delivered" ||
                                                    order.orderStatus === "canceled") && <hr />}
                                            </li>
                                        )}

                                        {/* Delivered */}
                                        {order.deliveredAt && (
                                            <li>
                                                <hr />

                                                <div className="timeline-start text-xs text-base-content/60">
                                                    {new Date(order.deliveredAt).toLocaleString()}
                                                </div>

                                                <div className="timeline-middle text-success">
                                                    🚚
                                                </div>

                                                <div className="timeline-end timeline-box">
                                                    Delivered
                                                </div>
                                            </li>
                                        )}

                                        {/* Cancel */}
                                        {order.canceledAt && (
                                            <li>
                                                <hr />

                                                <div className="timeline-start text-xs text-base-content/60">
                                                    {new Date(order.canceledAt).toLocaleString()}
                                                </div>

                                                <div className="timeline-middle text-error">
                                                    ❌
                                                </div>

                                                <div className="timeline-end timeline-box">
                                                    Order Canceled
                                                </div>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </div>

        </div>
    );
};

export default MyOrders;