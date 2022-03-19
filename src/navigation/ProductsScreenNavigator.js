import {useState, useEffect} from "react";
import { ActivityIndicator, View } from "react-native";
import {useDispatch, useSelector} from "react-redux";
import { Item, HeaderButtons } from "react-navigation-header-buttons";

import ProductsOverviewScreen from "../screens/ProductsOverviewScreen";
import { fetchProducts } from "../store/actions/product";
import { defaultNavigationOptions, Stack } from "./Shared";
import CustomHeaderBtn from "../components/CustomHeaderBtn";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import CartScreen from "../screens/CartScreen";
import colors from "../constants/Colors";

export const ProductsStackNavigator = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { items } = useSelector((state) => state.cart);

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
                                        color={
                                            items.length > 0 ? "black" : "white"
                                        }
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
