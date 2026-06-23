import React from 'react';
import { ScaleLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
            <ScaleLoader
                height={40}
                width={5}
                radius={2}
                margin={3}
            />

            <p className="mt-6 text-sm text-gray-500 font-medium tracking-wide">
                Loading...
            </p>
        </div>
    );
};

export default Loading;