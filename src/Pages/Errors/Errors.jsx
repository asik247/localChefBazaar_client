import React from 'react';
import { Link, useRouteError } from 'react-router';

const Errors = () => {
    const error = useRouteError();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-7xl font-bold text-red-500">
                {error?.status || 404}
            </h1>

            <h2 className="text-2xl font-semibold mt-4">
                Something Went Wrong
            </h2>

            <p className="mt-2 text-gray-500">
                {error?.statusText || error?.message || 'Unexpected Error'}
            </p>

            <Link
                to="/"
                className="btn btn-primary mt-5"
            >
                Back Home
            </Link>
        </div>
    );
};

export default Errors;