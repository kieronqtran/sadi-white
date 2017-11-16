import { combineReducers } from 'redux'
function orderReducer(state = [], action){
  switch(action.type){
    case 'FETCH_ORDER_SUCCESS':
      state = action.orders
      return state
    case 'DELETE_ORDER':
      var newOrders = state.filter(order=>{
        return order.id!=action.id
      })
      return newOrders

    case 'ADD_ORDER_SUCCESS':
      var newOrders = [...state, action.order] 
      return newOrders;
    default:
      return state
  }
}


function editedOrderReducer(state = {}, action){
  switch(action.type){
    case 'EDIT_ORDER_SUCCESS':
      return action.editedOrder
    case 'ADDNEW_ORDER':
      return initialEditedOrder
    default: 
      return state
  }
}

const combinedReducer = combineReducers({
   orderReducer, editedOrderReducer
})

export default combinedReducer