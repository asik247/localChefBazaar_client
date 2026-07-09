import React from 'react';
import { motion } from 'framer-motion';
import {
    FaUserShield,
    FaEnvelope,
    FaUsers,
    FaClipboardList,
    FaArrowRight,
    FaChartLine,
} from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router';

const AdminHome = () => {
    const { user } = useAuth();

    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? 'Good Morning ☀️'
            : hour < 18
                ? 'Good Afternoon 🌤️'
                : 'Good Evening 🌙';

    const stats = [
        {
            icon: FaUsers,
            title: 'Manage Users',
            desc: 'Manage all registered users.',
            link: '/dashboardLayouts/manageUsers',
            bg: 'bg-primary/10',
            text: 'text-primary',
        },
        {
            icon: FaClipboardList,
            title: 'Manage Request',
            desc: 'Review and handle chef requests.',
            link: '/dashboardLayouts/manageRequest',
            bg: 'bg-secondary/10',
            text: 'text-secondary',
        },
        {
            icon: FaChartLine,
            title: 'Platform Statistics',
            desc: 'View platform performance and insights.',
            link: '/dashboardLayouts/platformStatistics',
            bg: 'bg-accent/10',
            text: 'text-accent',
        },
        {
            icon: FaUserShield,
            title: 'My Profile',
            desc: 'View and update your admin profile.',
            link: '/dashboardLayouts/myProfile',
            bg: 'bg-warning/10',
            text: 'text-warning',
        },
    ];

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative overflow-hidden bg-gradient-to-br from-base-100 via-base-100 to-primary/10 shadow-xl rounded-3xl p-6 md:p-10 border border-base-300/50"
            >
                {/* Decorative blobs */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />

                <div className="relative flex flex-col lg:flex-row items-center gap-8">

                    {/* Admin Image */}
                    <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                        }}
                        className="relative"
                    >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-accent blur-md opacity-40" />
                        <img
                            src={user?.photoURL}
                            alt={user?.displayName}
                            className="relative w-40 h-40 rounded-full border-4 border-primary object-cover shadow-xl"
                        />
                        <span className="absolute bottom-2 right-2 bg-primary text-primary-content text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                            Admin
                        </span>
                    </motion.div>

                    {/* Admin Info */}
                    <div className="flex-1 text-center lg:text-left">

                        <h2 className="text-xl font-semibold text-primary">
                            {greeting}
                        </h2>

                        <h1 className="text-4xl md:text-5xl font-bold mt-2 bg-gradient-to-r from-base-content to-primary bg-clip-text text-transparent">
                            Welcome Admin 👑
                        </h1>

                        <p className="mt-4 text-base-content/70 max-w-xl">
                            Manage users, meals, reviews, orders and platform
                            activities from one central dashboard.
                        </p>

                        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 justify-center lg:justify-start">

                            <div className="flex items-center justify-center lg:justify-start gap-2 bg-base-200/60 px-4 py-2 rounded-xl">
                                <FaUserShield className="text-primary" />
                                <span className="font-medium">{user?.displayName}</span>
                            </div>

                            <div className="flex items-center justify-center lg:justify-start gap-2 bg-base-200/60 px-4 py-2 rounded-xl">
                                <FaEnvelope className="text-primary" />
                                <span className="font-medium">{user?.email}</span>
                            </div>

                        </div>
                    </div>

                    {/* Admin Illustration - professional photo */}
                    <img
                        src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80"
                        alt="Admin Dashboard"
                        className="w-52 h-52 object-cover rounded-3xl shadow-xl hidden lg:block"
                    />
                </div>
            </motion.div>

            {/* Feature Cards */}
            <h2 className="text-2xl my-6 font-bold mb-4">
                Quick Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

                {stats.map(({ icon: Icon, title, desc, link, bg, text }) => (
                    <Link key={title} to={link}>
                        <motion.div
                            whileHover={{ scale: 1.05, y: -4 }}
                            className="group bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl p-6 border border-base-300/50 transition-shadow h-full"
                        >
                            <div className={`w-14 h-14 flex items-center justify-center rounded-xl ${bg} mb-4`}>
                                <Icon className={`text-2xl ${text}`} />
                            </div>
                            <h3 className="font-bold text-xl">
                                {title}
                            </h3>
                            <p className="text-sm opacity-70 mt-1">
                                {desc}
                            </p>
                            <span className={`inline-flex items-center gap-2 ${text} text-sm font-semibold mt-4 opacity-0 group-hover:opacity-100 transition-opacity`}>
                                Manage <FaArrowRight />
                            </span>
                        </motion.div>
                    </Link>
                ))}

            </div>

            {/* Bottom Banner */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="relative overflow-hidden mt-8 bg-gradient-to-r from-primary via-primary to-accent text-primary-content rounded-3xl p-8 shadow-xl"
            >
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            Admin Control Center <FaChartLine />
                        </h2>
                        <p className="mt-2 opacity-90 max-w-lg">
                            Use the sidebar to navigate between users, meals,
                            reviews, orders and system management tools.
                        </p>
                    </div>
                </div>
            </motion.div>

        </div>
    );
};

export default AdminHome;