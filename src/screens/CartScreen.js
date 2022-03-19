import React from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import { MaterialCommunityIcons } from "@expo/vector-icons"; 
import { useDispatch, useSelector } from 'react-redux'
import LottieView from "lottie-react-native";
import Card from '../components/Card';
import CartItem from '../components/CartItem';
import SafeArea from '../components/SafeArea';
import Colors from '../constants/Colors';
import { removeFromCart } from "../store/actions/cart";


export default function CartScreen({navigation}) {
    const dispatch = useDispatch();
    const { items, totalAmount } = useSelector((state) => state.cart);


    if (items.length === 0) {
        return (
            // <SafeArea>
            //     <View style={styles.cartIconContainer}>
            //         <MaterialCommunityIcons
            //             name="cart-off"
            //             size={36}
            //             color={colors.accent}
            //         />
            //         <Text>Your cart is empty!</Text>
            //     </View>
            // </SafeArea>

            <LottieView
                source={require("../../assets/cart.json")}
                autoPlay
                loop
            />
        );
    }
    
    return (
         <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:  {' '}
          <Text style={styles.amount}>
            ${Math.round(totalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Pay Now"
          disabled={items.length === 0}
          onPress={() => {
            navigation.navigate("Checkout Screen")
          }}
        />
      </Card>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={itemData => (
          <CartItem
            item={itemData.item}
            showTrash
            onRemove={() => {
              dispatch(removeFromCart(itemData.item.id));
            }}
          />
        )}
      />
    </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        padding: 10,
    },
    summaryText: {
        // fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    amount: {
        color: Colors.primary,
    },
    cartIconContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    }
});
