import React from 'react';
import { motion } from 'framer-motion';
import {
    FaUserTie,
    FaEnvelope,
    FaUtensils,
    FaClipboardList,
    FaPlusCircle,
    FaArrowRight,
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
                className="relative overflow-hidden bg-gradient-to-br from-base-100 via-base-100 to-secondary/10 shadow-xl rounded-3xl p-6 md:p-10 border border-base-300/50"
            >
                {/* Decorative blobs */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />

                <div className="relative flex flex-col lg:flex-row items-center gap-8">

                    {/* Profile Image */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                        }}
                        className="relative"
                    >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-secondary to-primary blur-md opacity-40" />
                        <img
                            src={user?.photoURL}
                            alt={user?.displayName}
                            className="relative w-40 h-40 rounded-full border-4 border-secondary object-cover shadow-lg"
                        />
                        <span className="absolute bottom-2 right-2 bg-secondary text-secondary-content text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                            Chef
                        </span>
                    </motion.div>

                    {/* Chef Info */}
                    <div className="flex-1 text-center lg:text-left">

                        <h2 className="text-xl font-semibold text-secondary">
                            {greeting}
                        </h2>

                        <h1 className="text-4xl md:text-5xl font-bold mt-2 bg-gradient-to-r from-base-content to-secondary bg-clip-text text-transparent">
                            Welcome Chef 👨‍🍳
                        </h1>

                        <p className="mt-4 text-base-content/70 max-w-xl">
                            Manage your meals, monitor orders, and keep your
                            customers happy with delicious food.
                        </p>

                        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 justify-center lg:justify-start">

                            <div className="flex items-center justify-center lg:justify-start gap-2 bg-base-200/60 px-4 py-2 rounded-xl">
                                <FaUserTie className="text-secondary" />
                                <span className="font-medium">{user?.displayName}</span>
                            </div>

                            <div className="flex items-center justify-center lg:justify-start gap-2 bg-base-200/60 px-4 py-2 rounded-xl">
                                <FaEnvelope className="text-secondary" />
                                <span className="font-medium">{user?.email}</span>
                            </div>

                        </div>
                    </div>

                    {/* Chef Illustration - professional photo */}
                    <img
                        src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80"
                        alt="Professional Chef"
                        className="w-52 h-52 object-cover rounded-3xl shadow-xl hidden lg:block"
                    />
                </div>
            </motion.div>
            <h2 className="text-2xl my-6 font-bold mb-4">
                Quick Links
            </h2>
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">


                <Link to={'/dashboardLayouts/myMeals'}>
                    <motion.div
                        whileHover={{ scale: 1.03, y: -4 }}
                        className="group bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl p-6 border border-base-300/50 transition-shadow"
                    >
                        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-secondary/10 mb-4">
                            <FaUtensils className="text-2xl text-secondary" />
                        </div>
                        <h3 className="font-bold text-xl">
                            My Meals
                        </h3>
                        <p className="text-sm opacity-70 mt-1">
                            Add, update and manage your meal listings.
                        </p>
                        <span className="inline-flex items-center gap-2 text-secondary text-sm font-semibold mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            View <FaArrowRight />
                        </span>
                    </motion.div>
                </Link>

                <Link to={'/dashboardLayouts/orderRequest'}>
                    <motion.div
                        whileHover={{ scale: 1.03, y: -4 }}
                        className="group bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl p-6 border border-base-300/50 transition-shadow"
                    >
                        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-primary/10 mb-4">
                            <FaClipboardList className="text-2xl text-primary" />
                        </div>
                        <h3 className="font-bold text-xl">
                            Orders Request
                        </h3>
                        <p className="text-sm opacity-70 mt-1">
                            Track customer orders and delivery status.
                        </p>
                        <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            View <FaArrowRight />
                        </span>
                    </motion.div>
                </Link>

                <Link to="/dashboardLayouts/createMeal">
                    <motion.div
                        whileHover={{ scale: 1.03, y: -4 }}
                        className="group bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl p-6 border border-base-300/50 transition-shadow"
                    >
                        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-accent/10 mb-4">
                            <FaPlusCircle className="text-2xl text-accent" />
                        </div>

                        <h3 className="font-bold text-xl">
                            Create Meal
                        </h3>

                        <p className="text-sm opacity-70 mt-1">
                            Add new delicious meals and make them for customers.
                        </p>
                        <span className="inline-flex items-center gap-2 text-accent text-sm font-semibold mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            Create <FaArrowRight />
                        </span>
                    </motion.div>
                </Link>

            </div>

            {/* Bottom Banner */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="relative overflow-hidden mt-8 bg-gradient-to-r from-secondary via-secondary to-primary text-secondary-content rounded-3xl p-8 shadow-xl"
            >
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold">
                            Chef Workspace 🍽️
                        </h2>
                        <p className="mt-2 opacity-90 max-w-lg">
                            Create amazing meals, manage orders, and build your reputation through customer reviews.
                        </p>
                    </div>
                    <Link
                        to="/dashboardLayouts/createMeal"
                        className="btn btn-neutral rounded-xl gap-2 self-start md:self-auto"
                    >
                        <FaPlusCircle /> Add New Meal
                    </Link>
                </div>
            </motion.div>

        </div>
    );
};

export default ChefHome;