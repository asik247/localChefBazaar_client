import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useInstanceSecqure from '../../../Hooks/useInstanceSecqure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Shares/Loading';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const OrderRequest = () => {
    const { user } = useAuth();
    const email = user?.email;
    const instanceSecqure = useInstanceSecqure()
    // ? get curent user user coll data;
    const { data: usersData, isLoading = {} } = useQuery({
        queryKey: ['users', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await instanceSecqure.get(`/users/${user?.email}`)
            return res.data
        }
    })
    // ? get chef itmes order coll;
    const { data: orderData = [], refetch } = useQuery({
        queryKey: ['orders', usersData?.chefId, user?.email],
        enabled: !!usersData?.chefId,
        queryFn: async () => {
            const res = await instanceSecqure.get(`/orders/chefOrder/${usersData?.chefId}`, {
                params: {
                    email: email
                }
            })
            return res.data
        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }
    //? All Action handler code here;
    const handleOrderStatus = async (id, status) => {
        instanceSecqure.patch(`/orders/statusUpdate/${id}`, {
            status
        })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: `Order ${status} Successfully`,
                        timer: 1500,
                        showConfirmButton: false
                    });
                    refetch();
                }
            })


    };

    return (
        <div className="min-h-screen bg-base-200/40">
            <Helmet>
                <title>ChefDashBoard - OrderRequest | LocalChefBazaar</title>
            </Helmet>
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

                {/* Header */}
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold tracking-[0.2em] text-red-500 uppercase mb-2">
                            Chef Orders
                        </p>

                        <h1 className="text-3xl sm:text-4xl font-bold text-base-content tracking-tight">
                            Order Requests
                        </h1>
                    </div>

                    <div className="stats shadow rounded-2xl">
                        <div className="stat py-3 px-6">
                            <div className="stat-title text-xs">
                                Total Orders
                            </div>

                            <div className="stat-value text-error text-3xl">
                                {orderData.length}
                            </div>
                        </div>
                    </div>
                </div>

                {orderData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-24 border border-dashed border-base-300 rounded-3xl bg-base-100">

                        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
                            📦
                        </div>

                        <p className="text-base-content font-semibold mb-1">
                            No Order Requests
                        </p>

                        <p className="text-base-content/60 text-sm">
                            New orders from customers will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                        {orderData.map((order) => (
                            <div
                                key={order._id}
                                className="group flex flex-col justify-between rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm hover:shadow-xl hover:bg-red-50 transition-all duration-200"
                            >

                                {/* Top */}
                                <div>

                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <h2 className="text-lg font-semibold">
                                            {order.foodName}
                                        </h2>

                                        <span
                                            className={`badge ${order.orderStatus === "pending"
                                                ? "badge-warning"
                                                : order.orderStatus === "accepted"
                                                    ? "badge-info"
                                                    : order.orderStatus === "delivered"
                                                        ? "badge-success"
                                                        : "badge-error"
                                                }`}
                                        >
                                            {order.orderStatus}
                                        </span>
                                    </div>

                                    <div className="space-y-2 text-sm">

                                        <p>
                                            <span className="font-semibold">
                                                Price:
                                            </span>{" "}
                                            ৳{order.price}
                                        </p>

                                        <p>
                                            <span className="font-semibold">
                                                Quantity:
                                            </span>{" "}
                                            {order.quantity}
                                        </p>

                                        <p className="break-all">
                                            <span className="font-semibold">
                                                User Email:
                                            </span>{" "}
                                            {order.buyerEmail}
                                        </p>

                                        <p>
                                            <span className="font-semibold">
                                                Address:
                                            </span>{" "}
                                            {order.userAddress}
                                        </p>

                                        <p>
                                            <span className="font-semibold">
                                                Payment:
                                            </span>{" "}
                                            {order.paymentStatus}
                                        </p>

                                        <p>
                                            <span className="font-semibold">
                                                Order Time:
                                            </span>{" "}
                                            {new Date(
                                                order.orderTime
                                            ).toLocaleString()}
                                        </p>

                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="mt-5 pt-4 border-t border-base-200">

                                    <div className="grid grid-cols-3 gap-2">

                                        <button onClick={() => handleOrderStatus(order._id, "canceled")}
                                            className="btn btn-sm btn-error"
                                            disabled={
                                                order.orderStatus !== "pending"
                                            }
                                        >
                                            Cancel
                                        </button>

                                        <button onClick={() => handleOrderStatus(order._id, "accepted")}
                                            className="btn btn-sm btn-info"
                                            disabled={
                                                order.orderStatus !== "pending"
                                            }
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleOrderStatus(order._id, "preparing")}
                                            className="btn btn-sm btn-warning"
                                            disabled={order.orderStatus !== "accepted"}
                                        >
                                            Preparing
                                        </button>

                                        <button onClick={() => handleOrderStatus(order._id, "delivered")}
                                            className="btn btn-sm btn-success"
                                            disabled={
                                                order.orderStatus !== "preparing"
                                            }
                                        >
                                            Deliver
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

export default OrderRequest;