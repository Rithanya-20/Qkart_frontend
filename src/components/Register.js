import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";



const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [username, handleName] = useState("");
  const [password, handlePassword] = useState("");
  const [confirmPassword, handleConfirmPassword] = useState("");
  const [dp, setDp] = useState(true);
  const [load, setLoad] = useState(false);

  


  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {

  
  if(validateInput(formData)){

   
    setDp(false);
    setLoad(true);

  // console.log(formData.username);
   const url = config.endpoint + "/auth/register";
   console.log(url);
   console.log( {
    "username":formData.username,
    "password":formData.password
   });

   await axios.post(url, {
    "username":formData.username,
    "password":formData.password
   })
   .then(function (response) {        
        //  alert("success");
         setDp(true);
         setLoad(false);
         enqueueSnackbar('Registered successfully', {variant:"success"});
          // console.log(response.status);
        })
        .catch(function (error) {
          // alert("failed");
         
          if (typeof error.response === "undefined") {
            
            enqueueSnackbar('Something went wrong. Check that the backend is running, reachable and returns valid JSON.', {variant:"error"});
            console.log("Something went wrong. Check that the backend is running, reachable and returns valid JSON.");
            // window.location.href = "/error-page";
          }
          else if (error.response.status === 400) {
            // Authorization error
            enqueueSnackbar(error.response.data.message, {variant:"error"});

            console.log(error.message);
            // window.location.href = "/signin";
          } 
          // else if (error.response.status === 500) {
            // Server error
            // window.location.href = "/500-error";
          // }
           else {
            enqueueSnackbar('Something went wrong. Check that the backend is running, reachable and returns valid JSON.', {variant:"error"});

            console.log("Something went wrong. Check that the backend is running, reachable and returns valid JSON.");
            return Promise.reject(error);
          }
          console.log(error);
        });

      }
  

  

    
  };

  

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {

    console.log(data.password);
    console.log(data.confirmPassword);


    if(data.username === ""){
      enqueueSnackbar("Username is a required field", {variant:"warning"});
      return false;
    }
    else if(data.username.length < 6){
      enqueueSnackbar("Username must be at least 6 characters", {variant:"warning"});
      return false;
    }
    else if(data.password === ""){
      enqueueSnackbar("Password is a required field", {variant:"warning"});
      return false;
    }
    else if(data.password.length < 6){
      enqueueSnackbar("Password must be at least 6 characters", {variant:"warning"});
      return false;
    }
    else if(data.password !== data.confirmPassword){
      enqueueSnackbar("Passwords do not match", {variant:"warning"});
      return false;
    }

    else{
      return true;
    }


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
         
          <h2 className="title">Register</h2>
         
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            onChange= {(e) => handleName(e.target.value)}
            
            fullWidth
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            onChange= {(e) => handlePassword(e.target.value)}
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            onChange= {(e) => handleConfirmPassword(e.target.value)}
            type="password"
            fullWidth
          />

          {load && (
          <center><CircularProgress /></center>
          )}

          {dp && (
           <Button className="button" color="primary" variant="contained" onClick={() => register({"username":username, "password": password, "confirmPassword":confirmPassword})}>
            Register Now
           </Button>
            )}
          <p className="secondary-action">
            Already have an account?{" "}
             <a className="link" href="#">
              Login here
             </a>
          </p>
         
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
