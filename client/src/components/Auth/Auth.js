import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import useStyles from './styles';
import Icon from './Icon';


const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    // sign up = registrarse
    // sign in = iniciar sesión

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    
    /* 
    const switchMode = () => {
        setIsSignup(!isSignup ? true : false);
        handleShowPassword(false) 
    };
    or */
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false)
    };
    
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !handleShowPassword)
    };
    
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type: 'AUTH', data: { result, token}});
            history.push('/')
        } catch (error) {
            console.log(error)
        }
        // console.log(res)
    };

    const googleFailure = (error) => {
        console.log("No se pudo iniciar sesión con Google. Pruebe más tarde")
        console.log(error)
    };


    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{isSignup ? 'Registrarse' : 'Iniciar sesión'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignup && (
                            <>
                                <Input name='firstName' label="Nombre" handleChange={handleChange} autoFocus half/>
                                <Input name='lastName' label="Apellido" handleChange={handleChange} half />

                            </>
                        )}
                        <Input name="email" label="Email" handleChange={handleChange} type="email" />
                        <Input name="password" label="Contraseña" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        { isSignup && <Input name="confirmPassword" label="Repetir contraseña" handleChange={handleChange} type="password"/>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? "Registrarse" : "Iniciar sesión"}
                    </Button>
                    <GoogleLogin 
                        clientId="CLIENT ID"
                        render={(renderProps) => (
                            <Button 
                            className={classes.googleButton.Button}  
                            color='primary' 
                            fullWidth 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} 
                            startIcon={<Icon/>} 
                            variant="contained">
                                Iniciar sesión con Google 
                            </Button> 
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button onClick={switchMode}>
                                {isSignup ? "Ya tiene una cuenta? Iniciar sesión" : "No tiene una cuenta? Registrarse"}
                                </Button>
                            </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
