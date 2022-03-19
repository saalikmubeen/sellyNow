import AuthScreen from "../screens/AuthScreen";
import { defaultNavigationOptions, Stack } from "./Shared";


export const AuthStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={defaultNavigationOptions}>
            <Stack.Screen
                name="Auth"
                component={AuthScreen}
                options={{ headerTitle: "Log In" }}
            />
        </Stack.Navigator>
    );
};
