import './App.css';
import Toolbar from './components/Toolbar/Toolbar';

import {useCallback, useEffect, useState} from 'react';
import {ApiDishesList, CartDish, Dish} from './types';
import Home from './containers/Home/Home';
import NewDish from './containers/NewDish/NewDish';
import {Route, Routes, useLocation} from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import Order from './containers/Order/Order';
import axiosApi from './axiosApi';
import EditDish from './containers/EditDish/EditDish';

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
      const {data:dishes} = await axiosApi.get<ApiDishesList | null>("/dishes.json");
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

  useEffect(() => {
   void updateCard();
  }, [updateCard]);
  const deleleDish = async (id:string)=>{
    if(window.confirm("are you sure you want to delete")){
      await axiosApi.delete(`/dishes/${id}.json`);
      await fetchDishes();

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
    <>
      <header>
        <Toolbar
        />
      </header>
      <main className="container-fluid">
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
            <Route path="continue" element={<Order cartDishes={cartDishes}/>}/>
          </Route>
          <Route path="/edit-dish/:id" element={<EditDish/>}/>
          <Route path="*" element={<h1>not found</h1>}/>
        </Routes>
      </main>
    </>
  );
};

export default App;
