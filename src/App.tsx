import './App.css';
import Toolbar from './components/Toolbar/Toolbar';

import { useState } from 'react';
import {CartDish, Dish} from './types';
import Home from './containers/Home/Home';
import NewDish from './containers/NewDish/NewDish';
import {Route, Routes} from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import Order from './containers/Order/Order';
import DishPage from './containers/DishPage/DishPage';

const App = () => {
  const [dishes, setDishes] = useState<Dish[]>([
    {
      id: '1',
      name: 'plov',
      description: 'very tasty pilaf',
      image:
        'https://png.pngtree.com/element_our/png/20180930/food-icon-design-vector-png_120564.jpg',
      price: 250,
    },
    {
      id: '2',
      name: 'Manty',
      description: 'Yummy Manty',
      image:
        'https://png.pngtree.com/element_our/png/20180930/food-icon-design-vector-png_120564.jpg',
      price: 150,
    },
    {
      id: '3',
      name: 'lagman',
      description: 'chinese lagman',
      image:
        'https://png.pngtree.com/element_our/png/20180930/food-icon-design-vector-png_120564.jpg',
      price: 100,
    },
  ]);





  const [cartDishes, setCartDishes] = useState<CartDish[]>([

  ])

  const addDish = (dish: Dish) => {
    setDishes((prevState) => [...prevState, dish]);
  };

  const addDishToCart = (dish:Dish)=>{
     setCartDishes((prevState)=>{
       const existingIndex = prevState.findIndex(cartDish =>{
         return cartDish.dish.id === dish.id
       })

       if(existingIndex === -1){
         return[...prevState, {dish, amount: 1}]
       }
       return prevState.map((cartDish, index)=>{
         if(index === existingIndex){
           return {...cartDish, amount : cartDish.amount + 1}
         }
         return  cartDish
       })
     })
  }


  return (
    <>
      <header>
        <Toolbar
        />
      </header>
      <main className="container-fluid">
        <Routes>
          <Route path="/" element={<Home dishes={dishes} addToCart={addDishToCart} cartDishes={cartDishes}/>}/>
          <Route path="new-dish" element={<NewDish onCreate={addDish}/>}/>
          <Route path="/checkout" element={<Checkout cartDishes={cartDishes}/>}>
            <Route path="continue" element={<Order cartDishes={cartDishes}/>}/>
          </Route>
          <Route path="/dishes/:dishId" element={<DishPage/>}/>
          <Route path="*" element={<h1>not found</h1>}/>
        </Routes>
      </main>
    </>
  );
};

export default App;
