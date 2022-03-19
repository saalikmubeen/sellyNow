import React, {  useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import { Text, ScrollView, TextInput, View, Button, Image, StyleSheet } from "react-native";
import LottieView from "lottie-react-native"
import CreditCard from "../components/CreditCard";
import colors from "../constants/Colors";
import { addOrder } from '../store/actions/order';
import { clearCart } from "../store/actions/cart";


function CheckoutScreen({ navigation }) {
    const { cart } = useSelector((state) => state)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");

    const onPay = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false)
            dispatch(addOrder(cart.items, cart.totalAmount));
            dispatch(clearCart());

            navigation.navigate("Orders", {
                showPopUp: true,
            });

        }, 2000)
    };

    if (loading) {
        return (
            <LottieView
            source={require("../../assets/orderPlaced.json")}
            autoPlay
            loop
        />
        )
    }


    return (
        <>
            <ScrollView>
                <View style={styles.cartDetails}>
                    <Text style={{fontSize: 25}}>Your Order</Text>
                    <View style={styles.orders}>
                        {cart.items.map((item, idx) => {
                            return (
                                <View key={item.id} style={styles.order}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Image
                                        source={{ uri: item.imageUrl }}
                                        style={styles.image}
                                    />
                                    <View style={styles.details}>
                                        <Text style={{marginBottom: 5}}>Price: ${item.price}</Text>
                                        <Text>Quantity: {item.quantity}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                    <Text style={{fontSize: 20}}>Total: ${cart.totalAmount}</Text>
                </View>

                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />

                {name.length > 0 && (
                    <View>
                        <CreditCard
                            name={name}
                            onError={() => {
                                console.log(
                                    "Error occured while processing your payment!"
                                );
                            }}
                        />
                    </View>
                )}

                <View style={styles.buttonContainer}>
                    <Button
                        disabled={loading}
                        onPress={onPay}
                        title="PAY"
                        color={colors.accent}
                    />
                    <Button
                        disabled={loading}
                        title="Go Back"
                        color={colors.accent}
                        onPress={() => navigation.goBack()}
                    />
                </View>
            </ScrollView>
        </>
    );
}


const styles = StyleSheet.create({
    processing: {
        position: "absolute",
        top: "50%",
        left: "35%",
        zIndex: 999,
    },
    cartDetails: {
        padding: 15,
        width: "100%",
    },
    payButton: {
        color: colors.primary,
        width: "80%",
        alignSelf: "center",
        padding: 10,
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: "#726b6b",
        borderBottomWidth: 1,
        width: "80%",
        marginHorizontal: 30,
        marginBottom: 30,
    },

    orders: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },

    order: {
        width: "48%",
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { height: 2, width: 0 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",
        marginVertical: 20,
        overflow: "hidden",
        paddingVertical: 14
    },

    image: {
        width: "100%",
        height: 80,
    },

    title: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 13
    },

    details: {
        padding: 12,
        paddingBottom: 0,
        fontSize: 15
    }

});

export default CheckoutScreen;