import './App.css';
import {useCallback, useEffect, useState} from 'react';
import {ApiDishes, CartDish, Dish} from './types';
import Home from './containers/Home/Home';
import NewDish from './containers/NewDish/NewDish';
import {Route, Routes, useLocation} from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import Order from './containers/Order/Order';
import axiosApi from './axiosApi';
import EditDish from './containers/EditDish/EditDish';
import Orders from './containers/Orders/Orders';
import Layout from './components/Layout/Layout';
import {toast} from 'react-toastify';

const App = () => {
  const location = useLocation();
  const [dishes, setDishes] = useState<Dish[]>([

  ]);
  const [loading, setLoading] = useState(false);


  const [cartDishes, setCartDishes] = useState<CartDish[]>([

  ]);

  const fetchDishes = useCallback(async ()=>{
    try{
      setLoading(true);
      const {data:dishes} = await axiosApi.get<ApiDishes | null>("/dishes.json");
      if(!dishes){
        setDishes([]);
      }else{
        const newDishes = Object
          .keys(dishes)
          .map((id)=>({
            ...dishes[id],
            id,
          }));
        setDishes(newDishes);
      }
    }finally {
      setLoading(false);
    }
  },[]);


  const updateCard =  useCallback(async ()=>{
    setCartDishes(cartDishes => {

      return cartDishes.reduce<CartDish[]>((acc, cartDish)=>{
        const existingDish = dishes.find(dish=> dish.id === cartDish.dish.id);


        if(existingDish){
          acc.push({...cartDish, dish: existingDish});
        }

        return acc;
      },[]);
    });
  },[dishes]);


  const clearCart = ()=>{
    setCartDishes([])
  }

  useEffect(() => {
   void updateCard();
  }, [updateCard]);
  const deleleDish = async (id:string)=>{
    try {
      if(window.confirm("are you sure you want to delete")){
        await axiosApi.delete(`/dishes/${id}.json`);
        toast.success("Dish Deleted");
        await fetchDishes();
      }
    }catch (e){
      toast.error("Error occurred")
    }
  };

  useEffect(() => {
    if(location.pathname === "/"){
      void fetchDishes();
    }
  }, [fetchDishes, location]);

  const addDishToCart = (dish:Dish)=>{
     setCartDishes((prevState)=>{
       const existingIndex = prevState.findIndex(cartDish =>{
         return cartDish.dish.id === dish.id;
       });

       if(existingIndex === -1){
         return[...prevState, {dish, amount: 1}];
       }
       return prevState.map((cartDish, index)=>{
         if(index === existingIndex){
           return {...cartDish, amount : cartDish.amount + 1};
         }
         return  cartDish;
       });
     });
  };


  return (
    <Layout>
        <Routes>
          <Route path="/" element={
            <Home
            dishesLoading ={loading}
            dishes={dishes}
            addToCart={addDishToCart}
            cartDishes={cartDishes}
            deleteDish={deleleDish}
            />
          }/>
          <Route path="new-dish" element={<NewDish/>}/>
          <Route path="/checkout" element={<Checkout cartDishes={cartDishes}/>}>
            <Route path="continue" element={<Order cartDishes={cartDishes} clearCart={clearCart}/>}/>
          </Route>
          <Route path="/edit-dish/:id" element={<EditDish/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="*" element={<h1>not found</h1>}/>
        </Routes>
    </Layout>
  );
};

export default App;
