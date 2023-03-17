import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { useHistory, Link } from "react-router-dom";


const Header = ({ children, hasHiddenAuthButtons }) => {
  
  // let name = JSON.parse(localStorage.getItem("testObject"));
  let name = localStorage.getItem("username");
  console.log(name);

  // if (typeof name !== 'undefined' && name !== null){
  //   console.log(name.username);
  // }

  const setLogout = () => {
    localStorage.clear();
    window.location.reload();
    history.push("/", {from:"Header"});
  }

  
  
  
  const history = useHistory();  
  return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        {hasHiddenAuthButtons ?
        (<Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => history.push("/", {from:"Header"})}
        >
          Back to explore
        </Button>) : (

        name ? 
        
         
          ( <Stack direction="row" spacing={2}>            
          <Avatar src="..\public\avatar.png" alt={name}></Avatar>
          {/* <Button className="explore-button"  variant="text" >{name.username}</Button> */}
          <p id="user">{name}</p>
          <Button className="explore-button" color="primary" variant="text"   onClick={() => setLogout()}>LOGOUT</Button>
           </Stack> )

          // (<Stack direction="row"  spacing={2}>

          //  <Button className="explore-button" color="primary" variant="text" >LOGIN</Button>
          //  <Button className="button" color="primary" variant="contained" >REGISTER</Button> 
           
          //  </Stack>)
           
           :

           (<Stack direction="row"  spacing={2}>

           <Button className="explore-button" color="primary" variant="text"   onClick={() => history.push("/login", {from:"Header"})}>LOGIN</Button>
           <Button className="button" color="primary" variant="contained"   onClick={() => history.push("/register", {from:"Header"})}>REGISTER</Button> 
           
           </Stack>)
        )

        }
      </Box>
    );
};

export default Header;
