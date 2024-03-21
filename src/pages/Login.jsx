import React, { useEffect, useState } from 'react';
import Logo from '../../public/logo.svg'
import { postLogin, postRegister } from '../utils/Db';
import SingIn from '../components/SingIn';
import SingUp from '../components/SingUp';
import { useDispatch } from 'react-redux';
import {encrypt, descrypData} from '../utils/CryptoEnv';




const Login = ({ onLogin }) => {
    useEffect(() => {
        document.title = 'Login - Ulver Bank';
    })
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [menssageError, setMenssageError] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setMenssageError("");
    },[isRegistering])
    
    useEffect(() => {
        const userStored = localStorage.getItem('RememberMe');
        if (userStored === 'true') {
            const storedEmail = localStorage.getItem('storedEmail');
            const storedPassword = localStorage.getItem('storedPassword');
            setEmail(storedEmail);
            setPassword(descrypData(storedPassword));
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, []); 
    
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); 
    };
    
    useEffect(() => {
        if (isChecked) {
            localStorage.setItem('RememberMe', "true");
            localStorage.setItem('storedEmail', email);
            localStorage.setItem('storedPassword', encrypt(password));
        } else {
            localStorage.removeItem('storedPassword');
            localStorage.removeItem('storedEmail');
            localStorage.setItem('RememberMe', "false");
        }
    }, [isChecked]);


    const dispatch = useDispatch();

    const handleSignIn = async (e) => {
        e.preventDefault();

        const response = await postLogin({ email, password }, dispatch);
        if (response.success === true) {
          onLogin();
        }
        setMenssageError(response.message);
      };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const registerResponse = await postRegister({ firstName, lastName, email, password }, dispatch);
        if (registerResponse.success) {
            const loginResponse = await postLogin({ email, password }, dispatch);
            if (loginResponse.success) {
                onLogin();
            }
        } setMenssageError(registerResponse.message);

    };


    return (
        <>
            <div className="flex flex-row w-full min-h-screen">
                <div className="w-1/2 movil:hidden laptop:flex flex flex-col justify-between h-full bg-bg-login pl-3 p-10 before:fixed before:bg-black before:w-1/2 before:h-full before:left-0 before:top-0 before:opacity-25">
                    <div className="flex flex-col text-white items-center w-52 gap-2">
                        <h1 className="text-2xl">Ulver</h1>
                        <img className="w-32 invert" src={Logo} alt="Logo Homebanking" />
                    </div>
                    <div>
                        <h2 className="text-2xl text-white">Manage your money safely</h2>
                    </div>
                </div>
                <div className="flex flex-col p-[5%] justify-center movil:w-full laptop:w-1/2 bg-white dark:border dark:bg-gray-800 dark:border-gray-700">
                <div className=" text-white items-center w-52 gap-2 movil:flex movil:w-full laptop:hidden justify-center">
                        <h1 className="text-2xl">Ulver</h1>
                        <img className="w-32 invert" src={Logo} alt="Logo Homebanking" />
                    </div>
                    {isRegistering ? (
                        <SingUp handleSubmit={handleSignUp} setFirstName={setFirstName} setLastName={setLastName} setEmail={setEmail} setPassword={setPassword} setIsRegistering={setIsRegistering} message={menssageError} />
                    ) : (
                        <SingIn handleSubmit={handleSignIn} setEmail={setEmail} setPassword={setPassword} setIsRegistering={setIsRegistering} message={menssageError} setIsChecked={setIsChecked} email={email} password={password} isChecked={isChecked} />
                    )}

                </div>
            </div>
        </>
    )
}

export default Login