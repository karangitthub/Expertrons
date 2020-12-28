import React , { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logIn } from './../actions'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
      Expertrons
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [credentials, setCredentials] = useState({email: "", password: ""});
  const history = useHistory();
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    
    const url = `http://localhost:3001/User`;
    axios.post(url, {
      email: credentials.email,
      password: credentials.password
    }).then( (repos) =>{
      console.log('Response:'+repos.data);
      if(repos.status == 200){
        console.log('Logged In successfully!');
        dispatch(logIn());
        history.push("/HomePage");
      }else if(repos.status == 204){
        console.log('Incorrect username or password.');
        alert('Invalid username or password');
      }
    }) ;
  }

  function emailChangeHandler(event) {
    setCredentials({...credentials,email: event.target.value});
  }

  function passwordChangeHandler(event) {
    setCredentials({...credentials,password: event.target.value});
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            value={credentials.email}
            onChange={emailChangeHandler}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            placeholder="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={credentials.password}
            onChange={passwordChangeHandler}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            placeholder="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            
            onClick={handleClick}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}