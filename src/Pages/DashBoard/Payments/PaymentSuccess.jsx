import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useInstanceSecqure from '../../../Hooks/useInstanceSecqure';
import Loading from '../../../Shares/Loading';

const PaymentSuccess = () => {
    const instanceSecqure = useInstanceSecqure();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [paymentInfo, setPaymentInfo] = useState({});
    const [loading, setLoading] = useState(true);

    //? useEffect code here;
    useEffect(() => {
        instanceSecqure.patch(`/paymentSuccess?session_id=${sessionId}`)
            .then(res => {
                setPaymentInfo({
                    trackingId: res.data.trackingId,
                    transactionId: res.data.transactionId
                });
            })
            .finally(() => setLoading(false));
    }, [instanceSecqure, sessionId]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-base-200/40 flex items-center justify-center px-4 py-14">
            <div className="w-full max-w-md rounded-3xl border border-base-300 bg-base-100 shadow-sm overflow-hidden">

                <div className="flex flex-col items-center text-center px-6 pt-10 pb-6">
                    <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <p className="text-xs font-semibold tracking-[0.2em] text-success uppercase mb-2">
                        Payment confirmed
                    </p>
                    <h1 className="text-2xl sm:text-3xl font-bold text-base-content tracking-tight">
                        Payment Successful
                    </h1>
                    <p className="mt-2 text-sm text-base-content/60 max-w-xs">
                        Thanks! Your order has been paid and the chef has been notified.
                    </p>
                </div>

                <div className="mx-6 rounded-2xl bg-base-200/40 border border-base-200 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold tracking-widest text-base-content/50 uppercase">
                            Tracking ID
                        </span>
                        <span className="text-sm font-mono font-semibold text-base-content">
                            {paymentInfo.trackingId || 'N/A'}
                        </span>
                    </div>
                    <div className="border-t border-base-300" />
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold tracking-widest text-base-content/50 uppercase">
                            Transaction ID
                        </span>
                        <span className="text-sm font-mono font-semibold text-base-content">
                            {paymentInfo.transactionId || 'N/A'}
                        </span>
                    </div>
                </div>

                <div className="px-6 pt-6 pb-8 flex flex-col sm:flex-row gap-3">
                    <Link
                        to="/dashboardLayouts/myOrders"
                        className="btn flex-1 rounded-full text-white font-semibold border-none bg-gradient-to-r from-orange-400 to-red-500 shadow-md shadow-red-500/30 hover:scale-105 hover:shadow-red-500/50 active:scale-95 transition-all duration-300"
                    >
                        View My Orders
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

export default PaymentSuccess;