import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {useDispatch} from "react-redux";
import CartItem from './CartItem';
import Card from './Card';
import Colors from '../constants/Colors';
import { deleteOrder } from '../store/actions/order';

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false);

  const dispatch = useDispatch();

  return (
      <Card style={styles.orderItem}>
          <View style={styles.summary}>
              <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
              <Text style={styles.date}>{props.date}</Text>
          </View>
          <View style={styles.buttonContainer}>
              <Button
                  color={Colors.primary}
                  title={showDetails ? "Hide Details" : "Show Details"}
                  onPress={() => {
                      setShowDetails((prevState) => !prevState);
                  }}
              />

              <Button
                  color={Colors.primary}
                  title= "Delete Order"
                  onPress={() => {
                      dispatch(deleteOrder(props.orderId))
                  }}
              />
          </View>
          {showDetails && (
              <View style={styles.detailItems}>
                  {props.items.map((cartItem) => (
                      <CartItem key={cartItem.id} item={cartItem} />
                  ))}
              </View>
          )}
      </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center'
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15
  },
  totalAmount: {
    // fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  date: {
    fontSize: 16,
    // fontFamily: 'open-sans',
    color: '#888'
  },
  detailItems: {
    width: '100%'
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});

export default OrderItem;
