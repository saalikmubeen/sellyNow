import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'

import colors from '../constants/Colors';
import {FadeAnimation} from "../animations/FadeInAnimation"


export default function ProductItem({ product, viewDetails, children}) {
    const { title, price, imageUrl } = product;

    let TouchableComponent = TouchableOpacity;

    if (Platform.OS === "android" && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback
    }

    return (
        <FadeAnimation>
            <TouchableComponent onPress={viewDetails} useForeground>
                <View style={styles.product}>
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                    <View style={styles.details}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.price}>${price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.buttons}>{children}</View>
                </View>
            </TouchableComponent>
        </FadeAnimation>
    );
}

const styles = StyleSheet.create({
    product: {
        shadowColor: "black",
        shadowOpacity: 0.26,
        shadowOffset: { height: 2, width: 0 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",
        height: 300,
        margin: 20,
        overflow: "hidden"
    },

    image: {
        width: "100%",
        height: "60%",
    },

    title: {
        fontSize: 18,
        marginVertical: 4
    },

    price: {
        fontSize: 14,
        color: "#888"
    },

    buttons: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        height: "25%",
        paddingHorizontal: 20
    },

    details: {
        "alignItems": "center",
        height: "15%",
        padding: 10
    }
})
