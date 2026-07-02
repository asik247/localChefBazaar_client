import React from 'react';
import { Link } from 'react-router';

const Foot = () => {
  return (
    <footer className="bg-base-100 border-t border-base-300">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shrink-0 shadow-md shadow-red-500/30">
                <span className="text-white font-bold text-sm">🍽️</span>
              </div>
              <span className="font-bold text-base-content text-lg">
                Foodie<span className="text-red-500">Hub</span>
              </span>
            </div>
            <p className="text-sm text-base-content/60 max-w-xs leading-relaxed">
              Fresh meals from home chefs, delivered with care. Order, review, and
              keep track of your favorites in one place.
            </p>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest text-base-content/50 uppercase mb-4">
              Company
            </h3>
            <nav className="flex flex-col gap-2.5">
              <a className="text-sm text-base-content/70 hover:text-red-600 transition-colors w-fit">About us</a>
              <a className="text-sm text-base-content/70 hover:text-red-600 transition-colors w-fit">Contact</a>
              <a className="text-sm text-base-content/70 hover:text-red-600 transition-colors w-fit">Jobs</a>
              <a className="text-sm text-base-content/70 hover:text-red-600 transition-colors w-fit">Press kit</a>
            </nav>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest text-base-content/50 uppercase mb-4">
              Your account
            </h3>
            <nav className="flex flex-col gap-2.5">
              <Link to="/dashboardLayouts/myOrders" className="text-sm text-base-content/70 hover:text-red-600 transition-colors w-fit">My Orders</Link>
              <Link to="/dashboardLayouts/myReviews" className="text-sm text-base-content/70 hover:text-red-600 transition-colors w-fit">My Reviews</Link>
              <Link to="/dashboardLayouts/favorites" className="text-sm text-base-content/70 hover:text-red-600 transition-colors w-fit">My Favorites</Link>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-base-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-base-content/50">
            Copyright © {new Date().getFullYear()} — All rights reserved by FoodieHub
          </p>

          <div className="flex items-center gap-3">
            <a className="w-9 h-9 rounded-full bg-base-200 flex items-center justify-center text-base-content/60 hover:bg-red-500 hover:text-white transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="fill-current">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a className="w-9 h-9 rounded-full bg-base-200 flex items-center justify-center text-base-content/60 hover:bg-red-500 hover:text-white transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="fill-current">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a className="w-9 h-9 rounded-full bg-base-200 flex items-center justify-center text-base-content/60 hover:bg-red-500 hover:text-white transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="fill-current">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Foot;