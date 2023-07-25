import React, { useState, useRef, useEffect } from 'react';
import 'antd/dist/antd.css'
import '../Static/css/custom_style.css'
import '../Static/css/custom-bootstrap.css'
import { Form, Input, Spin, message, } from 'antd';
import Cookies from 'js-cookie';
import '../Static/custom_antd.css';
import Logo from '../Static/images/fk_logo.svg';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const API_HOST = '/';


function LoginForm() {

    const theme = createTheme();

    useEffect(() => {

        fetch(`${API_HOST}api/accounts/authenticated`)
            .then(res => res.json())
            .then((result) => {
                if (result.is_authenticated === true) {
                    window.location.href = '/home'
                    
                }
                else {
                    
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


    }, [])



    const handleRegister = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            first_name:data.get('username'),
            username: data.get('username'),
            password: data.get('password'),
            re_password: data.get('re_password'),
        });
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("X-CSRFToken", Cookies.get('csrftoken'));
        myHeaders.append("Cookie", "csrftoken=" + Cookies.get('csrftoken') + "; sessionid=" + Cookies.get('sessionid') + "");

        const raw = JSON.stringify({
            first_name:data.get('username'),
            username: data.get('username'),
            password: data.get('password'),
            re_password: data.get('re_password'),
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        
        fetch(`${API_HOST}api/accounts/register`, requestOptions)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result)
                if (result.status === true) {
                    message.success(result.message);
                    setLRForm(true)

                } else {
                    
                    message.error(result.message);
                }
            })
    }
    // if (!loading) {

    const [LRForm, setLRForm] = useState(true)

    const handleLogin = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            username: data.get('username'),
            password: data.get('password'),
        });

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("X-CSRFToken", Cookies.get('csrftoken'));
        myHeaders.append("Cookie", "csrftoken=" + Cookies.get('csrftoken') + "; sessionid=" + Cookies.get('sessionid') + "");

        const raw = JSON.stringify({
            username: data.get('username'),
            password: data.get('password'),
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        
        fetch(`${API_HOST}api/accounts/login`, requestOptions)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result)
                if (result.is_authenticated === true) {
                    message.success(result.message);
                    window.location.href = '/home'

                } else {
                    
                    message.error(result.message);
                }
            })
    };

    

    function Copyright(props) {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © 2022 '}
                <Link color="inherit" href="http://www.freightkare.com/">

                    Freight Kare.
                </Link>{' '}
                All rights reserved
                {'.'}
            </Typography>
        );
    }

    return (
        <>
            <div className='row' style={{ margin: 0 }}>
                <div className='col-lg-7' style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#001529', zIndex: 1 }}>
                    <div className='logo' style={{ padding: '50px' }}>
                        <img src={Logo} style={{ width: '240px', height: 'auto' }} />
                    </div>
                    <div className='logo-wrapper'>
                        <p class="tagline">Discover the Upside <br />with integrated logistics</p>
                    </div>
                </div>
                <div className='col-lg-5'>
                    <ThemeProvider theme={theme}>
                        <Grid container component="main" sx={{ height: '100vh' }}>
                            <CssBaseline />

                            {LRForm ? <Grid item xs={12} sm={8} md={12} component={Paper} elevation={12} square>
                                <Box
                                    sx={{
                                        my: 8,
                                        mx: 4,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    
                                    <Typography component="h1" variant="h4">
                                        Login
                                    </Typography>
                                    <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="username"
                                            label="Email Address"
                                            name="username"
                                            autoComplete="username"
                                            autoFocus
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox value="remember" color="primary" />}
                                            label="Remember me"
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Sign In
                                        </Button>
                                        <Grid container>
                                            <Grid item>
                                                <Link href="#" variant="body2" onClick={() => setLRForm(false)}>
                                                    {"Don't have an account? Sign Up"}
                                                </Link>
                                            </Grid>
                                        </Grid>
                                        <Copyright sx={{ mt: 5 }} />
                                    </Box>
                                </Box>
                            </Grid> :
                                <Grid item xs={12} sm={8} md={12} component={Paper} elevation={12} square>
                                    <Box
                                        sx={{
                                            my: 8,
                                            mx: 4,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        
                                        <Typography component="h1" variant="h4">
                                            Register
                                        </Typography>
                                        <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 1 }}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="first_name"
                                                label="Name"
                                                name="first_name"
                                                autoComplete="first_name"
                                                autoFocus
                                            />
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="username"
                                                label="Email Address"
                                                name="username"
                                                autoComplete="username"
                                                autoFocus
                                            />
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                autoComplete="current-password"
                                            />
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                name="re_password"
                                                label="Confirm Password"
                                                type="password"
                                                id="re_password"
                                                autoComplete="current-password"
                                            />
                                            <FormControlLabel
                                                control={<Checkbox value="remember" color="primary" />}
                                                label="Remember me"
                                            />
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                            >
                                                Sign Up
                                            </Button>
                                            <Grid container>

                                                <Grid item>
                                                    <Link href="#" variant="body2" onClick={() => setLRForm(true)}>
                                                        {"Already have an account? Sign In"}
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                            <Copyright sx={{ mt: 5 }} />
                                        </Box>
                                    </Box>
                                </Grid>}
                        </Grid>
                    </ThemeProvider>
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