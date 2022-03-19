import React from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import LottieView from "lottie-react-native";
import Card from '../components/Card';
import CartItem from '../components/CartItem';
import Colors from '../constants/Colors';
import { removeFromCart } from "../store/actions/cart";


export default function CartScreen({navigation}) {
    const dispatch = useDispatch();
    const { items, totalAmount } = useSelector((state) => state.cart);


    if (items.length === 0) {
        return (

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
    }
});
