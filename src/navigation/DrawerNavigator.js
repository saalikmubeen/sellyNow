import {useDispatch} from "react-redux";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/Colors";
import { ProductsStackNavigator } from "./ProductsScreenNavigator";
import OrdersScreen from "../screens/OrdersScreen";
import { logOut } from "../store/actions/auth";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
    const dispatch = useDispatch();

    return (
        <Drawer.Navigator
            initialRouteName="Products"
            screenOptions={{
                activeTintColor: colors.primary,
                header: () => false,
            }}
            drawerContent={(props) => {
                return (
                    <DrawerContentScrollView {...props}>
                        <DrawerItemList {...props} />
                        <DrawerItem
                            label="Log Out"
                            onPress={() => dispatch(logOut())}
                            icon={(focused, size, color) => {
                                return (
                                    <Ionicons
                                        name={
                                            Platform.OS === "android"
                                                ? "md-power"
                                                : "ios-power"
                                        }
                                        size={23}
                                        color={colors.primary}
                                    />
                                );
                            }}
                        />
                    </DrawerContentScrollView>
                );
            }}
        >
            <Drawer.Screen
                name="Products"
                component={ProductsStackNavigator}
                options={{
                    drawerIcon: (drawerConfig) => {
                        return (
                            <Ionicons
                                name={
                                    Platform.OS === "android"
                                        ? "md-list"
                                        : "ios-list"
                                }
                                size={23}
                                color={drawerConfig.color}
                            />
                        );
                    },
                }}
            />

            <Drawer.Screen
                name="Orders"
                component={OrdersScreen}
                options={{
                    drawerIcon: (drawerConfig) => {
                        return (
                            <Ionicons
                                name={
                                    Platform.OS === "android"
                                        ? "md-cart"
                                        : "ios-cart"
                                }
                                size={23}
                                color={drawerConfig.color}
                            />
                        );
                    },
                }}
            />
        </Drawer.Navigator>
    );
};