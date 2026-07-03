import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useInstance from './useInstance';
const useRole = () => {
    const { user } = useAuth();
    const instance = useInstance();
    const { data: userRole = {}, isLoading } = useQuery({
        queryKey: ['users-role', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await instance.get(`/users/${user?.email}/role`)
            return res.data
        }
    })
    return (
        { userRole, isLoading }
    );
};

export default useRole;