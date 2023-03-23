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
import Cart from "./Cart"
import {generateCartItemsFrom} from "./Cart"

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

  const {enqueueSnackbar} = useSnackbar();
 
  const[product,setProduct] = useState([]);
  const [searchKey, setSearchKey] = useState("");
 
  const [filtered, setFiltered] = useState([]);
  const [filterGrid, setFilterGrid] = useState(false);

  const [isProduct, setIsProduct] = useState(false);
  const [isloading, setIsLoading] = useState(false);
 
  const [isMainPage, setIsMainPage] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(0);
  const [getun, setUn] = useState();

  const [displayCart, setDisplayCart] = useState([]);
  const [displayAddToCard, setDisplayAddToCart] = useState([]);
  


  let s;
  let url;
  let searchUrl;
  let access_token;
  let getCartItem;
  // let dataCart;
 
  // let returnedCartData = [];

  useEffect(async() => {
   
  const productDataCart = await performAPICall();
  
  setProduct(productDataCart);
   let ls = localStorage.getItem("username");
  
   access_token = localStorage.getItem("token");
   
   console.log("helo "+ access_token);
  if(access_token){
  //  postCart();
  
   
   let dataCart = await fetchCart(access_token);
   console.log("This is data cart")
   console.log(dataCart);   
   setDisplayCart(dataCart);

   let returnedCartData = generateCartItemsFrom(dataCart, productDataCart);
   
  console.log("Returned card data");
  console.log(returnedCartData)

 //  setDisplayCart(returnedCartData);
    setDisplayAddToCart(returnedCartData);

  }
   
   
   setUn(ls);

  //  performSearch(searchKey);
  }, []);

  // let returnedCartDataa;
  // useEffect(()=>{

  //   let returnedCartDataa = generateCartItemsFrom(displayCart, product);

  //   setDisplayAddToCart(returnedCartDataa);

  //   console.log("This is displayCart")
  //   console.log(displayCart);
  
  //   console.log("This id displayAddToCart")
  //   console.log(displayAddToCard)

  //   console.log("Add to cart in returnedCartDetail response")
  //   console.log(returnedCartDataa)

  // },[displayCart])

  
  // console.log("This is displayCart")
  // console.log(displayCart);

  // console.log("This id displayAddToCart")
  // console.log(displayAddToCard)

  // useEffect(() => {
  //   setDisplayCart(generateCartItemsFrom(displayAddToCard, product));
  // },[displayAddToCard])

  


//  if(ls){
//     console.log(ls);
//   }
  
  
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

try{
  let response = await axios.get(url)
    
    setProduct(response.data);

    setIsLoading(false);
    setIsProduct(true);
    setIsMainPage(true);
    console.log("inside api")
    console.log(response.data);
    // productDataCart = res.data;
    return response.data;
 
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

  const postCart = async(productId, qty) => {
    let token = localStorage.getItem("token");
    let postUrl = config.endpoint + "/cart";
    console.log("inside postcart")
    // console.log(formData);
    let body = {"productId": productId,"qty": qty};

try{
   let response = await axios.post(postUrl,body, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type' : 'application/json'
      }
    });

    // return response.data;
    setDisplayCart(response.data);

    let returnedCData = generateCartItemsFrom(response.data, product);

    setDisplayAddToCart(returnedCData);
    // window.location.reload();
  }
  catch(err){
    console.log(err);
  }
  
  }

  const fetchCart = async(access_token) => {

    if(access_token){
   
    let getUrl = config.endpoint + "/cart";
try
   { 
    let response = await axios.get(getUrl, {
      headers: {
        'Authorization': `Bearer ${access_token}` 
       
      }
    });
    
    // console.log(response.data);
    // getCartItem = response.data;
    return response.data;
    
  
  }
    catch(err){
      if(err.response){
        console.log(err.response);
      }
      else{
        console.log("err in else");
      }
    }

    
  }

  }
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

    


  

  };

  // onChange={(event)=>{debounceSearch(event,500)}}
  const handleInputChange = (e) => {
    debounceSearch(e, debounceTimeout);
    
  }
  // console.log(access_token);

  
