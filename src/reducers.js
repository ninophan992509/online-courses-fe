import { ADD_ITEM_TO_CART, CLEAR_CART, INIT, REMOVE_ITEM_IN_CART } from "./constants";


export default function reducer(state, action) {
  switch (action.type) {
    case INIT:
      return {
        carts:[]
          }
    case ADD_ITEM_TO_CART:
          return {
              ...state,
            carts: [...state.carts, action.payload] 
          }
    case CLEAR_CART:
      return {
        ...state,
        carts: []
          }
      
    case REMOVE_ITEM_IN_CART:
      return {
        ...state,
        carts: state.carts.filter(c => c.id !== action.payload.cartId)
      }

    case 'update_query':
      return {
        ...state,
        query: action.payload.query
      }

    case 'complete_task':
      return {
        ...state,
        items: state.items.map(i => i.id === action.payload.itemId ? { ...i, complete: true } : i)
      }

    default:
      return state;
  }
}