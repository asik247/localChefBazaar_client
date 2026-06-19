import React from 'react';
import { useParams } from 'react-router';
const Details = () => {
    const { id } = useParams();
    console.log('id', id);
    return (
        <div>
            <h1>Details page</h1>
        </div>
    );
};

export default Details;