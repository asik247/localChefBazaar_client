import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useInstanceSecqure from '../../../Hooks/useInstanceSecqure';
const PaymentSuccess = () => {
    const instanceSecqure = useInstanceSecqure();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [paymentInfo, setPaymentInfo] = useState({});
    //? useEffect code here;
    useEffect(() => {
        instanceSecqure.patch(`/paymentSuccess?session_id=${sessionId}`)
            .then(res => {
                // console.log(res.data);
                setPaymentInfo({ trackingId: res.data.trackingId, transactionId: res.data.transactionId })
            })
    }, [instanceSecqure, sessionId])
    return (
        <div>
            <h1>Payment success report</h1>
            <p>Track:{paymentInfo.trackingId}</p>
            <p>Trans:{paymentInfo.transactionId}</p>
        </div>
    );
};

export default PaymentSuccess;