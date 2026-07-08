import React from 'react';
import { motion } from 'framer-motion';
import {
    FaUserTie,
    FaEnvelope,
    FaUtensils,
    FaStar,
    FaClipboardList,
    
} from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router';


const ChefHome = () => {
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

                    {/* Profile Image */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                        }}
                    >
                        <img
                            src={user?.photoURL}
                            alt={user?.displayName}
                            className="w-40 h-40 rounded-full border-4 border-secondary object-cover shadow-lg"
                        />
                    </motion.div>

                    {/* Chef Info */}
                    <div className="flex-1 text-center lg:text-left">

                        <h2 className="text-xl font-semibold text-secondary">
                            {greeting}
                        </h2>

                        <h1 className="text-4xl md:text-5xl font-bold mt-2">
                            Welcome Chef 👨‍🍳
                        </h1>

                        <p className="mt-4 text-base-content/70">
                            Manage your meals, monitor orders, and keep your
                            customers happy with delicious food.
                        </p>

                        <div className="mt-6 space-y-3">

                            <div className="flex items-center justify-center lg:justify-start gap-3">
                                <FaUserTie />
                                <span>{user?.displayName}</span>
                            </div>

                            <div className="flex items-center justify-center lg:justify-start gap-3">
                                <FaEnvelope />
                                <span>{user?.email}</span>
                            </div>

                        </div>
                    </div>

                    {/* Chef Illustration */}
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/5787/5787016.png"
                        alt="Chef"
                        className="w-52 hidden lg:block"
                    />
                </div>
            </motion.div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

                <Link to={'/dashboardLayouts/myMeals'}>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-base-100 rounded-2xl shadow-lg p-6"
                    >
                        <FaUtensils className="text-4xl mb-3 text-secondary" />
                        <h3 className="font-bold text-xl">
                            My Meals
                        </h3>
                        <p className="text-sm opacity-70">
                            Add, update and manage your meal listings.
                        </p>
                    </motion.div>

                </Link>
                <Link to={'/dashboardLayouts/orderRequest'}>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-base-100 rounded-2xl shadow-lg p-6"
                    >
                        <FaClipboardList className="text-4xl mb-3 text-primary" />
                        <h3 className="font-bold text-xl">
                            Orders Request
                        </h3>
                        <p className="text-sm opacity-70">
                            Track customer orders and delivery status.
                        </p>
                    </motion.div>
                </Link>

                <Link to="/dashboardLayouts/createMeal">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-base-100 rounded-2xl shadow-lg p-6"
                    >
                        <FaUtensils className="text-4xl mb-3 text-secondary" />

                        <h3 className="font-bold text-xl">
                            Create Meal
                        </h3>

                        <p className="text-sm opacity-70">
                            Add new delicious meals and make them for customers.
                        </p>
                    </motion.div>
                </Link>

            </div>

            {/* Bottom Banner */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 bg-secondary text-secondary-content rounded-3xl p-8"
            >
                <h2 className="text-2xl font-bold">
                    Chef Workspace 🍽️
                </h2>

                <p className="mt-2 opacity-90">
                    Create amazing meals, manage orders, and build your reputation through customer reviews.
                </p>
            </motion.div>

        </div>
    );
};

export default ChefHome;