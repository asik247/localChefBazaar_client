import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useInstanceSecqure from '../../../Hooks/useInstanceSecqure';
import Loading from '../../../Shares/Loading';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const ManageUsers = () => {
    const instanceSecqure = useInstanceSecqure();

    const {
        data: usersData = [],
        isLoading,
        refetch
    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await instanceSecqure.get('/users');
            return res.data;
        }
    });

    const handleMakeFraud = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This user will be marked as fraud!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Make Fraud'
        }).then((result) => {
            if (result.isConfirmed) {
                instanceSecqure.patch(`/users/fraud/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'User marked as fraud successfully',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            refetch();
                        }
                    });
            }
        });
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-base-200/40">
            <Helmet>
                <title>AdminDashBoard - ManageUsers | LocalChefBazaar</title>
            </Helmet>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

                {/* Header */}
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">
                            Admin Panel
                        </p>

                        <h1 className="text-3xl sm:text-4xl font-bold">
                            Manage Users
                        </h1>

                        <p className="text-base-content/60 mt-2">
                            View and manage all platform users.
                        </p>
                    </div>

                    <div className="stats shadow rounded-2xl">
                        <div className="stat py-3 px-6">
                            <div className="stat-title">
                                Total Users
                            </div>

                            <div className="stat-value text-primary">
                                {usersData.length}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                {usersData.length === 0 ? (
                    <div className="bg-base-100 rounded-3xl border border-dashed border-base-300 py-24 text-center">
                        <h2 className="text-xl font-semibold">
                            No Users Found
                        </h2>

                        <p className="text-base-content/60 mt-2">
                            No users available right now.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Mobile View */}
                        <div className="grid grid-cols-1 gap-4 md:hidden">
                            {usersData.map((user) => (
                                <div
                                    key={user._id}
                                    className="bg-base-100 rounded-3xl border border-base-300 p-5 shadow-sm"
                                >
                                    <div className="space-y-3">

                                        <div>
                                            <p className="text-xs text-base-content/50">
                                                User Name
                                            </p>

                                            <h3 className="font-semibold">
                                                {user.displayName}
                                            </h3>
                                        </div>

                                        <div>
                                            <p className="text-xs text-base-content/50">
                                                User Email
                                            </p>

                                            <p className="break-all">
                                                {user.email}
                                            </p>
                                        </div>

                                        <div className="flex justify-between">
                                            <div>
                                                <p className="text-xs text-base-content/50">
                                                    Role
                                                </p>

                                                <span
                                                    className={`badge ${user.role === 'admin'
                                                        ? 'badge-error'
                                                        : user.role === 'chef'
                                                            ? 'badge-primary'
                                                            : 'badge-secondary'
                                                        }`}
                                                >
                                                    {user.role}
                                                </span>
                                            </div>

                                            <div>
                                                <p className="text-xs text-base-content/50">
                                                    Status
                                                </p>

                                                <span
                                                    className={`badge ${user.status === 'fraud'
                                                        ? 'badge-error'
                                                        : 'badge-success'
                                                        }`}
                                                >
                                                    {user.status || 'active'}
                                                </span>
                                            </div>
                                        </div>

                                        {user.role !== 'admin' && (
                                            <button
                                                onClick={() =>
                                                    handleMakeFraud(user._id)
                                                }
                                                disabled={
                                                    user.status === 'fraud'
                                                }
                                                className="btn btn-warning btn-sm w-full"
                                            >
                                                {user.status === 'fraud'
                                                    ? 'Fraud User'
                                                    : 'Make Fraud'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Table */}
                        <div className="hidden md:block rounded-3xl border border-base-300 bg-base-100 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr className="bg-base-200/60">
                                            <th>#</th>
                                            <th>User Name</th>
                                            <th>User Email</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th className="text-center">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {usersData.map((user, index) => (
                                            <tr
                                                key={user._id}
                                                className="hover:bg-base-200/40 transition"
                                            >
                                                <td>{index + 1}</td>

                                                <td className="font-semibold">
                                                    {user.displayName}
                                                </td>

                                                <td>{user.email}</td>

                                                <td>
                                                    <span
                                                        className={`badge ${user.role ===
                                                            'admin'
                                                            ? 'badge-error'
                                                            : user.role ===
                                                                'chef'
                                                                ? 'badge-primary'
                                                                : 'badge-secondary'
                                                            }`}
                                                    >
                                                        {user.role}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span
                                                        className={`badge ${user.status ===
                                                            'fraud'
                                                            ? 'badge-error'
                                                            : 'badge-success'
                                                            }`}
                                                    >
                                                        {user.status ||
                                                            'active'}
                                                    </span>
                                                </td>

                                                <td>
                                                    <div className="flex justify-center">
                                                        {user.role !==
                                                            'admin' && (
                                                                <button
                                                                    onClick={() =>
                                                                        handleMakeFraud(
                                                                            user._id
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        user.status ===
                                                                        'fraud'
                                                                    }
                                                                    className="btn btn-warning btn-sm"
                                                                >
                                                                    {user.status ===
                                                                        'fraud'
                                                                        ? 'Fraud User'
                                                                        : 'Make Fraud'}
                                                                </button>
                                                            )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;

