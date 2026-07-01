import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useInstanceSecqure from '../../../Hooks/useInstanceSecqure';
const PaymentSuccess = () => {
    const instanceSecqure = useInstanceSecqure();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [paymentInfo,setPaymentInfo] = useState({});
    //? userEffect code;
    useEffect(()=>{
        instanceSecqure.patch(`/paymentSuccess?session_id=${sessionId}`)
        .then(res=>{
            // console.log('trackindId2',res.data);
            setPaymentInfo({trackingId:res.data.trackingId,transactionId:res.data.transactionId})
        })
    },[instanceSecqure,sessionId])
    return (
        <div>
            <h1>Success pay</h1>
            <h1>TrackindId:{paymentInfo.trackingId}</h1>
             <h1>TransactionId:{paymentInfo.transactionId}</h1>
        </div>
    );
};

export default PaymentSuccess;