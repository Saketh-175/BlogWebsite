import React, { useState } from 'react';
import loginimg from '../images/login.webp';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("login succesfull");
      navigate('/');
        } catch (err) {
          console.log(err)
            setError('Invalid email or password');
        }
    };

    return (
        <>
            <section className='login'>
                <div className="containerlogin">
                    <div className="loginimgdiv">
                        <img className="loginimg" src={loginimg} alt="Login" />
                    </div>
                    <div className="login-content">
                        <div className="login-form">
                            <h2 className="login-form-title">Sign In</h2>
                            <form className="login-reg-form" id="reg-form" onSubmit={handleLogin}>
                                <div className="loginform-group">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email"></i>
                                    </label>
                                    <input
                                        type="email"
                                        name='email'
                                        id='email'
                                        autoComplete='off'
                                        placeholder='Your Email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="loginform-group">
                                    <label htmlFor="pass">
                                        <i className="zmdi zmdi-lock"></i>
                                    </label>
                                    <input
                                        type="password"
                                        name='pass'
                                        id='pass'
                                        autoComplete='off'
                                        placeholder='Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                {error && <p className="error">{error}</p>}
                                <button className='loginbtn' type='submit'>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
