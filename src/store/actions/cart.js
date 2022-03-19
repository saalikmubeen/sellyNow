
export const addToCart = (product) => {
    return { type: "ADD_TO_CART", payload: { product: product } }
}

export const removeFromCart = (productId) => {
    return { type: "REMOVE_FROM_CART", payload: { productId: productId } };
}


export const clearCart = () => {
    return { type: "CLEAR_CART" };
};