import React from 'react';
import { motion } from 'framer-motion';
import {
    FaUserShield,
    FaEnvelope,
    FaUsers,
    FaUtensils,
    FaClipboardList,
    FaStar
} from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';


const AdminHome = () => {
    const { user } = useAuth();

    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? 'Good Morning ☀️'
            : hour < 18
                ? 'Good Afternoon 🌤️'
                : 'Good Evening 🌙';

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-base-100 shadow-xl rounded-3xl p-6 md:p-10"
            >
                <div className="flex flex-col lg:flex-row items-center gap-8">

                    {/* Admin Image */}
                    <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                        }}
                    >
                        <img
                            src={user?.photoURL}
                            alt={user?.displayName}
                            className="w-40 h-40 rounded-full border-4 border-primary object-cover shadow-xl"
                        />
                    </motion.div>

                    {/* Admin Info */}
                    <div className="flex-1 text-center lg:text-left">

                        <h2 className="text-xl font-semibold text-primary">
                            {greeting}
                        </h2>

                        <h1 className="text-4xl md:text-5xl font-bold mt-2">
                            Welcome Admin 👑
                        </h1>

                        <p className="mt-4 text-base-content/70">
                            Manage users, meals, reviews, orders and platform
                            activities from one central dashboard.
                        </p>

                        <div className="mt-6 space-y-3">

                            <div className="flex items-center justify-center lg:justify-start gap-3">
                                <FaUserShield />
                                <span>{user?.displayName}</span>
                            </div>

                            <div className="flex items-center justify-center lg:justify-start gap-3">
                                <FaEnvelope />
                                <span>{user?.email}</span>
                            </div>

                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-base-100 rounded-2xl shadow-lg p-6"
                >
                    <FaUsers className="text-4xl mb-3 text-primary" />
                    <h3 className="font-bold text-xl">
                        Users
                    </h3>
                    <p className="text-sm opacity-70">
                        Manage all registered users.
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-base-100 rounded-2xl shadow-lg p-6"
                >
                    <FaUtensils className="text-4xl mb-3 text-secondary" />
                    <h3 className="font-bold text-xl">
                        Meals
                    </h3>
                    <p className="text-sm opacity-70">
                        Add and manage meals.
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-base-100 rounded-2xl shadow-lg p-6"
                >
                    <FaClipboardList className="text-4xl mb-3 text-accent" />
                    <h3 className="font-bold text-xl">
                        Orders
                    </h3>
                    <p className="text-sm opacity-70">
                        Monitor customer orders.
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-base-100 rounded-2xl shadow-lg p-6"
                >
                    <FaStar className="text-4xl mb-3 text-warning" />
                    <h3 className="font-bold text-xl">
                        Reviews
                    </h3>
                    <p className="text-sm opacity-70">
                        Track user feedback.
                    </p>
                </motion.div>

            </div>

            {/* Bottom Banner */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 bg-primary text-primary-content rounded-3xl p-8"
            >
                <h2 className="text-2xl font-bold">
                    Admin Control Center 🚀
                </h2>

                <p className="mt-2 opacity-90">
                    Use the sidebar to navigate between users, meals,
                    reviews, orders and system management tools.
                </p>
            </motion.div>

        </div>
    );
};

export default AdminHome;