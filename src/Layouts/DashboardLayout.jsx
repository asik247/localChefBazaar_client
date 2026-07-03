import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaChartBar, FaClipboardCheck, FaClipboardList, FaHandHoldingHeart, FaHome, FaPlusCircle, FaUsersCog, FaUtensils } from 'react-icons/fa';
import { MdPendingActions, MdReviews } from "react-icons/md";
import { Link, Outlet, useLocation } from 'react-router';
import useRole from '../Hooks/useRole';

const userLinks = [
    { to: '/dashboardLayouts', label: 'Home', icon: FaHome, end: true },
    { to: '/dashboardLayouts/myProfile', label: 'My Profile', icon: CgProfile },
    { to: '/dashboardLayouts/myOrders', label: 'My Orders', icon: FaClipboardList },
    { to: '/dashboardLayouts/myReviews', label: 'My Reviews', icon: MdReviews },
    { to: '/dashboardLayouts/favorites', label: 'My Favorites', icon: FaHandHoldingHeart },
];
const chefLinks = [
    { to: '/dashboardLayouts', label: 'Home', icon: FaHome, end: true },
    { to: '/dashboardLayouts/myProfileChef', label: 'My Profile', icon: CgProfile },
    { to: '/dashboardLayouts/createMeal', label: 'Create Meal', icon: FaPlusCircle },
    { to: '/dashboardLayouts/myMeals', label: 'My Meal', icon: FaUtensils },
    { to: '/dashboardLayouts/orderRequest', label: 'Order Request', icon: MdPendingActions },
];
const adminLinks = [
    { to: '/dashboardLayouts', label: 'Home', icon: FaHome, end: true },
    { to: '/dashboardLayouts/adminProfile', label: 'My Profile', icon: CgProfile },
    { to: '/dashboardLayouts/manageUsers', label: 'Manage Users', icon: FaUsersCog },
    { to: '/dashboardLayouts/manageRequest', label: 'Manage Request', icon: FaClipboardCheck },
    { to: '/dashboardLayouts/platformStatistics', label: 'Platform Statistics', icon: FaChartBar },
];

const DashboardLayout = () => {
    const location = useLocation();
    const { userRole } = useRole();
    const role = userRole.role;

    const links =
        role === 'admin' ? adminLinks :
            role === 'chef' ? chefLinks :
                userLinks;

    const isActive = (item) =>
        item.end
            ? location.pathname === item.to
            : location.pathname.startsWith(item.to);

    const activeLabel =
        links.find((item) => isActive(item))?.label || 'Dashboard';

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col bg-base-200/40 min-h-screen">
                {/* Navbar */}
                <nav className="navbar bg-base-100 border-b border-base-300 px-4 sticky top-0 z-20">
                    <div className="flex-1 flex items-center gap-2">
                        <label
                            htmlFor="my-drawer-4"
                            aria-label="open sidebar"
                            className="btn btn-square btn-ghost lg:hidden"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="inline-block size-5">
                                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                                <path d="M9 4v16"></path>
                                <path d="M14 10l2 2l-2 2"></path>
                            </svg>
                        </label>
                        <div>
                            <p className="text-xs text-base-content/50 font-medium">Dashboard</p>
                            <h1 className="text-base font-bold text-base-content leading-tight">
                                {activeLabel}
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="btn btn-ghost btn-circle btn-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
                                <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 01-3.46 0" />
                            </svg>
                        </button>
                        <div className="avatar placeholder">
                            <div className="bg-red-500 text-white rounded-full w-9 flex items-center justify-center">
                                <span className="text-sm font-semibold">U</span>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Page content */}
                <div className="flex-1">
                    <Outlet></Outlet>
                </div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible z-30">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>

                <div className="flex min-h-full flex-col bg-base-100 border-r border-base-300 is-drawer-close:w-16 is-drawer-open:w-64 lg:w-64 transition-all duration-200">

                    {/* Brand */}
                    <Link to={'/'}>
                        <div className="flex items-center gap-2.5 px-4 h-16 border-b border-base-300 is-drawer-close:justify-center">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shrink-0 shadow-md shadow-red-500/30">
                                <span className="text-white font-bold text-sm">🍽️</span>
                            </div>
                            <span className="font-bold text-base-content text-lg is-drawer-close:hidden">
                                LocalChef<span className="text-red-500">Bazaar</span>
                            </span>
                        </div>
                    </Link>

                    {/* Nav links based on role */}
                    <ul className="menu w-full grow px-3 py-4 gap-1">
                        <li className="menu-title is-drawer-close:hidden text-xs tracking-widest">
                            Menu
                        </li>
                        {/* Dynamic links sowing */}
                        {links.map((item) => {
                            const active = isActive(item);
                            const Icon = item.icon;

                            return (
                                <li key={item.to}>
                                    <Link
                                        to={item.to}
                                        className={`is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium transition-all duration-200 ${active
                                            ? 'bg-red-500 text-white shadow-md shadow-red-500/30'
                                            : 'text-base-content/70 hover:bg-red-50 hover:text-red-600'
                                            }`}
                                        data-tip={item.label}
                                    >
                                        <Icon className="text-lg shrink-0" />
                                        <span className="is-drawer-close:hidden">
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}

                        <li className="menu-title is-drawer-close:hidden text-xs tracking-widest mt-3">
                            Preferences
                        </li>
                        <li>
                            <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium text-base-content/70 hover:bg-red-50 hover:text-red-600 transition-all duration-200" data-tip="Settings">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="text-lg size-[1.125rem] shrink-0">
                                    <path d="M20 7h-9"></path>
                                    <path d="M14 17H5"></path>
                                    <circle cx="17" cy="17" r="3"></circle>
                                    <circle cx="7" cy="7" r="3"></circle>
                                </svg>
                                <span className="is-drawer-close:hidden">Settings</span>
                            </button>
                        </li>
                    </ul>

                    {/* User footer */}
                    <div className="border-t border-base-300 p-3">
                        <div className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-red-50 transition-colors is-drawer-close:justify-center">
                            <div className="avatar placeholder shrink-0">
                                <div className="bg-red-100 text-red-600 rounded-full w-9 flex items-center justify-center">
                                    <span className="text-sm font-semibold">U</span>
                                </div>
                            </div>
                            <div className="is-drawer-close:hidden min-w-0">
                                <p className="text-sm font-semibold text-base-content truncate">
                                    My Account
                                </p>
                                <p className="text-xs text-base-content/50 truncate">
                                    View profile
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;