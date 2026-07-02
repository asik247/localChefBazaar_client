import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import useInstance from '../../Hooks/useInstance';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
const Order = () => {
    const { user } = useAuth();
    const navegate = useNavigate()
    const { id } = useParams();
    const instance = useInstance();
    //Todo get db data;
    const { data: confarmOrderData = [] } = useQuery({
        queryKey: ['cardsData', id],
        queryFn: async () => {
            const res = await instance(`/cardsData/${id}`)
            return res.data
        }
    })
    //! handler order confarm;
   const handleOrder = async (e) => {
    e.preventDefault();
    const form = e.target;
    const quantity = parseInt(form.quantity.value);
    const userAddress = form.address.value;
    const totalPrice = confarmOrderData.price * quantity;
    const orderInfo = {
        foodId: confarmOrderData._id,
        mealName: confarmOrderData.name,
        price: confarmOrderData.price,
        quantity,
        chefId: confarmOrderData.chef_id,
        chefName: confarmOrderData.chef_name,
        paymentStatus: "pending",
        buyerName: user?.displayName,
        buyerEmail: user?.email,
        userAddress,
        orderStatus: "pending",
        orderTime: new Date().toISOString()
    };
    try {
        const result = await Swal.fire({
            title: `Your total price is ৳${totalPrice}`,
            text: "Do you want to confirm the order?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        });

        if (result.isConfirmed) {
            const res = await instance.post("/orders", orderInfo);

            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Order placed successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });

                form.reset();
            }
            navegate('/dashboardLayouts/myOrders')
        }

    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: "error",
            title: "Something went wrong!"
        });
    }
};
    return (
        <div className="flex justify-center items-center py-8">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-6 tracking-tight italic">
                    Confirm Your <span className="text-emerald-500">Order</span>
                </h1>
                {/* Form here */}
                <form onSubmit={handleOrder} className="space-y-5">
                    {/* Meal Name */}
                    <div>
                        <label className="block mb-1 font-medium">Meal Name</label>
                        <input
                            type="text"
                            value={confarmOrderData.name}
                            readOnly
                            className="w-full px-4 py-3 rounded-lg outline-none"
                            style={{
                                background: 'rgba(127,119,221,0.06)',
                                border: '0.5px solid rgba(127,119,221,0.3)'
                            }}
                            onFocus={e => {
                                e.target.style.background = 'rgba(127,119,221,0.12)';
                                e.target.style.border = '0.5px solid rgba(83,74,183,0.7)';
                                e.target.style.boxShadow = '0 0 0 3px rgba(83,74,183,0.12)';
                            }}
                            onBlur={e => {
                                e.target.style.background = 'rgba(127,119,221,0.06)';
                                e.target.style.border = '0.5px solid rgba(127,119,221,0.3)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>
                    {/* Price */}
                    <div>
                        <label className="block mb-1 font-medium">Price</label>
                        <input
                            type="number"
                            value={confarmOrderData.price}
                            readOnly
                            className="w-full px-4 py-3 rounded-lg outline-none"
                            style={{
                                background: 'rgba(127,119,221,0.06)',
                                border: '0.5px solid rgba(127,119,221,0.3)'
                            }}
                        />
                    </div>
                    {/* Quantity */}
                    <div>
                        <label className="block mb-1 font-medium">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            min="1"
                            defaultValue="1"
                            className="w-full px-4 py-3 rounded-lg outline-none"
                            style={{
                                background: 'rgba(127,119,221,0.06)',
                                border: '0.5px solid rgba(127,119,221,0.3)'
                            }}
                            onFocus={e => {
                                e.target.style.background = 'rgba(127,119,221,0.12)';
                                e.target.style.border = '0.5px solid rgba(83,74,183,0.7)';
                                e.target.style.boxShadow = '0 0 0 3px rgba(83,74,183,0.12)';
                            }}
                            onBlur={e => {
                                e.target.style.background = 'rgba(127,119,221,0.06)';
                                e.target.style.border = '0.5px solid rgba(127,119,221,0.3)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>
                    {/* Chef ID */}
                    <div>
                        <label className="block mb-1 font-medium">Chef ID</label>
                        <input
                            type="text"
                            value={confarmOrderData.chef_id}
                            readOnly
                            className="w-full px-4 py-3 rounded-lg outline-none"
                            style={{
                                background: 'rgba(127,119,221,0.06)',
                                border: '0.5px solid rgba(127,119,221,0.3)'
                            }}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Chef Name</label>
                        <input
                            type="text"
                            value={confarmOrderData.chef_name}
                            readOnly
                            className="w-full px-4 py-3 rounded-lg outline-none"
                            style={{
                                background: 'rgba(127,119,221,0.06)',
                                border: '0.5px solid rgba(127,119,221,0.3)'
                            }}
                        />
                    </div>
                    {/* User Email */}
                    <div>
                        <label className="block mb-1 font-medium">User Email</label>
                        <input
                            type="email"
                            value={user?.email}
                            readOnly
                            className="w-full px-4 py-3 rounded-lg outline-none"
                            style={{
                                background: 'rgba(127,119,221,0.06)',
                                border: '0.5px solid rgba(127,119,221,0.3)'
                            }}
                        />
                    </div>
                    {/* Address */}
                    <div>
                        <label className="block mb-1 font-medium">Delivery Address</label>
                        <textarea
                            name="address"
                            required
                            placeholder="Enter your address"
                            className="w-full px-4 py-3 rounded-lg outline-none"
                            rows="4"
                            style={{
                                background: 'rgba(127,119,221,0.06)',
                                border: '0.5px solid rgba(127,119,221,0.3)'
                            }}
                            onFocus={e => {
                                e.target.style.background = 'rgba(127,119,221,0.12)';
                                e.target.style.border = '0.5px solid rgba(83,74,183,0.7)';
                                e.target.style.boxShadow = '0 0 0 3px rgba(83,74,183,0.12)';
                            }}
                            onBlur={e => {
                                e.target.style.background = 'rgba(127,119,221,0.06)';
                                e.target.style.border = '0.5px solid rgba(127,119,221,0.3)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>
                    {/* Order Status */}
                    <div>
                        <label className="block mb-1 font-medium">Order Status</label>
                        <input
                            type="text"
                            value="pending"
                            readOnly
                            className="w-full px-4 py-3 rounded-lg outline-none"
                            style={{
                                background: 'rgba(127,119,221,0.06)',
                                border: '0.5px solid rgba(127,119,221,0.3)'
                            }}
                        />
                    </div>

                    {/* Order Time */}
                    <div>
                        <label className="block mb-1 font-medium">Order Time</label>
                        <input
                            type="text"
                            value={new Date().toLocaleString()}
                            readOnly
                            className="w-full px-4 py-3 rounded-lg outline-none"
                            style={{
                                background: 'rgba(127,119,221,0.06)',
                                border: '0.5px solid rgba(127,119,221,0.3)'
                            }}
                        />
                    </div>
                    {/* confram order btn here */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-orange-400 to-red-500"
                    >
                        Confirm Order
                    </button>

                </form>

            </div>
        </div>
    );
};

export default Order;