import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import DishForm from './components/DishForm/DishForm';
import Dishes from './components/Dishes/Dishes';
import Cart from './components/Cart/Cart';
import { useState } from 'react';
import { Dish } from './types';

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

  const addDish = (dish: Dish) => {
    setDishes((prevState) => [...prevState, dish]);
  };

  return (
    <>
      <header>
        <Toolbar />
      </header>
      <main className="container-fluid">
        <div className="row mt-2">
          <div className="col-4">
            <DishForm onSubmit={addDish} />
          </div>
          <div className="col-4">
            <Dishes dishes={dishes} />
          </div>
          <div className="col-4">
            <Cart />
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
