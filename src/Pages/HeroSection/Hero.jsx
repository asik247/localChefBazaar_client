import React from 'react';
import { motion } from "framer-motion";
import bannerImg from '../../assets/heroBanner1.jpg'
const Hero = () => {
  return (
    <section style={{background: 'rgba(17, 24, 39, 0.95'}} className="rounded-3xl max-w-7xl mx-auto px-6 py-10 overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-4">
            🍽 Easy Way to Order Your Food
          </p>

          <h1 className="text-4xl md:text-6xl font-extrabold  text-white leading-tight tracking-tight">
            Order Tasty &
            <br />
            Fresh Food
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Anytime!
            </span>
          </h1>

          <p className="text-gray-400 mt-6 max-w-md text-base leading-relaxed">
            Just confirm your order and enjoy our delicious
            homemade meals delivered fresh from local chefs.
          </p>

          <div className="flex gap-5 mt-8 items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="btn bg-gradient-to-r from-orange-400 to-red-500 border-none text-white font-semibold rounded-full px-8 shadow-lg shadow-red-500/30"
            >
              Order Now
            </motion.button>

            <button className="font-semibold text-orange-400 hover:text-orange-300 transition-colors underline underline-offset-4">
              See Menu
            </button>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="relative flex justify-center"
        >
          <motion.img
            animate={{
              y: [0, -20, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 4
            }}
            src={bannerImg}
            alt="Hero Image"
            className="w-full max-w-md max-h-120 rounded-2xl object-cover"
          />

          {/* Floating Review Card */}
          <motion.div
            animate={{
              y: [0, -10, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 3
            }}
            className="absolute top-20 right-0 bg-white rounded-xl p-3 shadow-xl"
          >
            <p className="font-semibold">
              Happy Customers
            </p>
            <p className="text-green-500">
              2k+
            </p>
          </motion.div>

          {/* Floating Emoji */}
          <motion.div
            animate={{
              rotate: 360
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "linear"
            }}
            className="absolute bottom-20 left-10 text-4xl"
          >
            😋
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;