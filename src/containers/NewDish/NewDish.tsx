import React from 'react';
import DishForm from '../../components/DishForm/DishForm';
import {ApiDish} from '../../types';
import axiosApi from '../../axiosApi';
import {useNavigate} from 'react-router-dom';



const NewDish:React.FC = () => {
  const navigate = useNavigate()
  const createDish = async (dish:ApiDish)=>{
    await axiosApi.post("/dishes.json", dish);
    navigate("/")
  }

  return (
    <div className="row mt-2">
      <div className="col">
        <DishForm onSubmit={createDish}/>
      </div>
    </div>
  );
};

export default NewDish;