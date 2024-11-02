import { signIn,signOut } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { useSession } from 'next-auth/react';

const LoginButton: React.FC = () => {
    const { data: session } = useSession()
    const handleLogin = () => {
        signIn("google",{redirectTo: '/#dashboard'});
    };
    const handleLogout = () => {
        signOut({redirectTo: '/'});
    }
    return (
        session ? (
            <button onClick={handleLogout} className='flex items-center bg-white px-5 py-3 font-semibold rounded-md shadow hover:bg-gray-100 transition duration-200'>
                <FcGoogle className='mr-3 text-xl'/>
                <span className='text-stone-950'>Logout with Google</span>
            </button>
        ) : (
            <button onClick={handleLogin} className='flex items-center bg-white px-5 py-3 font-semibold rounded-md shadow hover:bg-gray-100 transition duration-200'>
                <FcGoogle className='mr-3 text-xl'/>
                <span className='text-stone-950'>Login with Google</span>
            </button>
        )
    );
};

export default LoginButton;
