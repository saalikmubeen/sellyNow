import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = "AIzaSyB29XF2pf3Y29kZcTO5cfJ3__PZLebTGH4"

export const signUp = (email, password) => {
    return async function (dispatch) {
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
            method: "POST",
            "Content-Type": "application/json",
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if (!res.ok) {
            const errorResData = await res.json();
            const errorId = errorResData.error.message;

            let message = 'Something went wrong!';
            
            if (errorId === 'EMAIL_EXISTS') {
                message = 'This email exists already!';
            } else if (errorId === "INVALID_EMAIL") {
                message = "Please provide a valid email!"
            } else if (errorId === "WEAK_PASSWORD : Password should be at least 6 characters") {
                message = "Password should be at least 6 characters long!"
            }
            
            throw new Error(message);
        }

        const data = await res.json();   // const expiresIn = data.expiresIn
        const userObj = {token: data.idToken, uid: data.localId, email: data.email}
        
        await AsyncStorage.setItem('user', JSON.stringify(userObj));
        
        dispatch({ type: "SIGN_UP", payload:  userObj});
        
    }
}


export const signIn = (email, password) => {
    return async function (dispatch) {
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
            method: "POST",
            "Content-Type": "application/json",
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if (!res.ok) {
            const errorResData = await res.json();
            const errorId = errorResData.error.message;

            let message = 'Something went wrong!';

            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found!';
                } else if (errorId === 'INVALID_PASSWORD') {
                message = 'This password is not valid!';
            }
            throw new Error(message);
        }

        const data = await res.json();
        const userObj = {token: data.idToken, uid: data.localId, email: data.email}
        
        await AsyncStorage.setItem('user', JSON.stringify(userObj));
        
        dispatch({ type: "SIGN_UP", payload:  userObj});
        
    }
}

export const autoLogin = () => {
    return async function (dispatch) {
        const user = await AsyncStorage.getItem('user');
        const userObj = JSON.parse(user);

        if (!userObj) {
            return dispatch({ type: "LOG_OUT" });
        }

        dispatch({ type: "SIGN_UP", payload: userObj });
    }
}


export const logOut = () => {
    return async function (dispatch) {
        await AsyncStorage.setItem('user', JSON.stringify({}));

        dispatch({ type: "LOG_OUT" });
    }
}