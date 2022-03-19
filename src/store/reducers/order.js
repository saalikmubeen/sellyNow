import Order from "../../models/Order";

const initialState = {
    orders: []
}


const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_ORDER":
            const newOrder = new Order(Math.random(), action.payload.items, action.payload.totalAmount, new Date());
            return { ...state, orders: [...state.orders, newOrder] };

        case "DELETE_ORDER":
            const orders = state.orders.filter((order) => order.id !== action.payload.orderId)
            return {...state, orders}
        default:
            return state
    }
}


export default orderReducer;