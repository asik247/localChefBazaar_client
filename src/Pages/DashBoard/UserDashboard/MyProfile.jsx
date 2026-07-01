import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useInstanceSecqure from '../../../Hooks/useInstanceSecqure';
import Swal from 'sweetalert2';

const MyProfile = () => {
    const { user } = useAuth();
    const instanceSecqure = useInstanceSecqure()

    const { data: userData = {} } = useQuery({
        queryKey: ['users', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await instanceSecqure(`/users/${user?.email}`)
            return res.data
        }
    })

    const handlerChefAdmin = (info) => {
        const requestInfo = {
            userName: userData.displayName,
            userEmail: userData.email,
            requestType: info,
            requestStatus: 'pending',
            requestTime: new Date()
        }
        instanceSecqure.post('/roleRequest', requestInfo)
            .then(res => {
                if (res.data.message == 'You already have a pending request.') {
                    return Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${info.charAt(0).toUpperCase() + info.slice(1)} Request Already Pending`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${info.charAt(0).toUpperCase() + info.slice(1)} Request Received`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handlerChef = () => handlerChefAdmin('chef');
    const handlerAdmin = () => handlerChefAdmin('admin');

    return (
        <div className="max-w-4xl mx-auto p-6 animate-[fadeIn_0.6s_ease-out]">
            <div className="card bg-base-100 shadow-xl border transition-all duration-300 hover:shadow-2xl">

                <div className="card-body">

                    <div className="flex flex-col md:flex-row items-center gap-6">

                        <img
                            src={userData?.photoURL}
                            alt="profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-primary transition-transform duration-300 hover:scale-105 hover:rotate-2 shadow-lg"
                        />

                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl font-bold animate-[slideIn_0.5s_ease-out]">
                                {userData?.displayName}
                            </h2>

                            <p className="text-gray-500">
                                {userData?.email}
                            </p>
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="grid md:grid-cols-2 gap-4">

                        <div className="bg-base-200 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:bg-base-300/50">
                            <h3 className="font-semibold">Address</h3>
                            <p>{userData?.address || 'Not Added Yet'}</p>
                        </div>

                        <div className="bg-base-200 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:bg-base-300/50">
                            <h3 className="font-semibold">Role</h3>
                            <p className="capitalize">
                                {userData?.role}
                            </p>
                        </div>

                        <div className="bg-base-200 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:bg-base-300/50">
                            <h3 className="font-semibold">Status</h3>

                            <span
                                className={`badge transition-all duration-300 ${userData?.status === 'active'
                                    ? 'badge-success animate-pulse'
                                    : 'badge-error'
                                    }`}
                            >
                                {userData?.status}
                            </span>
                        </div>

                    </div>

                    <div className="divider"></div>

                    <div className="flex flex-col md:flex-row gap-4">

                        <div className="flex flex-col sm:flex-row gap-3">
                            {userData?.role !== 'chef' && userData?.role !== 'admin' && (
                                <button
                                    onClick={() => handlerChef('chef')}
                                    className='btn bg-gradient-to-r from-orange-400 to-red-500 border-none text-white font-semibold rounded-full px-8 shadow-lg shadow-red-500/30 transition-all duration-300 hover:scale-105 hover:shadow-red-500/50 active:scale-95'
                                >
                                    🍳 Be a Chef
                                </button>
                            )}
                            {userData?.role !== 'admin' && (
                                <button
                                    onClick={() => handlerAdmin('admin')}
                                    className='btn bg-gradient-to-r from-orange-400 to-red-500 border-none text-white font-semibold rounded-full px-8 shadow-lg shadow-red-500/30 transition-all duration-300 hover:scale-105 hover:shadow-red-500/50 active:scale-95'
                                >
                                    👑 Be an Admin
                                </button>
                            )}
                        </div>

                    </div>

                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-15px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </div>
    );
};

export default MyProfile;