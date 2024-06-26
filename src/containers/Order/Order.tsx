import React, {useState} from 'react';
import {CartDish, Customer, OrderData} from '../../types';
import axiosApi from '../../axiosApi';
import {useNavigate} from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

interface Props{
  cartDishes:CartDish[]
}

const Order:React.FC<Props> = ({cartDishes}) => {
  const [customer, setCustomer] = useState<Customer>(
    {
      name:"",
      phone:"",
      address:''
    }
  )

  const [isLoading, setIsLoading]= useState(false)
  const navigate = useNavigate()

  const onFieldChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = event.target;

    setCustomer((prevState)=>({
      ...prevState,
      [name]:value,
    }))
  }

  const onFormSubmit= async (e:React.FormEvent)=>{
    e.preventDefault();
    setIsLoading(true);

    const order:OrderData ={
      customer,
      dishes:cartDishes
    }

    try{
      await  axiosApi.post("/orders.json", order)
    }finally {
      setIsLoading(false)
      navigate("/")
    }
  }

  let form =(
    <form onSubmit={onFormSubmit}>
      <div className="form-group">
        <label htmlFor="name">Client name</label>
        <input
          value={customer.name}
          onChange={onFieldChange}
          id="name" type="text" name="name"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          onChange={onFieldChange}
          value={customer.address}
          id="address" type="text" name="address"
          className="form-control"
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="phone">Phone</label>
        <input
          onChange={onFieldChange}
          value={customer.phone}
          id="phone" type="text" name="phone"
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Place order
      </button>
    </form>
  )

  if(isLoading){
    form =(
      <div className="d-flex justify-content-center align-items-center" style={{height:"300px"}}>
      <Spinner/>
      </div>
    )
  }
  return (
    <div className="row mt-2">
      <div className="col">
        {form}
      </div>
    </div>
  );
};

export default Order;