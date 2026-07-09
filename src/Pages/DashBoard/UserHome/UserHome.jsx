import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaIdCard, FaClipboardList, FaHandHoldingHeart, FaArrowRight } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { MdReviews } from 'react-icons/md';
import useAuth from '../../../Hooks/useAuth';
import { Link } from 'react-router';

const UserHome = () => {
    const { user } = useAuth();

    const quickLinks = [
        {
            icon: CgProfile,
            title: 'My Profile',
            desc: 'View and edit your personal information.',
            link: '/dashboardLayouts/myProfile',
            bg: 'bg-primary/10',
            text: 'text-primary',
        },
        {
            icon: FaClipboardList,
            title: 'My Orders',
            desc: 'Track and review your past orders.',
            link: '/dashboardLayouts/myOrders',
            bg: 'bg-secondary/10',
            text: 'text-secondary',
        },
        {
            icon: MdReviews,
            title: 'My Reviews',
            desc: 'See the reviews you have shared.',
            link: '/dashboardLayouts/myReviews',
            bg: 'bg-accent/10',
            text: 'text-accent',
        },
        {
            icon: FaHandHoldingHeart,
            title: 'My Favorites',
            desc: 'Meals and chefs you love the most.',
            link: '/dashboardLayouts/favorites',
            bg: 'bg-error/10',
            text: 'text-error',
        },
    ];

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative overflow-hidden bg-gradient-to-br from-base-100 via-base-100 to-primary/10 shadow-xl rounded-3xl p-6 md:p-10 border border-base-300/50"
            >
                {/* Decorative blobs */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />

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
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-secondary blur-md opacity-40" />
                        <img
                            src={user?.photoURL}
                            alt={user?.displayName}
                            className="relative w-40 h-40 rounded-full border-4 border-primary object-cover shadow-lg"
                        />
                        <span className="absolute bottom-2 right-2 bg-primary text-primary-content text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                            Member
                        </span>
                    </motion.div>

                    {/* User Info */}
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-base-content to-primary bg-clip-text text-transparent">
                            Welcome, {user?.displayName} 👋
                        </h1>

                        <p className="text-base-content/70 mb-6 max-w-xl">
                            Great to see you again. Here's your account overview.
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 justify-center lg:justify-start flex-wrap">

                            <div className="flex items-center justify-center lg:justify-start gap-2 bg-base-200/60 px-4 py-2 rounded-xl">
                                <FaUser className="text-primary" />
                                <span className="font-medium">{user?.displayName}</span>
                            </div>

                            <div className="flex items-center justify-center lg:justify-start gap-2 bg-base-200/60 px-4 py-2 rounded-xl">
                                <FaEnvelope className="text-primary" />
                                <span className="font-medium">{user?.email}</span>
                            </div>

                            <div className="flex items-center justify-center lg:justify-start gap-2 bg-base-200/60 px-4 py-2 rounded-xl">
                                <FaIdCard className="text-primary" />
                                <span className="font-medium">
                                    UID: {user?.uid?.slice(0, 12)}...
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Account Overview Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

                <motion.div
                    whileHover={{ scale: 1.03, y: -4 }}
                    className="bg-base-100 shadow-lg hover:shadow-2xl rounded-2xl p-6 border border-base-300/50 transition-shadow"
                >
                    <h3 className="text-xl font-bold mb-2">
                        Account Status
                    </h3>

                    <p className={user?.emailVerified ? 'text-success font-medium' : 'text-warning font-medium'}>
                        {user?.emailVerified
                            ? 'Verified ✅'
                            : 'Not Verified ⚠️'}
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.03, y: -4 }}
                    className="bg-base-100 shadow-lg hover:shadow-2xl rounded-2xl p-6 border border-base-300/50 transition-shadow"
                >
                    <h3 className="text-xl font-bold mb-2">
                        Login Method
                    </h3>

                    <p className="text-base-content/70 font-medium">
                        {user?.providerData?.[0]?.providerId}
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.03, y: -4 }}
                    className="bg-base-100 shadow-lg hover:shadow-2xl rounded-2xl p-6 border border-base-300/50 transition-shadow"
                >
                    <h3 className="text-xl font-bold mb-2">
                        Member Since
                    </h3>

                    <p className="text-base-content/70 font-medium">
                        {new Date(
                            Number(user?.metadata?.creationTime)
                        ).toLocaleDateString()}
                    </p>
                </motion.div>

            </div>

            {/* Quick Links */}
            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">
                    Quick Links
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {quickLinks.map(({ icon: Icon, title, desc, link, bg, text }) => (
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
                                    Open <FaArrowRight />
                                </span>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default UserHome;