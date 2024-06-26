import {useParams} from 'react-router-dom';

const DishPage = () => {
  const params = useParams()
  console.log(params.dishId)
  return (
    <div>
      <h4>page of one Dish id = {params.dishId}</h4>
      
    </div>
  );
};

export default DishPage;