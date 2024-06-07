export interface Dish {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

export interface DishMutation {
  name: string;
  description: string;
  image: string;
  price: string;
  vegetarian: boolean;
}

export interface CartDish{
  dish:Dish;
  amount: number;
}
