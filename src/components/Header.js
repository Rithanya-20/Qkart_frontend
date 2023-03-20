import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Search, SentimentDissatisfied } from "@mui/icons-material";

import { Avatar, Button, Stack, TextField, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import "./Header.css";
import { useHistory, Link } from "react-router-dom";


const Header = ({ children, hasHiddenAuthButtons }) => {
  
  // let name = JSON.parse(localStorage.getItem("testObject"));
  let name = localStorage.getItem("username");
  // console.log(name);
  // console.log(children);
  
  const [searchKey, setSearchKey] = useState('');
  
  let s;
  // if (typeof name !== 'undefined' && name !== null){
  //   console.log(name.username);
  // }

  const setLogout = () => {
    localStorage.clear();
    window.location.reload();
    history.push("/", {from:"Header"});
  }

  let searchBox = <Box></Box>;

  if(!hasHiddenAuthButtons){
    searchBox = children;
      // searchBox = children.searchBoxInHeader;
  }

  // let productSearchItem = localStorage.getItem("productSearch");
  // console.log(productSearchItem);

  // if(productSearchItem){
  //   setSearchKey(productSearchItem);
  // }

  // const handleInputChange = (e) => {
  //   s = e.target.value;
  //   setSearchKey(s);
  //   // localStorage.setItem("search", s);

  //   // const search = localStorage.getItem('search');
  //   // if(search){
  //   //   setSearchKey(search);
  //   // }
  //   // else{
  //   //   let s = e.target.value;
  //   // setSearchKey(s);
  //   // localStorage.setItem("search", s);

  //   // }

  // }

  // const SearchHeader = (props) => {
  //   return (
      
  //     <div className="search-desktop">{props.children}</div>
      
       
  //   );
  // }

  // const SearchIt = () => {
  //   return (
  //     <SearchHeader>

  //           <TextField       
  //              className="search-desktop"       
  //               size="small"
  //               fullWidth
  //               value={searchKey}
  //               onChange={handleInputChange}
  //               InputProps={{
  //               endAdornment: (
  //                 <InputAdornment position="end">
  //                   <Search color="primary" />
  //                 </InputAdornment>
  //               ),
  //             }}
  //             placeholder="Search for items/categories"
  //             name="search"
  //           />

  //     </SearchHeader>
  //   );
  // }

  
  
  
  const history = useHistory();  
  return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>

        {/* <SearchHeader>
        
        {hasHiddenAuthButtons ? (<></>) :
        (<TextField       
          className="search-desktop"       
          size="small"
          fullWidth
          // value={searchKey}
          value="apple"
          onChange={handleInputChange}
          InputProps={{
          endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          placeholder="Search for items/categories"
          name="search"
        />)

      }

       </SearchHeader> */}

       {searchBox}

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

           (
           
           <Stack direction="row"  spacing={2} className = "ms-auto">
                
           <Button className="explore-button" color="primary" variant="text"   onClick={() => history.push("/login", {from:"Header"})}>LOGIN</Button>
           <Button className="button" color="primary" variant="contained"   onClick={() => history.push("/register", {from:"Header"})}>REGISTER</Button> 
           
           </Stack>
           )
        )

        }
      </Box>
    );
};

export default Header;
