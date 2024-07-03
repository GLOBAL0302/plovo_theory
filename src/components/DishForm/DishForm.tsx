import {ApiDish, DishMutation} from '../../types';
import React, { useState } from "react";

interface Props {
  onSubmit: (dish: ApiDish) => void;
  existingDish?: ApiDish
}

const emptyState = {
  name: "",
  description: "",
  image: "",
  price: "",
};
const DishForm: React.FC<Props> = ({ onSubmit, existingDish }) => {

  const initialState:DishMutation = existingDish ? ({...existingDish, price: existingDish.price.toString()}) : emptyState
  const [dishMutation, setDishmutation] = useState<DishMutation>(initialState);

  const changeDish = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDishmutation((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const changeVeganBoolean = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDishmutation((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.checked,
    }));
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      ...dishMutation,
      price: parseFloat(dishMutation.price),
    });

  };

  return (
    <form onSubmit={onFormSubmit}>
      <h4>{existingDish? "Edit Dish": "Add new Dish"}</h4>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          required
          type="text"
          name="name"
          id="name"
          className="form-control"
          onChange={changeDish}
          value={dishMutation.name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          className="form-control"
          onChange={changeDish}
          value={dishMutation.description}
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          required
          type="url"
          name="image"
          id="image"
          className="form-control"
          onChange={changeDish}
          value={dishMutation.image}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          required
          type="number"
          name="price"
          id="price"
          min={10}
          className="form-control"
          onChange={changeDish}
          value={dishMutation.price}
        />
      </div>
      <div className="form-group">
        <label htmlFor="vegetarian">is Vegetarian</label>
        <input
          type="checkbox"
          name="vegetarian"
          id="vegetarian"
          onChange={changeVeganBoolean}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2">
        {existingDish? "Update" : "Create"}
      </button>
    </form>
  );
};

export default DishForm;
