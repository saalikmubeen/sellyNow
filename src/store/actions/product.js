export const fetchProducts = () => {
    return async (dispatch) => {
        try {
            const res = await fetch(
                `https://firestore.googleapis.com/v1/projects/reactnative-shopapp-5b661/databases/(default)/documents/products`,
                { method: "GET" }
            );

            const data = await res.json();

            dispatch({
                type: "FETCH_PRODUCTS",
                payload: data,
            });
        } catch (err) {
            console.log(err);
        }
    };
};
