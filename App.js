import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Platform,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Item, HeaderButtons } from "react-navigation-header-buttons";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from "@react-navigation/drawer";

import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { autoLogin, logOut } from "./src/store/actions/auth";
import {fetchProducts} from "./src/store/actions/product";
import storeConfig from "./src/store/configureStore";
import colors from "./src/constants/Colors";
import ProductsOverviewScreen from "./src/screens/ProductsOverviewScreen";
import ProductDetailScreen from "./src/screens/ProductDetailScreen";
import CustomHeaderBtn from "./src/components/CustomHeaderBtn";
import CartScreen from "./src/screens/CartScreen";
import OrdersScreen from "./src/screens/OrdersScreen";
import AuthScreen from "./src/screens/AuthScreen";
import CheckoutScreen from "./src/screens/CheckoutScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === "android" ? colors.primary : "",
    },
    headerTintColor: Platform.OS === "android" ? "white" : colors.primary,
};

const ProductsStackNavigator = () => {

     const dispatch = useDispatch();
     const [loading, setLoading] = useState(false);
    const {items} = useSelector((state) => state.cart);

     const loadProducts = async () => {
         setLoading(true);
         await dispatch(fetchProducts());
         setLoading(false);
     };

     useEffect(() => {
        loadProducts();
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
        <Stack.Navigator screenOptions={defaultNavigationOptions}>
            <Stack.Screen
                name="All products"
                component={ProductsOverviewScreen}
                options={(props) => {
                    return {
                        headerTitle: "All Products",
                        headerRight: () => {
                            return (
                                <HeaderButtons
                                    HeaderButtonComponent={CustomHeaderBtn}
                                >
                                    <Item
                                        title="Cart"
                                        color={items.length > 0 ? "black": "white"}
                                        iconName={
                                            Platform.OS === "android"
                                                ? "md-cart"
                                                : "ios-cart"
                                        }
                                        
                                        onPress={() =>
                                            props.navigation.navigate("Cart")
                                        }
                                    />
                                </HeaderButtons>
                            );
                        },
                        headerLeft: () => {
                            return (
                                <HeaderButtons
                                    HeaderButtonComponent={CustomHeaderBtn}
                                >
                                    <Item
                                        title="Menu"
                                        iconName={
                                            Platform.OS === "android"
                                                ? "md-menu"
                                                : "ios-menu"
                                        }
                                        onPress={() =>
                                            props.navigation.toggleDrawer()
                                        }
                                    />
                                </HeaderButtons>
                            );
                        },
                    };
                }}
            />
            <Stack.Screen
                name="Product Details"
                component={ProductDetailScreen}
                options={(props) => {
                    return {
                        headerTitle: props.route.params.title,
                    };
                }}
            />

            <Stack.Screen
                name="Checkout Screen"
                component={CheckoutScreen}
                options={(props) => {
                    return {
                        headerTitle: "Make Payment",
                    };
                }}
            />

            <Stack.Screen name="Cart" component={CartScreen} />
        </Stack.Navigator>
    );
};

// const OrderStackNavigator = () => {
//     return (
//         <Stack.Navigator screenOptions={defaultNavigationOptions} initialRouteName="Orders Screen">
//             <Stack.Screen
//                 name="Orders Screen"
//                 component={OrdersScreen}
//                 options={(props) => {
//                     return {
//                         headerTitle: "Your Orders",
//                         headerLeft: () => {
//                             return (
//                                 <HeaderButtons
//                                     HeaderButtonComponent={CustomHeaderBtn}
//                                 >
//                                     <Item
//                                         title="Menu"
//                                         iconName={
//                                             Platform.OS === "android"
//                                                 ? "md-menu"
//                                                 : "ios-menu"
//                                         }
//                                         onPress={() =>
//                                             props.navigation.toggleDrawer()
//                                         }
//                                     />
//                                 </HeaderButtons>
//                             );
//                         },
//                     };
//                 }}
//             />
//         </Stack.Navigator>
//     );
// };


const AuthStackNavigator = () => {
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

const DrawerNavigator = () => {
    const dispatch = useDispatch();

    return (
        <Drawer.Navigator
            initialRouteName="Products"
            screenOptions={{ activeTintColor: colors.primary, header: () => false }}
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
