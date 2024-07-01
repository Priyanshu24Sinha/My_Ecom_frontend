import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'
import axios from 'axios'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AppState = (props) => {

  // const url = "http://localhost:1000/api"

  const url = "https://my-ecom-api.onrender.com/api"

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false)
  const [userAddress, setUserAddress] = useState("")
  const [userOrder, setUserOrder] = useState([])


  // const data=10;

  useEffect(() => {

    const fetchProduct = async () => {

      const api = await axios.get(`${url}/product/all`, {
        headers: { "Content-Type": "Application/json" },
        withCredentials: true
      })
      console.log(api.data.products);
      setProducts(api.data.products);
      setFilteredData(api.data.products);
      userProfile();
    };
    fetchProduct();
    userCart();
    getAddress();
    user_Order();
  }, [token,reload]);



useEffect(() => {
let lstoken = localStorage.getItem("token");

// console.log("lstoken",lstoken)

 if(lstoken) {
  setToken(lstoken)
   setisAuthenticated(true)
}

setToken(localStorage.getItem( 'token'))
}, [])





  //register user

  const register = async (name, email, password) => {

    const api = await axios.post(`${url}/user/register`, { name, email, password }, {
      headers: { "Content-Type": "Application/json" },
      withCredentials: true
    })

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
    // alert(api.data.message)
    // console.log("user registered",api)
  }

  // Login user

  const login = async (email, password) => {

    const api = await axios.post(`${url}/user/login`, { email, password }, {
      headers: { "Content-Type": "Application/json" },
      withCredentials: true
    })

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    // alert(api.data.message)
    // console.log("user login",api.data)
    setToken(api.data.token)
    setisAuthenticated(true)
    localStorage.setItem('token', api.data.token)
    return api.data;
  }


  // logout user

  const logout = ()=>{
    setisAuthenticated(false)
    setToken(" ")
    localStorage.removeItem('token')
    toast.success("Logged Out Succesfully", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }


  // user profile

  const userProfile = async () => {

    const api = await axios.get(`${url}/user/profile`, {
      headers: { 
        "Content-Type": "Application/json" ,
         "Auth":token
      },
      withCredentials: true
    })
    // console.log("user profile",api.data);
    setUser(api.data.user)
   
  };


  // add to cart

  const addToCart = async (productId,title,price,qty,imgSrc) => {

    const api = await axios.post(`${url}/cart/add`,{productId,title,price,qty,imgSrc}, {
      headers: { 
        "Content-Type": "Application/json",
        Auth:token,
      },
      withCredentials: true,
    })
    setReload(!reload)

    // console.log("my cart",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    
  };


  //  user cart

  const userCart = async () => {

    const api = await axios.get(`${url}/cart/user`, {
      headers: { 
        "Content-Type": "Application/json" ,
         Auth:token
      },
      withCredentials: true
    })
    // console.log("user cart",api.data.cart);
    setCart(api.data.cart)
   
  };


  // decrease qty

  const decreaseQty = async (productId,qty) => {

    const api = await axios.post(`${url}/cart/--qty`,{productId,qty}, {
      headers: { 
        "Content-Type": "Application/json" ,
         Auth:token
      },
      withCredentials: true,
    })
  setReload(!reload)
  toast.success(api.data.message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
    // console.log("decrease cart item",api);
    // setCart(api.data.cart)
   
  };


  //  remove prod from cart

  const removeFromCart = async (productId) => {

    const api = await axios.delete(`${url}/cart/remove/${productId}`, {
      headers: { 
        "Content-Type": "Application/json" ,
         Auth:token
      },
      withCredentials: true,
    })
  setReload(!reload)
  toast.success(api.data.message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
    // console.log("remmove cart item",api);
    // setCart(api.data.cart)
   
  };



  // clear cart

  const clearCart = async () => {

    const api = await axios.delete(`${url}/cart/clear`, {
      headers: { 
        "Content-Type": "Application/json" ,
         Auth:token
      },
      withCredentials: true,
    })
  setReload(!reload)
  toast.success(api.data.message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
    // console.log("remmove cart item",api);
    // setCart(api.data.cart)
   
  };


  // add  shipping address

  const shippingAddress = async (fullName, address, city, state, country, pincode, phoneNumber) => {

    const api = await axios.post(`${url}/address/add`,{fullName, address, city, state, country, pincode, phoneNumber}, {
      headers: { 
        "Content-Type": "Application/json" ,
         Auth:token
      },
      withCredentials: true,
    })
  setReload(!reload)
  toast.success(api.data.message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
 return api.data

    // console.log("remmove cart item",api);
    // setCart(api.data.cart)
   
  };


  // get user's latest address

  const getAddress = async () => {

    const api = await axios.get(`${url}/address/get`, {
      headers: { "Content-Type": "Application/json" ,
        Auth:token
      },
      withCredentials: true,
    })
    // console.log("user address", api.data.userAddress);
   setUserAddress(api.data.userAddress);
   
  };



  // get user order

  const user_Order = async () => {

    const api = await axios.get(`${url}/payment/userorder`, {
      headers: { "Content-Type": "Application/json" ,
        Auth:token
      },
      withCredentials: true,
    })
    // console.log("user order", api.data);
    setUserOrder(api.data);
  
   
  };

console.log("user orders =",userOrder)

  return (
    <AppContext.Provider value={{ products, register, login, url, token, setisAuthenticated, isAuthenticated,
     filteredData, setFilteredData,logout,user,addToCart,cart,decreaseQty,removeFromCart,clearCart,shippingAddress,
     userAddress, userOrder,}}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppState