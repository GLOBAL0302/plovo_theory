
import {CartDish} from '../../types';
import Modal from '../Modal/Modal';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import CartDishes from './CartDishes';


interface Props{
  cartDishes:CartDish[]
}

const Cart:React.FC<Props> = ({cartDishes}) => {
  const navigate = useNavigate()

  const [showModal, setShowModal] = useState(false);

  let cart = (
    <div className="alert alert-primary">
      Cart is empty! add something!
    </div>)


    if(cartDishes.length > 0){
      cart = (
        <>
          <CartDishes cartDishes={cartDishes}/>
          <button
            className="w-100 btn btn-primary"
            onClick={()=>setShowModal(!showModal)}
            > Order</button>
        </>
      )
    }
  return <>
    <h4>Cart</h4>
    {cart}
    <Modal
      show={showModal}
      title="Order"
      onClose={()=>setShowModal(!showModal)}>
      <div className="modal-body">
        <p>Do you want to checkout</p>
      </div>
      <div className="modal-footer">
        <button
          className="btn btn-danger"
          onClick={()=>setShowModal(!showModal)}
          >
          Cancel
        </button>
        <button
          onClick={()=>navigate("/checkout")}
          className="btn btn-success">
        Continue
        </button>
      </div>
    </Modal>
    </>;
};

export default Cart;
