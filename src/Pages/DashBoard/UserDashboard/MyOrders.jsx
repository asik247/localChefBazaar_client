import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import Loading from '../../../Shares/Loading';
import { useQuery } from '@tanstack/react-query';
import useInstanceSecqure from '../../../Hooks/useInstanceSecqure';
const MyOrders = () => {
    //? current user get;
    const { user, loading } = useAuth();
    const instanceSecqure = useInstanceSecqure()
    // console.log('current user order page', user);
    //! load login user orders info in db;
    const { data: ordersData = [] } = useQuery({
        queryKey: ['orders', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await instanceSecqure.get(`/orders/${user?.email}`)
            return res.data
        }
    })
    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className=" w-full max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {ordersData.map((order) => (
                <div
                    key={order._id}
                    className="bg-white rounded-3xl overflow-hidden border border-orange-100 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                   
                    {/* Content */}
                    <div className="p-5 space-y-3">
                        <h2 className="text-xl font-bold text-gray-800">
                            {order.mealName}
                        </h2>

                        <div className="space-y-2 text-sm text-gray-600">
                            <p>
                                <span className="font-semibold">Price:</span> ৳{order.price}
                            </p>

                            <p>
                                <span className="font-semibold">Quantity:</span>{" "}
                                {order.quantity}
                            </p>

                            <p>
                                <span className="font-semibold">Delivery Time:</span>{" "}
                                {order.orderTime}
                            </p>

                            <p>
                                <span className="font-semibold">Chef Name:</span>{" "}
                                {order.chefName}
                            </p>

                            <p>
                                <span className="font-semibold">Chef ID:</span>{" "}
                                {order.chefId}
                            </p>
                        </div>

                        {/* Payment Status */}
                        <div className="flex justify-between items-center pt-2">
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-bold ${order.paymentStatus === "paid"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-600"
                                    }`}
                            >
                                {order.paymentStatus}
                            </span>

                            {/* Conditional Pay Button */}
                            {order.orderStatus === "accepted" &&
                                order.paymentStatus === "Pending" && (
                                    <button
                                        className="px-5 py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-orange-400 to-red-500 hover:scale-105 transition"
                                    >
                                        Pay Now
                                    </button>
                                )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyOrders;