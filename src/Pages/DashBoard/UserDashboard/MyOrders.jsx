import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import Loading from '../../../Shares/Loading';
import { useQuery } from '@tanstack/react-query';
import useInstanceSecqure from '../../../Hooks/useInstanceSecqure';
const MyOrders = () => {
    //? current user get;
    const { user, loading } = useAuth();
    const instanceSecqure = useInstanceSecqure()
    // console.log('current user order page', user);
    //! load login user orders info in db;
    const { data: ordersData = [] } = useQuery({
        queryKey: ['orders', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await instanceSecqure.get(`/orders/${user?.email}`)
            return res.data
        }
    })
    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h1 className='text-yellow-400 text-2xl font-bold'>All My Orders Items! {ordersData.length}</h1>
            {console.log(ordersData)}
        </div>
    );
};

export default MyOrders;