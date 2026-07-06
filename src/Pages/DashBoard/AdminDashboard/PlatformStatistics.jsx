
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useInstanceSecqure from '../../../Hooks/useInstanceSecqure';
import Loading from '../../../Shares/Loading';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';

const PlatformStatistics = () => {
    const instanceSecqure = useInstanceSecqure();

    const {
        data: allInfo = {},
        isLoading,
    } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await instanceSecqure.get('/admin-stats');
            return res.data;
        }
    });

    if (isLoading) {
        return <Loading />;
    }

    const orderData = [
        {
            name: 'Pending',
            value: allInfo.pendingOrders || 0,
        },
        {
            name: 'Delivered',
            value: allInfo.deliveredOrders || 0,
        },
    ];

    const paymentData = [
        {
            name: 'Payments',
            value: allInfo.totalPayment || 0,
        },
    ];

const COLORS = [
  '#2563eb', 
  '#059669', 
];
    return (
        <div className="min-h-screen bg-base-200/40">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10">

                {/* Header */}
                <div className="mb-8">
                    <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">
                        Admin Panel
                    </p>

                    <h1 className="text-3xl sm:text-4xl font-bold">
                        Platform Statistics
                    </h1>

                    <p className="text-base-content/60 mt-2">
                        Overview of platform performance and activity.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

                    <div className="stat bg-base-100 rounded-3xl shadow">
                        <div className="stat-title">
                            Total Users
                        </div>

                        <div className="stat-value text-primary">
                            {allInfo.totalUsers || 0}
                        </div>
                    </div>

                    <div className="stat bg-base-100 rounded-3xl shadow">
                        <div className="stat-title">
                            Total Payment
                        </div>

                        <div className="stat-value text-success">
                            ${allInfo.totalPayment || 0}
                        </div>
                    </div>

                    <div className="stat bg-base-100 rounded-3xl shadow">
                        <div className="stat-title">
                            Pending Orders
                        </div>

                        <div className="stat-value text-warning">
                            {allInfo.pendingOrders || 0}
                        </div>
                    </div>

                    <div className="stat bg-base-100 rounded-3xl shadow">
                        <div className="stat-title">
                            Delivered Orders
                        </div>

                        <div className="stat-value text-info">
                            {allInfo.deliveredOrders || 0}
                        </div>
                    </div>

                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Bar Chart */}
                    <div className="bg-base-100 rounded-3xl shadow p-6">
                        <h2 className="text-xl font-bold mb-5">
                            Orders Overview
                        </h2>

                        <ResponsiveContainer
                            width="100%"
                            height={320}
                        >
                            <BarChart data={orderData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                    dataKey="value"
                                    radius={[10, 10, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Pie Chart */}
                    <div className="bg-base-100 rounded-3xl shadow p-6">
                        <h2 className="text-xl font-bold mb-5">
                            Orders Distribution
                        </h2>

                        <ResponsiveContainer
                            width="100%"
                            height={320}
                        >
                            <PieChart>
                                <Pie
                                    data={orderData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={110}
                                    label
                                >
                                    {orderData.map((entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={
                                                COLORS[
                                                    index % COLORS.length
                                                ]
                                            }
                                        />
                                    ))}
                                </Pie>

                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                </div>

                {/* Payment Chart */}
                <div className="mt-8 bg-base-100 rounded-3xl shadow p-6">
                    <h2 className="text-xl font-bold mb-5">
                        Total Payment Overview
                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={320}
                    >
                        <BarChart data={paymentData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="value"
                                radius={[10, 10, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
};

export default PlatformStatistics;

