import React, {useState, useEffect} from 'react'
import { StyleSheet, FlatList, Text, View, Button, SafeAreaView, Platform, StatusBar } from 'react-native'
import { useSelector } from 'react-redux'
import OrderItem from '../components/OrderItem';
import Modal from '../components/Modal';
import colors from '../constants/Colors';

export default function OrdersScreen({route, navigation}) {
    const orders = useSelector((state) => state.orders.orders);
    const [open, setOpen] = useState(false);
    const showPopup = route.params ? route.params.showPopUp : false


    if (orders.length === 0) {
        return <View style={styles.empty}>
                    <Text>You haven't ordered anything!</Text>
                </View>
    }


    useEffect(() => {

        if (!showPopup) {
            return
        } 
        timeOut = setTimeout(() => {
            setOpen(true)
        }, 3000)

        return () => clearTimeout(timeOut);

    }, [showPopup])
    
    return (
        <SafeAreaView style={styles.safeArea}>
            <Text style={styles.title}>Your Orders</Text>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id.toString()}
                renderItem={(itemData) => (
                    <OrderItem
                        orderId={itemData.item.id}
                        amount={itemData.item.totalAmount}
                        date={itemData.item.readableDate}
                        items={itemData.item.orderItems}
                    />
                )}
            />

            <Modal isVisible={open}>
                <Modal.Container>
                    <Modal.Header title="Enjoying Shopping" />
                    <Modal.Body>
                        <Text style={{ fontSize: 18 }}>Shop More!</Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            title="Continue"
                            color={colors.accent}
                            onPress={() => {
                                setOpen(false);
                                navigation.navigate("Cart");
                            }}
                        />

                        <Button
                            title="Cancel"
                            color={colors.accent}
                            onPress={() => {
                                setOpen(false);
                            }}
                        />
                    </Modal.Footer>
                </Modal.Container>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    empty: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    safeArea: {
        flex: 1,
                paddingTop:
                    Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    title: {
        fontSize: 20,
        marginVertical: 13,
        textAlign: "center"
    }
})
