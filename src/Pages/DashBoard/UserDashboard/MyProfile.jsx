import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useInstanceSecqure from '../../../Hooks/useInstanceSecqure';
const MyProfile = () => {
    const { user } = useAuth();
    console.log('currnt user myprofiel', user);
    const instanceSecqure = useInstanceSecqure()
    //? get user data;
    const { data: userData = [] } = useQuery({
        queryKey: ['users', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await instanceSecqure(`/users/${user?.email}`)
            return res.data
        }
    })

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="card bg-base-100 shadow-xl border">

                <div className="card-body">

                    <div className="flex flex-col md:flex-row items-center gap-6">

                        <img
                            src={userData?.photoURL}
                            alt="profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-primary"
                        />

                        <div className="flex-1">
                            <h2 className="text-3xl font-bold">
                                {userData?.displayName}
                            </h2>

                            <p className="text-gray-500">
                                {userData?.email}
                            </p>
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="grid md:grid-cols-2 gap-4">

                        <div className="bg-base-200 p-4 rounded-xl">
                            <h3 className="font-semibold">Address</h3>
                            <p>{userData?.address || 'Not Added Yet'}</p>
                        </div>

                        <div className="bg-base-200 p-4 rounded-xl">
                            <h3 className="font-semibold">Role</h3>
                            <p className="capitalize">
                                {userData?.role}
                            </p>
                        </div>

                        <div className="bg-base-200 p-4 rounded-xl">
                            <h3 className="font-semibold">Status</h3>

                            <span
                                className={`badge ${userData?.status === 'active'
                                    ? 'badge-success'
                                    : 'badge-error'
                                    }`}
                            >
                                {userData?.status}
                            </span>
                        </div>

                        {/* {userData?.role === 'chef' && (
                            <div className="bg-base-200 p-4 rounded-xl">
                                <h3 className="font-semibold">Chef ID</h3>
                                <p>{userData?.chefId}</p>
                            </div>
                        )} */}
                    </div>

                    <div className="divider"></div>

                    <div className="flex flex-col md:flex-row gap-4">

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            {userData?.role !== 'chef' && userData?.role !== 'admin' && (
                                <button className='btn bg-gradient-to-r from-orange-400 to-red-500 border-none text-white font-semibold rounded-full px-8 shadow-lg shadow-red-500/30'>
                                    🍳 Be a Chef
                                </button>
                            )}
                            {userData?.role !== 'admin' && (
                                <button className='btn bg-gradient-to-r from-orange-400 to-red-500 border-none text-white font-semibold rounded-full px-8 shadow-lg shadow-red-500/30' >
                                    👑 Be an Admin
                                </button>
                            )}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default MyProfile;