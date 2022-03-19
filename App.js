import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Platform,
    ActivityIndicator,
} from "react-native";


import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { autoLogin } from "./src/store/actions/auth";
import storeConfig from "./src/store/configureStore";
import colors from "./src/constants/Colors";
import { DrawerNavigator } from "./src/navigation/DrawerNavigator";
import { AuthStackNavigator } from "./src/navigation/AuthStackNavigator";


function RootComponent() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const authState = useSelector((state) => state.auth);

    const tryAutoLogin = async () => {
        setLoading(true);
        await dispatch(autoLogin());
        setLoading(false);
    };

    useEffect(() => {
        tryAutoLogin();
    }, []);

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {authState.token ? <DrawerNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>
    );
}

const App = () => {
    return (
        <Provider store={storeConfig.store}>
            <PersistGate persistor={storeConfig.persistor} loading={null}>
                <RootComponent />
            </PersistGate>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default App;
