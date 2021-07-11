import { ADD_ITEM_TO_CART, CLEAR_CART, INIT, REMOVE_ITEM_IN_CART } from "./constants";


export default function reducer(state, action) {
  switch (action.type) {
    case INIT:
      return {
        carts:[]
      }
    case ADD_ITEM_TO_CART:

        localStorage.setItem('carts', JSON.stringify([...state.carts, action.payload]));
         return {
         ...state,
           carts: [...state.carts, action.payload]
         }  
     
    case CLEAR_CART:
      localStorage.removeItem('carts');
      return {
        ...state,
        carts: []
      }    
    case REMOVE_ITEM_IN_CART:
      localStorage.setItem('carts',JSON.stringify(state.carts.filter(c => c.id !== action.payload.id)));
      return {
        ...state,
        carts: state.carts.filter(c => c.id !== action.payload.id)
      }
    default:
      return state;
  }
}