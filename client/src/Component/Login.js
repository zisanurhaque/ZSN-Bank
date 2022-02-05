import React from 'react';
import { Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Login = ({login, config, handlePassword, handleUser, handleLogin}) => {

    if(config.user === login.user && config.password === login.password){
        return <Redirect to={"/"}/>
    }else{
        return(
            <>
                <div className='loginContainer'>

                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss={false}
                        draggable={false}
                        pauseOnHover={false}
                        theme='colored'
                    />

                    <div className='login'>
                        <h4 className='pb-4'>LOGIN FIRST</h4>
                        <div className='form'>
                            <input type="text" placeholder='Username' onChange={(e) => handleUser(e)}/>
                            <input type="password" placeholder='Password' onChange={(e) => handlePassword(e)}/>
                            <button onClick={(e) => handleLogin(e)}>Login</button>
                        </div>
                        <p>Username - Zisanur Haque</p>
                        <p>Password - 123456</p>
                    </div>
                </div>
            </>
        )
    }
}

export default Login;