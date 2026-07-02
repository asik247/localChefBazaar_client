import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div className="min-h-screen bg-base-200/40 flex items-center justify-center px-4 py-14">
            <div className="w-full max-w-md rounded-3xl border border-base-300 bg-base-100 shadow-sm overflow-hidden">

                <div className="flex flex-col items-center text-center px-6 pt-10 pb-6">
                    <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>

                    <p className="text-xs font-semibold tracking-[0.2em] text-error uppercase mb-2">
                        Payment cancelled
                    </p>
                    <h1 className="text-2xl sm:text-3xl font-bold text-base-content tracking-tight">
                        Payment Not Completed
                    </h1>
                    <p className="mt-2 text-sm text-base-content/60 max-w-xs">
                        You cancelled the checkout before it finished. No amount has been charged
                        and your order is still pending payment.
                    </p>
                </div>

                <div className="px-6 pt-2 pb-8 flex flex-col sm:flex-row gap-3">
                    <Link
                        to="/dashboardLayouts/myOrders"
                        className="btn flex-1 rounded-full text-white font-semibold border-none bg-gradient-to-r from-orange-400 to-red-500 shadow-md shadow-red-500/30 hover:scale-105 hover:shadow-red-500/50 active:scale-95 transition-all duration-300"
                    >
                        Try Payment Again
                    </Link>
                    <Link
                        to="/"
                        className="btn flex-1 rounded-full btn-outline"
                    >
                        Back Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancelled;