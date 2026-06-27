import React from 'react';
import useAuth from '../../../Hooks/useAuth';


const MyProfile = () => {
    const {user,loading} = useAuth();
    console.log('my profile user',user);
    if(loading){
        return <p>loding..</p>
    }
    return (
        <div>
            <h1>Hello this is user profiel here</h1>
            <img src={user?.photoURL} alt="" />
        </div>
    );
};

export default MyProfile;