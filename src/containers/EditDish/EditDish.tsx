import {useNavigate, useParams} from 'react-router-dom';
import {useCallback, useEffect, useState} from 'react';
import axiosApi from '../../axiosApi';
import {ApiDish} from '../../types';
import DishForm from '../../components/DishForm/DishForm';

const EditDish = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [dish, setDish] = useState<ApiDish | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)



  const fetchOneDish = useCallback(async ()=>{
    try{
      setIsUpdating(true)
      const {data:dish} = await axiosApi.get<ApiDish | null>(
        `/dishes/${id}.json`
      );
      setDish(dish);
    }finally {
      setIsUpdating(false)
    }
  },[id])


  const updateDish = async (dish:ApiDish)=>{
    await axiosApi.put(`/dishes/${id}.json`, dish)
    navigate("/")
  }

  useEffect(() => {
    void fetchOneDish()
  }, [fetchOneDish]);

  return (
    <div className="row mt-2">
      <div className="col">
        {dish && (
          <DishForm onSubmit={updateDish} existingDish={dish} isLoading={isUpdating}/>
        )}
      </div>
    </div>
  );
};

export default EditDish;