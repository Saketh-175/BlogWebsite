import React, { useState } from 'react';
import axios from 'axios';
import signup from '../images/signup.webp';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobnum, setMobnum] = useState('');
    const [proff, setProff] = useState('');
    const [pass, setPass] = useState('');
    const [cpass, setCpass] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        if (pass !== cpass) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/register', {
                name,
                email,
                phone: mobnum,
                work: proff,
                password: pass,
                cpassword: cpass
            });
            console.log(response.data);
            setError('');
            alert("Registration successful!");
        } catch (err) {
            console.error(err);
            setError("Registration failed");
        }
    };

    return (
        <>
            <section className='Signup'>
                <div className="containersignup">
                    <div className="singup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign Up</h2>
                            <form className="reg-form" id="reg-form" onSubmit={handleSignup}>
                                <div className="form-group">
                                    <label htmlFor="name">
                                        <i className="zmdi zmdi-account material-icons-name"></i>
                                    </label>
                                    <input
                                        type="text"
                                        name='name'
                                        id='name'
                                        autoComplete='off'
                                        placeholder='Your Name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
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
                                <div className="form-group">
                                    <label htmlFor="mobnum">
                                        <i className="zmdi zmdi-smartphone"></i>
                                    </label>
                                    <input
                                        type="text"
                                        name='mobnum'
                                        id='mobnum'
                                        autoComplete='off'
                                        placeholder='Mobile Number'
                                        value={mobnum}
                                        onChange={(e) => setMobnum(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="proff">
                                        <i className="zmdi zmdi-case"></i>
                                    </label>
                                    <input
                                        type="text"
                                        name='proff'
                                        id='proff'
                                        autoComplete='off'
                                        placeholder='Your Profession'
                                        value={proff}
                                        onChange={(e) => setProff(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass">
                                        <i className="zmdi zmdi-lock"></i>
                                    </label>
                                    <input
                                        type="password"
                                        name='pass'
                                        id='pass'
                                        autoComplete='off'
                                        placeholder='Password'
                                        value={pass}
                                        onChange={(e) => setPass(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cpass">
                                        <i className="zmdi zmdi-lock-outline"></i>
                                    </label>
                                    <input
                                        type="password"
                                        name='cpass'
                                        id='cpass'
                                        autoComplete='off'
                                        placeholder='Confirm Password'
                                        value={cpass}
                                        onChange={(e) => setCpass(e.target.value)}
                                    />
                                </div>
                                {error && <p className="error">{error}</p>}
                                <button className='signbtn' type='submit'>Register</button>
                            </form>
                        </div>
                    </div>
                    <div className="imgcont">
                        <img className="signimg" src={signup} alt="" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Signup;
