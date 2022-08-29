import React, { useState, useRef, useEffect } from 'react';
import 'antd/dist/antd.css'
import '../Static/css/custom_style.css'
import '../Static/css/custom-bootstrap.css'
import { Form, Input, Spin, message, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined, IdcardOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import './login.css'
import '../Static/theme-blue.css';
import '../Static/custom_antd.css';
import Logo from '../Static/images/fk_logo.svg';
import { AwesomeButton } from 'react-awesome-button';

const API_HOST = '/';


function LoginForm() {

    useEffect(() => {

        fetch(`${API_HOST}api/accounts/authenticated`)
            .then(res => res.json())
            .then((result) => {
                if (result.is_authenticated === true) {
                    window.location.href = '/home'
                    setLoading(true)
                }
                else {
                    setLoading(false)
                }
            })
            .catch((error) => console.log(error))


        fetch(`${API_HOST}api/accounts/csrf_cookie`)
            .then(res => res.json())
            .then((result) => {
                if (result.is_authenticated === true) {
                    window.location.href = '/home'
                }
            })

        inputRef.current.focus({
            cursor: 'start',
        });
    }, [])

    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    const handleLogin = (values) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("X-CSRFToken", Cookies.get('csrftoken'));
        myHeaders.append("Cookie", "csrftoken=" + Cookies.get('csrftoken') + "; sessionid=" + Cookies.get('sessionid') + "");

        console.log(values)
        const raw = JSON.stringify(values);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        setLoading(true)
        fetch(`${API_HOST}api/accounts/login`, requestOptions)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result)
                if (result.is_authenticated === true) {
                    message.success(result.message);
                    window.location.href = '/home'

                } else {
                    setLoading(false)
                    message.error(result.message);
                }
            })
    }

    const [ForgotPassword, setForgotPassword] = useState(true)

    const handleSendResetLink = (values) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("X-CSRFToken", Cookies.get('csrftoken'));
        myHeaders.append("Cookie", "csrftoken=" + Cookies.get('csrftoken') + "; sessionid=" + Cookies.get('sessionid') + "");


        if (values['email'].includes('@factentry.com') === false) { values['email'] = values['email'] + '@factentry.com' }

        const raw = JSON.stringify(values);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        setLoading(true)
        fetch(`${API_HOST}api/user_profile/forgotpassword/`, requestOptions)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result)
                if (result.status === true) {
                    message.success(result.message);
                    setLoading(false)
                } else {
                    setLoading(false)
                    message.error(result.message);
                }
            })
    }

    const handleRegister = (values) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("X-CSRFToken", Cookies.get('csrftoken'));
        myHeaders.append("Cookie", "csrftoken=" + Cookies.get('csrftoken') + "; sessionid=" + Cookies.get('sessionid') + "");

        console.log(values)
        const raw = JSON.stringify(values);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        setLoading(true)
        fetch(`${API_HOST}api/accounts/register`, requestOptions)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result)
                if (result.status === true) {
                    message.success(result.message);
                    setLRForm(true)

                } else {
                    setLoading(false)
                    message.error(result.message);
                }
            })
    }
    // if (!loading) {

    const [LRForm, setLRForm] = useState(true)

    return (
        <>
            <div className="header">
                <div className="inner-header flex">
                    <div style={{ display: 'flex', width: 'fit-content', height: 'fit-content', position: 'absolute', inset: '0px', margin: 'auto', padding: '21px', boxShadow: 'rgb(241 241 241) 0px 0px 20px 3px', background: 'rgb(255 255 255 / 0%)', borderRadius: '20px' }}>
                        <div id="loginform" style={{ marginLeft: 'auto', marginRight: 'auto', width: "fit-content", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                            <Spin spinning={loading}>
                                {LRForm ?
                                    <>
                                        {ForgotPassword ?
                                            <>
                                                <h2 style={{ color: 'white' }}>Login</h2>
                                                <Form
                                                    name="normal_login"
                                                    className="login-form"
                                                    initialValues={{
                                                        remember: true,
                                                    }}
                                                    onFinish={handleLogin}
                                                    layout={'vertical'}
                                                    style={{ width: '300px' }}
                                                >
                                                    <label className='custom-label' style={{ color: 'white', textAlign: 'left' }}>Username</label>
                                                    <Form.Item
                                                        name="username"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input your Username!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input ref={inputRef} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                                    </Form.Item>
                                                    <label className='custom-label' style={{ color: 'white', textAlign: 'left' }}>Password</label>
                                                    <Form.Item
                                                        name="password"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input your Password!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password"
                                                        />
                                                    </Form.Item>
                                                    <Form.Item>
                                                        <span style={{ color: 'white', float: 'left' }}>Forgot password? <a className="login-form-forgot" href="#" style={{ color: 'white', textDecoration: 'underline' }} onClick={() => setForgotPassword(false)}>
                                                            Click here
                                                        </a></span>

                                                    </Form.Item>

                                                    <Form.Item>
                                                        <span style={{ color: 'white', float: 'left' }}>Don't have an account? <a className="login-form-forgot" href="#" style={{ color: 'white', textDecoration: 'underline' }} onClick={() => setLRForm(false)}>
                                                            Sign Up
                                                        </a></span>

                                                    </Form.Item>

                                                    <Form.Item style={{ width: 'fit-content', marginLeft: 'auto', marginRight: 'auto' }}>
                                                        <AwesomeButton size='small' type="primary" style={{
                                                            height: 'auto', width: '-webkit-fill-available', boxShadow: 'rgb(255 255 255 / 40%) 0px 0px 5px 2px',
                                                            background: 'white',
                                                            color: 'black'
                                                        }} >Submit</AwesomeButton>
                                                    </Form.Item>

                                                    

                                                </Form>
                                            </> :
                                            <>
                                                <h2 style={{ color: 'white' }}>Forgot Password</h2>
                                                <Form
                                                    name="normal_login"
                                                    className="login-form"
                                                    initialValues={{
                                                        remember: true,
                                                    }}
                                                    onFinish={handleSendResetLink}
                                                    layout={'vertical'}
                                                >
                                                    <label className='custom-label' style={{ color: 'white', textAlign: 'left' }}>Username</label>
                                                    <Form.Item
                                                        name="email"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input your Username!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input ref={inputRef} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                                    </Form.Item>
                                                    <Form.Item>
                                                        <span style={{ color: 'white', float: 'left' }}>Exisiting User? <a className="login-form-forgot" href="#" style={{ color: 'white', textDecoration: 'underline' }} onClick={() => setForgotPassword(true)}>
                                                            Click here
                                                        </a></span>

                                                    </Form.Item>

                                                    <Form.Item style={{ width: 'fit-content', marginLeft: 'auto', marginRight: 'auto' }}>
                                                        <AwesomeButton size='small' type="primary" style={{
                                                            height: 'auto', width: '-webkit-fill-available', boxShadow: 'rgb(255 255 255 / 40%) 0px 0px 5px 2px',
                                                            background: 'white',
                                                            color: 'black'
                                                        }}>Reset</AwesomeButton>

                                                    </Form.Item>

                                                </Form>
                                            </>
                                        }
                                    </>
                                    : <>
                                        <h2 style={{ color: 'white' }}>Register</h2>
                                        <Form
                                            name="normal_login"
                                            className="login-form"
                                            initialValues={{
                                                remember: true,
                                            }}
                                            onFinish={handleRegister}
                                            layout={'vertical'}
                                            style={{ width: '300px' }}
                                        >
                                            <label className='custom-label' style={{ color: 'white', textAlign: 'left' }}>Name</label>
                                            <Form.Item
                                                name="first_name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your Name!',
                                                    },
                                                ]}
                                            >
                                                <Input ref={inputRef} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
                                            </Form.Item>
                                            <label className='custom-label' style={{ color: 'white', textAlign: 'left' }}>Username</label>
                                            <Form.Item
                                                name="username"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your Username!',
                                                    },
                                                ]}
                                            >
                                                <Input ref={inputRef} prefix={<IdcardOutlined  className="site-form-item-icon" />} placeholder="Username" />
                                            </Form.Item>
                                            <label className='custom-label' style={{ color: 'white', textAlign: 'left' }}>Password</label>
                                            <Form.Item
                                                name="password"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your Password!',
                                                    },
                                                ]}
                                            >
                                                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password"
                                                />
                                            </Form.Item>
                                            <label className='custom-label' style={{ color: 'white', textAlign: 'left' }}>Confirm Password</label>
                                            <Form.Item
                                                name="re_password"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your Confirm Password!',
                                                    },
                                                ]}
                                            >
                                                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Confirm Password"
                                                />
                                            </Form.Item>
                                            <Form.Item>
                                                <span style={{ color: 'white', float: 'left' }}>Forgot password? <a className="login-form-forgot" href="#" style={{ color: 'white', textDecoration: 'underline' }} onClick={() => setForgotPassword(false)}>
                                                    Click here
                                                </a></span>

                                            </Form.Item>

                                            <Form.Item>
                                                <span style={{ color: 'white', float: 'left' }}>Already have an account? <a className="login-form-forgot" href="#" style={{ color: 'white', textDecoration: 'underline' }} onClick={() => setLRForm(true)}>
                                                    Sign In
                                                </a></span>

                                            </Form.Item>

                                            <Form.Item style={{ width: 'fit-content', marginLeft: 'auto', marginRight: 'auto' }}>
                                                <AwesomeButton size='small' type="primary" style={{
                                                    height: 'auto', width: '-webkit-fill-available', boxShadow: 'rgb(255 255 255 / 40%) 0px 0px 5px 2px',
                                                    background: 'white',
                                                    color: 'black'
                                                }} >Submit</AwesomeButton>
                                            </Form.Item>

                                        

                                        </Form>
                                    </>
                                }
                            </Spin>
                        </div>
                    </div>
                </div>
                <div>
                    <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                        <defs>
                            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="parallax">
                            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                        </g>
                    </svg>
                </div>
            </div>


        </>
    )
    // } else {
    //     return (
    //         <div style={{ height: '100%', paddingTop: '250px' }}>
    //             <div id="loginform" style={{ marginLeft: 'auto', marginRight: 'auto', width: "10%", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    //                 <Lottie animationData={groovyWalkAnimation} loop={true} autoplay={true} />
    //             </div>
    //         </div>
    //     )
    // }
}

export default LoginForm;