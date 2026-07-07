import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useInstanceSecqure from '../../../Hooks/useInstanceSecqure';
import Loading from '../../../Shares/Loading';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const ManageRequest = () => {
    const instanceSecqure = useInstanceSecqure();
    const {
        data: requestData = [],
        isLoading, refetch
    } = useQuery({
        queryKey: ['roleRequest'],
        queryFn: async () => {
            const res = await instanceSecqure.get('/roleRequest');
            return res.data;
        }
    });

    if (isLoading) {
        return <Loading />;
        
    }
    //! handlerRequstAccepted;
    const handlerRequstAccepted = (id, email, requestType) => {
        instanceSecqure.patch(`/users/requestUpdate/${id}`, {
            email, requestType: requestType
        })
            .then(res => {
                if (res.data.requestResult?.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title:`${requestType} request has been approved successfully.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }
            })
    }
    //!handlerRejected;
    const handlerRejected = (id) => {
        instanceSecqure.patch(`/roleRequest/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "The request has been rejected successfully.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }
            })
    }
    return (
        <div className="min-h-screen bg-base-200/40">
            <Helmet>
                <title>AdminDashBoard - ManageUserRequest | LocalChefBazaar</title>
            </Helmet>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

                {/* Header */}
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">
                            Admin Panel
                        </p>

                        <h1 className="text-3xl sm:text-4xl font-bold">
                            Manage Requests
                        </h1>

                        <p className="text-base-content/60 mt-2">
                            Review and manage role requests submitted by users.
                        </p>
                    </div>

                    <div className="stats shadow rounded-2xl">
                        <div className="stat py-3 px-6">
                            <div className="stat-title">
                                Total Requests
                            </div>
                            <div className="stat-value text-primary">
                                {requestData.length}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                {requestData.length === 0 ? (
                    <div className="bg-base-100 rounded-3xl border border-dashed border-base-300 py-24 text-center">
                        <h2 className="text-xl font-semibold">
                            No Requests Found
                        </h2>

                        <p className="text-base-content/60 mt-2">
                            No role requests have been submitted yet.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Mobile Cards */}
                        <div className="grid grid-cols-1 gap-4 md:hidden">
                            {requestData.map((request) => (
                                <div
                                    key={request._id}
                                    className="bg-base-100 rounded-3xl border border-base-300 p-5 shadow-sm"
                                >
                                    <div className="space-y-3">

                                        <div>
                                            <p className="text-xs text-base-content/50">
                                                User Name
                                            </p>
                                            <h3 className="font-semibold">
                                                {request.userName}
                                            </h3>
                                        </div>

                                        <div>
                                            <p className="text-xs text-base-content/50">
                                                User Email
                                            </p>
                                            <p className="break-all">
                                                {request.userEmail}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-base-content/50">
                                                    Request Type
                                                </p>

                                                <span
                                                    className={`badge ${request.requestType === 'chef'
                                                        ? 'badge-primary'
                                                        : 'badge-secondary'
                                                        }`}
                                                >
                                                    {request.requestType}
                                                </span>
                                            </div>

                                            <div>
                                                <p className="text-xs text-base-content/50">
                                                    Status
                                                </p>

                                                <span
                                                    className={`badge ${request.requestStatus === 'approved'
                                                        ? 'badge-success'
                                                        : request.requestStatus === 'rejected'
                                                            ? 'badge-error'
                                                            : 'badge-warning'
                                                        }`}
                                                >
                                                    {request.requestStatus}
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-xs text-base-content/50">
                                                Request Time
                                            </p>

                                            <p>
                                                {new Date(
                                                    request.requestTime
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                        {/* 2 Action Btn here in mobile view */}
                                        <div className="grid grid-cols-2 gap-3 pt-3">
                                            <button onClick={() => handlerRequstAccepted(request._id, request.userEmail, request.requestType)}
                                                disabled={
                                                    request.requestStatus !==
                                                    'pending'
                                                }
                                                className="btn btn-success btn-sm"
                                            >
                                                Accept
                                            </button>

                                            <button onClick={() => handlerRejected(request._id)}
                                                disabled={
                                                    request.requestStatus !==
                                                    'pending'
                                                }
                                                className="btn btn-error btn-sm"
                                            >
                                                Reject
                                            </button>
                                        </div>
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
                                            <th>Request Type</th>
                                            <th>Status</th>
                                            <th>Request Time</th>
                                            <th className="text-center">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {requestData.map(
                                            (request, index) => (
                                                <tr
                                                    key={request._id}
                                                    className="hover:bg-base-200/40 transition"
                                                >
                                                    <td>{index + 1}</td>

                                                    <td className="font-semibold">
                                                        {request.userName}
                                                    </td>

                                                    <td>
                                                        {request.userEmail}
                                                    </td>

                                                    <td>
                                                        <span
                                                            className={`badge ${request.requestType ===
                                                                'chef'
                                                                ? 'badge-primary'
                                                                : 'badge-secondary'
                                                                }`}
                                                        >
                                                            {
                                                                request.requestType
                                                            }
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <span
                                                            className={`badge ${request.requestStatus ===
                                                                'approved'
                                                                ? 'badge-success'
                                                                : request.requestStatus ===
                                                                    'rejected'
                                                                    ? 'badge-error'
                                                                    : 'badge-warning'
                                                                }`}
                                                        >
                                                            {
                                                                request.requestStatus
                                                            }
                                                        </span>
                                                    </td>

                                                    <td>
                                                        {new Date(
                                                            request.requestTime
                                                        ).toLocaleDateString()}
                                                    </td>

                                                    <td>
                                                        {/* 2 Action Btn Here */}
                                                        <div className="flex justify-center gap-2">
                                                            <button onClick={() => handlerRequstAccepted(request._id, request.userEmail, request.requestType)}
                                                                disabled={
                                                                    request.requestStatus !==
                                                                    'pending'
                                                                }
                                                                className="btn btn-success btn-sm"
                                                            >
                                                                Accept
                                                            </button>

                                                            <button onClick={() => handlerRejected(request._id)}
                                                                disabled={
                                                                    request.requestStatus !==
                                                                    'pending'
                                                                }
                                                                className="btn btn-error btn-sm"
                                                            >
                                                                Reject
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        )}
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

export default ManageRequest;