// TODO: CRIO_TASK_MODULE_CART - Return if a product already exists in the cart
  /**
   * Return if a product already is present in the cart
   *
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { String } productId
   *    Id of a product to be checked
   *
   * @returns { Boolean }
   *    Whether a product of given "productId" exists in the "items" array
   *
   */
  const isItemInCart = (items, productId) => {
    
    console.log(items)
    console.log(productId)
    // const itemsInCart = items.filter(i => i.productId === productId);
    console.log("Hello ther im in item cart")

    for(let i=0; i< items.length; i++){
      console.log("*")
      if(items[i].productId === productId){
        return true;
      }
    }
    
    return false;
  };
 
  /**
   * Perform the API call to add or update items in the user's cart and update local cart data to display the latest cart
   *
   * @param {string} token
   *    Authentication token returned on login
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { Array.<Product> } products
   *    Array of objects with complete data on all available products
   * @param {string} productId
   *    ID of the product that is to be added or updated in cart
   * @param {number} qty
   *    How many of the product should be in the cart
   * @param {boolean} options
   *    If this function was triggered from the product card's "Add to Cart" button
   *
   * Example for successful response from backend:
   * HTTP 200 - Updated list of cart items
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 404 - On invalid productId
   * {
   *      "success": false,
   *      "message": "Product doesn't exist"
   * }
   */
  


 

  const addToCart = async (
    token,
    items,
    products,
    productId,
    qty,
    options = { preventDuplicate: false }
  ) => {
    
   
  

    if(token != ''){

      if(options.preventDuplicate){

        

      if(isItemInCart(displayCart, productId)){
 
        console.log("helo im inside prevent dub")

        enqueueSnackbar('Item already in cart. Use the cart sidebar to update quantity or remove item.', {variant:"warning"});
        // <enqueueSnackbar style={{variant:"warning"}}>Item already in cart. Use the cart sidebar to update quantity or remove item.</enqueueSnackbar>
        console.log("already present");
        
      }
      else{

        console.log("posting occurs")

        postCart(productId, qty);
        // await postCart({"productId":productId, "qty":qty}, token);
        // let token = localStorage.getItem("token");
        // let postUrl = config.endpoint + "/cart";

        // let body = {"productId":productId, "qty":qty};

        // axios.post(postUrl,items, {
        //   headers: {
        //     'Authorization': `Bearer ${token}`,
        //     'Content-type' : 'application/json'
        //   }
        // }).then(function(response){
          

        //  setDisplayCart(response.data);





        //  let returnedData = generateCartItemsFrom(response.data, products);

        //  setDisplayAddToCart(returnedData);

        //  console.log("Add to cart in returnedCartDetail response")
        //  console.log(returnedCartDataa)
        
   

 //  setDisplayCart(returnedCartData);

        //  setDisplayAddToCart(returnedCartDataa);


          // console.log("Inside addtocard axios")
          // console.log(response.data);

        // }).catch(function(err){
        //   console.log(err)
        // });

      }
    }
    else{
      console.log("Indise the handle quantity")
      console.log(items);
      postCart(productId, qty);
    }

    }

    else{
      enqueueSnackbar('Login to add an item to the Cart', {variant:"warning"})
      // console.log('Login to add an item to the Cart', {variant:"warning"});
      return null;
    }

   

   

    

   
  };
 


  // useEffect(() => {

  //   console.log("Hey i am baked")

  // },[displayAddToCard])

 


  const handleQuantity = (productId, qty) => {

    console.log("product ID: " + productId)
    console.log("qty : "+ qty);
    let options = {preventDuplicate:false}
    if(qty === 0){
      console.log("hello im peeking here")
      options = {...options, ["delete"]:true}

    }
   let token = localStorage.getItem("token");
    
  addToCart(token, displayCart, product, productId, qty, options );

      
    
  }


  

  







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

       {(getun) ? (

          <Grid container>
                  
                    
              <Grid container spacing = {2} md={9} xs={12}>
                <Grid item className="product-grid" md={12}>
                  <Box className="hero">
                    <p className="hero-heading">
                      India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
                      to your door step
                    </p>
                  </Box>
                </Grid>

                {/* <div style={{ padding: 10 }}> */}

              <Grid container spacing = {2} px="1rem" my="1rem">

           

              {isloading ? (
              //load
              <div><Grid container item spacing={2} direction="column" className="loading"><center><CircularProgress /></center>
              <center><strong>Loading Products...</strong></center></Grid>
              </div>
              ) :

              ( isProduct ? (
              isMainPage ? (
              //product page

              product.map((val) => {
                
                return (
                  <Grid item xs={6} md={3} key = {val._id} className="product-grid">
                    <ProductCard product={val} handleAddToCart = {addToCart}
                        
                    />
                  </Grid>
                );
              })

              
              ) : ( 

              //filterpage
              
              filtered.map((val) => {
                
                return (
                  <Grid item xs={6} md={3} key = {val._id} className="product-grid">
                    <ProductCard product={val} handleAddToCart = {addToCart}
                        
                    />
                  </Grid>
                );
              })

              )):(

              <Grid container item spacing={2} direction="column" className="loading">
             
                
                <SentimentDissatisfied />
                <p>No products found!</p>
                
                </Grid>
              

              )
              
              )

              }

              </Grid>
              {/* </div> */}
              </Grid>

              <Grid container xs={12} md={3} bgcolor="#E9F5E1">
              
              <Grid item xs={12} md={12}>
                
                <Cart  items = {displayAddToCard} products = {product}  handleQuantity = {handleQuantity}
                  />

                
               
              
              </Grid>
              
              </Grid>

              </Grid>



       ):(
        
        <Grid>
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

       
     <div style={{ padding: 20 }}>

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
              <ProductCard product={val} handleAddToCart = {addToCart}
                 
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
              <ProductCard product={val} handleAddToCart = {addToCart}
                 
              />
            </Grid>
          );
        })}
      </Grid>
      )):(

        <Box className="loading">
       
         <SentimentDissatisfied />
         <p>No products found!</p>
         </Box>
        

      )
        
      )
      
    }
    </div>

        </Grid>

       )}
     

          
        

     
    
      
      <Footer />
    </div>
  );
};

export default Products;
