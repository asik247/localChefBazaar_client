import React from 'react';
import { motion } from "framer-motion";
import bannerImg from '../../assets/heroBanner1.jpg'
const Hero = () => {
   return (
       <section className=" bg-gray-200 min-h-screen max-w-7xl mx-auto px-6 py-10 overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-10 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-yellow-400 mb-4">
            🍽 EASY WAY TO ORDER YOUR FOOD
          </p>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Order Tasty &
            <br />
            Fresh Food
            <br />
            <span className="text-red-500">
              Anytime!
            </span>
          </h1>

          <p className="text-gray-400 mt-6 max-w-md">
            Just confirm your order and enjoy our delicious
            homemade meals delivered fresh from local chefs.
          </p>

          <div className="flex gap-5 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: .9 }}
              className="btn bg-red-500 border-none text-white rounded-full px-8"
            >
              Order Now
            </motion.button>

            <button className="font-semibold text-yellow-400 underline">
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
            className="w-full max-w-lg"
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