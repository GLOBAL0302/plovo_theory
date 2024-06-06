import {Dish, DishMutation} from '../../types';
import React, {useState} from 'react';

interface Props{
  onSubmit:(dish:Dish)=>void
}
const DishForm:React.FC<Props> = ({onSubmit}) => {
  const [dishMutation, setDishmutation] = useState<DishMutation>({
    name:'',
    description: '',
    image:'',
    price:""
  })

  const changeDish = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    console.log("target name", event.target.name);
    console.log("target value", event.target.value)
    setDishmutation((prevState)=>(
      {
        ...prevState,
        [event.target.name]: event.target.value,
      }
    ))
  }

  const onFormSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    onSubmit({
      id: Math.random().toString(),
      ...dishMutation,
      price: parseFloat(dishMutation.price)
    });

    setDishmutation({
      name:'',
      description: '',
      image:'',
      price:""
    })
  }


  return (
    <form onSubmit={onFormSubmit}>
      <h4>Add new Dish</h4>
      <div className='form-group'>
        <label htmlFor="name">
        Name
        </label>
        <input
          required
          type="text"
          name='name'
          id="name"
          className="form-control"
          onChange={changeDish}
          value={dishMutation.name}/>
      </div>
      <div className='form-group'>
        <label htmlFor="description">
          Description
        </label>
        <textarea
          name='description'
          id="description"
          className="form-control"
          onChange={changeDish}
          value={dishMutation.description}/>
      </div>
      <div className='form-group'>
        <label htmlFor="image">
          Image
        </label>
        <input
          required
          type="url"
          name='image'
          id="image"
          className="form-control"
          onChange={changeDish}
          value={dishMutation.image}/>
      </div>
      <div className='form-group'>
        <label htmlFor="price">
          Price
        </label>
        <input
          required
          type="number"
          name='price'
          id="price"
          min={10}
          className="form-control"
          onChange={changeDish}
          value={dishMutation.price}/>
      </div>
      <button type='submit' className='btn btn-primary mt-2'>Create</button>
    </form>
  );
};

export default DishForm;