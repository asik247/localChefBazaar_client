import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
const instanceSecqure = axios.create({
    baseURL: "http://localhost:3000/",
})
const useInstanceSecqure = () => {
    const { user,logOutUsers } = useAuth()
    // console.log(user.accessToken);
    //Todo useEffect;
    useEffect(() => {
        const requestInterceptor = instanceSecqure.interceptors.request.use((config) => {
            if (user?.accessToken) {
                config.headers.Authorization = `Bearer ${user?.accessToken}`
            }

            return config
        }, (err) => {
            return Promise.reject(err)
        })
        //Todo response interceptors;
        const responseInterceptor = instanceSecqure.interceptors.response.use((response) => {
            return response
        }, (err) => {
            const status = err.response?.status;
            if(status === 401 || status === 403){
                logOutUsers()
                .then(()=>{
                    console.log('forbidden access');
                }).catch(err=>{
                    console.log(err);
                })
            }
        })


        // ? unmount code;
        return () => {
            instanceSecqure.interceptors.request.eject(requestInterceptor);
            instanceSecqure.interceptors.response.eject(responseInterceptor);
        }
    }, [user])
    return instanceSecqure
};

export default useInstanceSecqure;