
const initialState = {
    token: null,
    uid: null,
    email: null
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SIGN_UP":
            const { token, uid, email} = action.payload
            return { token, uid, email }
        case "LOG_OUT":
            return initialState;
        default:
            return state;
    }
}


export default authReducer;