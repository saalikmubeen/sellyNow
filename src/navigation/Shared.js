import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../constants/Colors";

export const Stack = createNativeStackNavigator();

export const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? colors.primary : "",
    },
    headerTintColor: Platform.OS === "android" ? "white" : colors.primary,
};
