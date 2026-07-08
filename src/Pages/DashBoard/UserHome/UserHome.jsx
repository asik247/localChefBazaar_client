import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaIdCard } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';


const UserHome = () => {
    const { user } = useAuth()

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
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
                            className="w-40 h-40 rounded-full border-4 border-primary object-cover shadow-lg"
                        />
                    </motion.div>

                    {/* User Info */}
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-3xl md:text-5xl font-bold mb-3">
                            Welcome, {user?.displayName} 👋
                        </h1>

                        <p className="text-base-content/70 mb-6">
                            Great to see you again. Here's your account overview.
                        </p>

                        <div className="space-y-3">

                            <div className="flex items-center justify-center lg:justify-start gap-3">
                                <FaUser />
                                <span>{user?.displayName}</span>
                            </div>

                            <div className="flex items-center justify-center lg:justify-start gap-3">
                                <FaEnvelope />
                                <span>{user?.email}</span>
                            </div>

                            <div className="flex items-center justify-center lg:justify-start gap-3">
                                <FaIdCard />
                                <span>
                                    UID: {user?.uid?.slice(0, 12)}...
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Extra Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-base-100 shadow-xl rounded-2xl p-6"
                >
                    <h3 className="text-xl font-bold mb-2">
                        Account Status
                    </h3>

                    <p>
                        {user?.emailVerified
                            ? 'Verified ✅'
                            : 'Not Verified ⚠️'}
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-base-100 shadow-xl rounded-2xl p-6"
                >
                    <h3 className="text-xl font-bold mb-2">
                        Login Method
                    </h3>

                    <p>
                        {user?.providerData?.[0]?.providerId}
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-base-100 shadow-xl rounded-2xl p-6"
                >
                    <h3 className="text-xl font-bold mb-2">
                        Member Since
                    </h3>

                    <p>
                        {new Date(
                            Number(user?.metadata?.creationTime)
                        ).toLocaleDateString()}
                    </p>
                </motion.div>

            </div>
        </div>
    );
};

export default UserHome;