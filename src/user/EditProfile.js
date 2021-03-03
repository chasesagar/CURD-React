// React imports
import React, {useState, useEffect} from 'react'
// Materisl UI imports
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// Auth or API imports
import auth from './../auth/auth-helper'
import {read, update} from './api-user'
// Router imports
import {Redirect, Link } from 'react-router-dom'

// Defining Styles
const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    error: {
      verticalAlign: 'middle'
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

// Main Component Function
export default function EditProfile({ match }) {
    const classes = useStyles()
    const [values, setValues] = useState({
      name: '',
      password: '',
      email: '',
      open: false,
      error: '',
      redirectToProfile: false
    })
    // Verifying user jwt token stored
    const jwt = auth.isAuthenticated()
    console.log('jwt confirmed')
    // Getting user existing data
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
  
        read({ userId: match.params.userId }, {t: jwt.token}, signal).then((data) => {
            if (data && data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, name: data.name, email: data.email})
            }
        })
        return function cleanup(){
            abortController.abort()
        }
  
    }, [match.params.userId])

    // Updating user changes on Submit
    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }
        update({userId: match.params.userId}, {t: jwt.token}, user).then((data) => {
            if (data && data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, userId: data._id, redirectToProfile: true})
                console.log('update successfull')
            }
        })
    }
    // Maintaing state on user input
    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value})
    }
    // Redirecting user on operation completition with help of state redirectToProfile
    if (values.redirectToProfile) {
        return (<Redirect to={'/user/' + values.userId}/>)
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Update Profile
                    </Typography>
            
                    <TextField variant="outlined" margin="normal" fullWidth id="name" label="Name" autoComplete="name" autoFocus value={values.name} onChange={handleChange('name')} />
                    <TextField variant="outlined" margin="normal" fullWidth id="email" label="Email Address" autoComplete="email" autoFocus value={values.email} onChange={handleChange('email')} />
                    <TextField variant="outlined" margin="normal" fullWidth label="Password" type="password" id="password" autoComplete="current-password" value={values.password} onChange={handleChange('password')} />
                    <br />
                    {
                    values.error && (<Typography component="p" color="error">
                        <Icon color="error" className={classes.error}>error</Icon>
                        &ensp;{values.error}
                    </Typography>)
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={clickSubmit}
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="center">
                        <Grid item>
                        <Link to={'/user/' + values.userId} variant="body2" color="secondary">
                            {"Discard Changes"}
                        </Link>
                        </Grid>
                    </Grid>
                </div>
        </Container>
    ); 
}
  
  