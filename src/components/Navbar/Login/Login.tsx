import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const LoginButton: React.FC = () => {
    const handleLogin = () => {
        // Add your login logic here
        console.log('Login with Google');
    };
    return (
        <button onClick={handleLogin} className='flex items-center bg-white px-5 py-3 font-semibold rounded-md shadow hover:bg-gray-100 transition duration-200'>
            <FcGoogle className='mr-3 text-xl'/>
            <span className='text-stone-950'>Login with Google</span>
        </button>
    );
};

export default LoginButton;
