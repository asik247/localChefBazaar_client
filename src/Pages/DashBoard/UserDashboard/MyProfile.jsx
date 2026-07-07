import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useInstanceSecqure from '../../../Hooks/useInstanceSecqure';
import Loading from '../../../Shares/Loading';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
const MyProfile = () => {
    const { user, loading } = useAuth();
    const instanceSecqure = useInstanceSecqure();

    const { data: userData = {}, isLoading } = useQuery({
        queryKey: ['users', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await instanceSecqure(`/users/${user?.email}`);
            return res.data;
        }
    });

    if (loading || isLoading) {
        return <Loading></Loading>;
    }

    const handlerChefAdmin = (info) => {
        const requestInfo = {
            userName: userData.displayName,
            userEmail: userData.email,
            requestType: info,
            requestStatus: 'pending',
            requestTime: new Date()
        };
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
            });
    };

    const handlerChef = () => handlerChefAdmin('chef');
    const handlerAdmin = () => handlerChefAdmin('admin');

    return (
        <div className="min-h-screen bg-base-200/40">
              <Helmet>
                <title>DashBoard - Profile | LocalChefBazaar</title>
            </Helmet>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

                {/* Header */}
                <div className="mb-8">
                    <p className="text-xs font-semibold tracking-[0.2em] text-red-500 uppercase mb-2">
                        Account
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-bold text-base-content tracking-tight">
                        My Profile
                    </h1>
                </div>

                <div className="rounded-3xl border border-base-300 bg-base-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="p-6 sm:p-8">

                        {/* Identity */}
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <img
                                src={userData?.photoURL}
                                alt="profile"
                                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-red-100 shadow-md transition-transform duration-300 hover:scale-105"
                            />

                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-2xl sm:text-3xl font-bold text-base-content">
                                    {userData?.displayName}
                                </h2>
                                <p className="text-base-content/60 mt-1">
                                    {userData?.email}
                                </p>
                            </div>

                            <span
                                className={`badge badge-outline font-semibold capitalize ${userData?.status === 'active' ? 'badge-success' : 'badge-error'
                                    }`}
                            >
                                {userData?.status}
                            </span>
                        </div>

                        <div className="divider my-6"></div>

                        {/* Info grid */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="rounded-2xl border border-base-200 bg-base-200/40 p-4 hover:bg-red-50 hover:border-red-100 transition-all duration-200">
                                <h3 className="text-xs font-semibold tracking-widest text-base-content/50 uppercase mb-1">
                                    Address
                                </h3>
                                <p className="text-base-content font-medium">
                                    {userData?.address || 'Not Added Yet'}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-base-200 bg-base-200/40 p-4 hover:bg-red-50 hover:border-red-100 transition-all duration-200">
                                <h3 className="text-xs font-semibold tracking-widest text-base-content/50 uppercase mb-1">
                                    Role
                                </h3>
                                <p className="text-base-content font-medium capitalize">
                                    {userData?.role}
                                </p>
                            </div>
                            {/* Chef ID */}
                            {userData?.role === 'chef' && (
                                <div className="rounded-2xl border border-base-200 bg-base-200/40 p-4 hover:bg-red-50 hover:border-red-100 transition-all duration-200">
                                    <h3 className="text-xs font-semibold tracking-widest text-base-content/50 uppercase mb-1">
                                        Chef ID
                                    </h3>
                                    <p className="text-base-content font-medium">
                                        {userData?.chefId}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="divider my-6"></div>

                        {/* Role request actions */}
                        {(userData?.role !== 'chef' && userData?.role !== 'admin') || userData?.role !== 'admin' ? (
                            <div>
                                <h3 className="text-xs font-semibold tracking-widest text-base-content/50 uppercase mb-3">
                                    Grow your account
                                </h3>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    {userData?.role !== 'chef' && userData?.role !== 'admin' && (
                                        <button
                                            onClick={handlerChef}
                                            className="btn rounded-full px-8 text-white font-semibold border-none bg-gradient-to-r from-orange-400 to-red-500 shadow-md shadow-red-500/30 hover:scale-105 hover:shadow-red-500/50 active:scale-95 transition-all duration-300"
                                        >
                                            🍳 Be a Chef
                                        </button>
                                    )}
                                    {userData?.role !== 'admin' && (
                                        <button
                                            onClick={handlerAdmin}
                                            className="btn rounded-full px-8 text-white font-semibold border-none bg-gradient-to-r from-orange-400 to-red-500 shadow-md shadow-red-500/30 hover:scale-105 hover:shadow-red-500/50 active:scale-95 transition-all duration-300"
                                        >
                                            👑 Be an Admin
                                        </button>
                                    )}
                                </div>
                            </div>
                        ) : null}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;