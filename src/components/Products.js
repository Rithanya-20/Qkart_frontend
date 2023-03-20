import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box, margin } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from "./ProductCard";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */


const Products = () => {
 
  const[product,setProduct] = useState([]);
  const [searchKey, setSearchKey] = useState("");
 
  const [filtered, setFiltered] = useState([]);
  const [filterGrid, setFilterGrid] = useState(false);

  const [isProduct, setIsProduct] = useState(false);
  const [isloading, setIsLoading] = useState(false);
 
  const [isMainPage, setIsMainPage] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(0);
  let s;
  let url;
  let searchUrl;
  // let ls = localStorage.getItem("search");
  // const debounceSearchText = debounceSearch(searchKey, 500);

 



  // useEffect(() => {
  //   // console.log("hellothere");
  //  performAPICall(searchKey);
  // //  performSearch(searchKey);
  // }, [searchKey]);


  // const handleInputChange = (e) => {

  //   s = e.target.value;
  //   setSearchKey(s);
    

  // }
  
  
 
  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  const performAPICall = async () => {
    
  url = config.endpoint + "/products";
  
  setIsLoading(true);

  // console.log(url);
  // setLoad(true); 
  // setGrid(false);
  // setNoProd(false);
  
  // if (titleQuery !== "") {

  //   return performSearch(titleQuery);

  //   // console.log(titleQuery);
  //   // setLoad(false);
  //   // setGrid(true);
  //   // setNoProd(false);
  //   // url = config.endpoint + "/products" + "/search?value="+titleQuery;
    
  //   // console.log(url);
  // }
  // const response = await axios.get(url);

  // setProduct(await response.clone().json());

  

   try{
  await axios.get(url).then((res) => {
    // setLoad(false);
    // setGrid(true);
    // setNoProd(false);
    setProduct(res.data);

    setIsLoading(false);
    setIsProduct(true);
    setIsMainPage(true);
    return res.data;
  });
} 
catch(error){
  // setNoProd(true);
  // setGrid(false);
  // setLoad(false);
  setIsLoading(false);
  setIsProduct(false);
  console.log(error);
}
  
    
  };



  
  

  
  


  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {

    // setLoad(true);
    // setGrid(false);
    // setNoProd(false);

    if(text == null){
     
      performAPICall();
    }

      // console.log(text);
     
      
      searchUrl = config.endpoint + "/products" + "/search?value="+text;
      setIsLoading(false);
      try{
        console.log("at fetch")
        await axios.get(searchUrl).then((res) => {
          // setLoad(false);          
          // setNoProd(false);
          // setGrid(false);
          // setFilterGrid(true);
          setFiltered(res.data);
          
          
          setIsProduct(true);
          setIsMainPage(false);
          return res.data;
        });
      } 
      catch(error){
        // setNoProd(true);
        // setGrid(false);
        // setFilterGrid(false);
        // setLoad(false);

        setIsProduct(false);
        console.log(error);
     }
    
      // console.log(url);



      // return url;
    
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const debounceSearch = (event, debounceTimeout) => {

    let search = event.target.value;
    setSearchKey(search);
    
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
     let timeOut = setTimeout(() => {
       performSearch(search);
      }, 500); // Update set timeoutId    
      setDebounceTimeout(timeOut);

    // setTimeout(() => 
    //   performSearch(event)
    // , debounceSearch);
    
  
  //   console.log(event);
  //   console.log(debounceTimeout);

    
    
  //   const timeout = setTimeout(() => {
     
  //   // console.log("**" + event);
  //   performSearch(event);

  // }, 5000);

  // console.log(timeout);
  // // clearTimeout(timeout);


  

  };

  // onChange={(event)=>{debounceSearch(event,500)}}
  const handleInputChange = (e) => {
    debounceSearch(e, debounceTimeout);
    //  s = e.target.value;
    //  setSearchKey(s);
    //  debounceSearch(s, 5000);
    //  setSearchKey( debounceSearch(s, 5000));
  }

  useEffect(() => {
    // console.log("hellothere");
   performAPICall();
  //  performSearch(searchKey);
  }, []);

  // useEffect(() => {

  //   if(searchKey){
  //     if(timerId){
  //       clearTimeout(timerId);
  //     }
  //     const debounceTimeId = debounceSearch(searchKey, 500);
  //     setTimeId(debounceTimeId);

  //   }

  // }, [searchKey])







  return (
    <div>
      <Header
       
        children = {
          <TextField       
          className="search-desktop"       
          size="small"
          fullWidth
          // value={searchKey}
          value={searchKey}
          onChange = {handleInputChange}
          InputProps={{
          endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          placeholder="Search for items/categories"
          name="search"
        />
        }

      />

      {/* Search view for mobiles */}

      
        


      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        value={searchKey}
        onChange = {handleInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
      />
       <Grid container>
         <Grid item className="product-grid">
           <Box className="hero">
             <p className="hero-heading">
               India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
               to your door step
             </p>
           </Box>
         </Grid>
       </Grid>

       {/* {noProd && (
        <div ><Grid container spacing={2} direction="column" className="loading">
        <center>
         <SentimentDissatisfied />
         <p>No products found!</p>
         </center></Grid>
        </div>
       ) 
        } 

       { load && (
       
       <div className="loadit"><Grid container spacing={2} direction="column" className="loading"><center><CircularProgress /></center>
       <center><strong>Loading Products...</strong></center></Grid>
      </div>
      
      ) }

      {grid && ( <Grid container spacing={2}>
        {product.map((val) => {
          
          return (
            <Grid item xs={6} md={3} key = {val._id}>
              <ProductCard product={val}
                 
              />
            </Grid>
          );
        })}
      </Grid>)}


      {filterGrid && ( <Grid container spacing={2}>
        {filtered.map((val) => {
          
          return (
            <Grid item xs={6} md={3} key = {val._id}>
              <ProductCard product={val}
                 
              />
            </Grid>
          );
        })}
      </Grid>)} */}


      {isloading ? (
        //load
        <div><Grid container spacing={2} direction="column" className="loading"><center><CircularProgress /></center>
       <center><strong>Loading Products...</strong></center></Grid>
      </div>
      ) :
      
      ( isProduct ? (
        isMainPage ? (
        //product page
        <Grid container spacing={2}>
        {product.map((val) => {
          
          return (
            <Grid item xs={6} md={3} key = {val._id}>
              <ProductCard product={val}
                 
              />
            </Grid>
          );
        })}
      </Grid>
        
      ) : ( 

        //filterpage
        <Grid container spacing={2}>
        {filtered.map((val) => {
          
          return (
            <Grid item xs={6} md={3} key = {val._id}>
              <ProductCard product={val}
                 
              />
            </Grid>
          );
        })}
      </Grid>
      )):(

        <div ><Grid container spacing={2} direction="column" className="loading">
        <center>
         <SentimentDissatisfied />
         <p>No products found!</p>
         </center></Grid>
        </div>

      )
        
      )
      
    }

    {/* {
      isNoProduct && (
        <div ><Grid container spacing={2} direction="column" className="loading">
        <center>
         <SentimentDissatisfied />
         <p>No products found!</p>
         </center></Grid>
        </div>
      )
    } */}

       

       {/* {noProd ? (
        <div>
        <center>
         <SentimentDissatisfied />
         <p>No products found!</p>
         </center>
        </div>
       ) : 
       
       ( <Grid container spacing={2}>
        {product.map((val) => {
          
          return (
            <Grid item xs={6} md={3}>
              <ProductCard product={val}

              />
            </Grid>
          );
        })}
      </Grid>)
      }

      

       { load ?
       
       
       (<div><center><CircularProgress /></center>
           <center><strong>Loading Products..</strong>.</center>
      </div>)
      
      
      :

      ( <Grid container spacing={2}>
        {product.map((val) => {
          
          return (
            <Grid item xs={6} md={3}>
              <ProductCard product={val}

              />
            </Grid>
          );
        })}
      </Grid>)

     } */}

       {/* <ProductCard/> */}

       {/* <Button onClick = {performAPICall}>Get</Button> */}

       {/* <Grid container spacing={2}>
        
       <Grid container spacing={2}>
             {
              productData.map((x) => {
                <Grid item xs={6} md={3} key={x['_id']}>
              <ProductCard product={x}
               
              />
            </Grid>

              })
             }
          </Grid>
        {/* {product.map((val) => {
          
          return (

            <Grid item xs={6} md={3}>
              <ProductCard
                image={val[0].image}
                name={val[0].name}
                cost={val[0].cost}
                rating={val[0].rating}
              />
            </Grid>
          );
        })} */}
      {/* </Grid> */} 
       
      <Footer />
    </div>
  );
};

export default Products;
