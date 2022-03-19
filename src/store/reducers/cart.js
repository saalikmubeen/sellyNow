
const initialState = {
    items: [],
    totalAmount: 0
}


const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const { product } = action.payload;
            const alreadyInCart = state.items.some(
                (item) => item.id === product.id
            );

            let updatedItems;
            if (alreadyInCart) {
                updatedItems = state.items.map((item) => {
                    if (item.id === product.id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                            sum: item.sum + item.price,
                        };
                    } else {
                        return item;
                    }
                });
            } else {
                updatedItems = [
                    ...state.items,
                    { ...product, quantity: 1, sum: product.price },
                ];
            }

            const totalAmount = updatedItems.reduce(
                (acc, next) => acc + next.sum,
                0
            );
            return { ...state, items: updatedItems, totalAmount: totalAmount };

        case "REMOVE_FROM_CART":
            const { productId } = action.payload;
            const cartItem = state.items.find((item) => item.id === productId);

            if (cartItem.quantity === 1) {
                return {
                    ...state,
                    items: state.items.filter((item) => item.id !== productId),
                    totalAmount: state.totalAmount - cartItem.price,
                };
            } else {
                const updatedItems = state.items.map((item) => {
                    if (item.id === productId) {
                        return {
                            ...item,
                            sum: item.sum - item.price,
                            quantity: item.quantity - 1,
                        };
                    } else {
                        return item;
                    }
                });

                return {
                    ...state,
                    items: updatedItems,
                    totalAmount: state.totalAmount - cartItem.price,
                };
            }

        case "CLEAR_CART":
            return initialState;

        case "ADD_ORDER":
            return initialState;

        default:
            return state;
    }
}


export default cartReducer;