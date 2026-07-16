import axios from 'axios';
import React from 'react';
const instance = axios.create({
    baseURL: "https://local-chef-bazaar-server-steel.vercel.app/"
})
const useInstance = () => {
    return instance
};

export default useInstance;