import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";
// import "./Products.js";
import Register from "./Register.js";



const Login = () => {
  const history = useHistory(); 
  const { enqueueSnackbar } = useSnackbar();
  const [load, setLoad] = useState();
  const [username, handleName] = useState("");
  const [password, handlePassword] = useState("");
  let postUrl = config.endpoint +"/auth/login";
  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  const login = async (formData) => {

    if(validateInput(formData)){
      // console.log({ "username":formData.username,
      // "password":formData.password});
      
      setLoad(true);
     
      
      let body = {"username":formData.username,
      "password":formData.password};
      
      await axios.post(postUrl, formData)
      .then(function (response){
        setLoad(false);
        // console.log(response);
        persistLogin(response.data.token, response.data.username, response.data.balance);
        
        enqueueSnackbar('Logged in successfully successfully', {variant:"success"});
        history.push("/", {from:"Login"})
      // <Link to='./products'></Link>
      })
      .catch(function (error){
        setLoad(false);

        if (typeof error.response === "undefined") {
              
          enqueueSnackbar('Something went wrong. Check that the backend is running, reachable and returns valid JSON.', {variant:"error"});
          // console.log("Something went wrong. Check that the backend is running, reachable and returns valid JSON.");
          // window.location.href = "/error-page";
        }
        else if (error.response.status === 400) {
          // Authorization error
          enqueueSnackbar(error.response.data.message, {variant:"error"});
  
          // console.log(error.message);
          // window.location.href = "/signin";
        } 
        else{
          enqueueSnackbar('Something went wrong. Check that the backend is running, reachable and returns valid JSON.', {variant:"error"});
  
          // console.log("Something went wrong. Check that the backend is running, reachable and returns valid JSON.");
        }
  
      });
      
    
    
    
      // await axios.put(postUrl,formData)
      // .then(function(response){
      //   console.log(response.status);

      // }).catch(function(error){
        
      //   if (typeof error.response === "undefined") {
            
      //     enqueueSnackbar('Something went wrong. Check that the backend is running, reachable and returns valid JSON.', {variant:"error"});
      //     console.log("Something went wrong. Check that the backend is running, reachable and returns valid JSON.");
      //     // window.location.href = "/error-page";
      //   }
      //   else if (error.response.status === 400) {
      //     // Authorization error
      //     enqueueSnackbar(error.response.data.message, {variant:"error"});

      //     console.log(error.message);
      //     // window.location.href = "/signin";
      //   } 
      //   // else if (error.response.status === 500) {
      //     // Server error
      //     // window.location.href = "/500-error";
      //   // }
      //    else {
      //     enqueueSnackbar('Something went wrong. Check that the backend is running, reachable and returns valid JSON.', {variant:"error"});

      //     console.log("Something went wrong. Check that the backend is running, reachable and returns valid JSON.");
      //     return Promise.reject(error);
      //   }
      //   console.log(error);

      // });

    }
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = (data) => {
    if(data.username === ""){
      enqueueSnackbar("Username is a required field", {variant:"warning"});
      return false;
    }
    else if(data.password === ""){
      enqueueSnackbar("Password is a required field", {variant:"warning"});
      return false;
    }
    return true;
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (token, username, balance) => {
    var testObject ={"token":token, "username":username, "balance":balance};
    // console.log(testObject);
    localStorage.setItem('token',token);
    localStorage.setItem('username',username);
    localStorage.setItem('balance',balance);
    // localStorage.setItem('testObject', JSON.stringify(testObject));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
        <h2 className="title">Login</h2>
        <TextField
            id="username"
            label="username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Username"
            onChange= {(e) => handleName(e.target.value)}
            
            fullWidth
          />
          <TextField
            id="password"
            variant="outlined"
            label="password"
            name="password"
            type="password"
            onChange= {(e) => handlePassword(e.target.value)}
            // helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Password"
          />
          {load ? <center><CircularProgress/></center> :
       
            <Button className="button" variant="contained" color="primary" onClick = {() => login({"username":username, "password":password}) }>
          LOGIN TO QKART
          {/* <Link to="/">Click Here!</Link> */}
           </Button>
         
            }

           <p className="secondary-action">
           Don’t have an account?{" "}
           {/* <a className="link" href="#">
              Register now
             </a> */}
           <Link to='/register' class="link">Register now</Link>
          </p>
         
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
