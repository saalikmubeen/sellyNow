
export const addOrder = (items, totalAmount) => {
    return { type: "ADD_ORDER", payload: { items: items, totalAmount: totalAmount } };
}


export const deleteOrder = (id) => {
    return {
        type: "DELETE_ORDER",
        payload: { orderId: id },
    };
};