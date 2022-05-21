import './App.css';
import Navbar from './components/navbar/Navbar';
import Products from './components/products/Products';
import {commerce} from './lib/commerce';
import {useState,useEffect} from 'react';
import Cart from './components/cart/Cart';
import {BrowserRouter as Router} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import CheckOut from './components/checkOutForm/checkOut/CheckOut';

function App() {
  const [products,setProducts] =  useState([]);
  const [cart,setCart] = useState([]);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  // console.log(cart)

  const fetchProducts = async () => {
      const { data } = await commerce.products.list();
  
      setProducts(data);
    };
  const fetchCart = async () =>{
    const res = await commerce.cart.retrieve();
    setCart(res); 
  
  }
  const handleAddToCart = async (productId,quantity)=>{
    const {cart} = await commerce.cart.add(productId,quantity);
    setCart(cart);
  }
  const handleUpdateCartQty= async (prodcutId,quantity)=>{
    const {cart} = await commerce.cart.update(prodcutId,quantity);
    setCart(cart);
  }
  const handleRemoveFromCart = async (prodcutId)=>{
    const {cart} = await commerce.cart.remove(prodcutId);
    setCart(cart);
  }
  const handleEmptyCart = async ()=>{
    const {cart} = await commerce.cart.empty();
    setCart(cart);
  }
  useEffect(()=>{
    fetchProducts();
    fetchCart();
    
  }, []);
  
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  return (
    <Router>
    <div className="App">
      <Navbar totalItems={cart.total_items} />
      <Routes>
        <Route path='/' exact element={<Products handleAddToCart={handleAddToCart} products={products}/>}/>
        <Route path='/cart' exact element={ <Cart cart={cart} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart} handleEmptyCart={handleEmptyCart}/>}/>
        <Route path='/checkout' exact element={<CheckOut cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage}/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
