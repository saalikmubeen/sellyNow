import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import AddToCartAnimation from '../animations/AddToCartAnimation';
import ProductItem from '../components/ProductItem';
import colors from '../constants/Colors';
import { addToCart } from "../store/actions/cart";
import { fetchProducts } from '../store/actions/product';



function ProductsOverviewScreen(props) {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products)

    const [refresh, setRefresh] = useState(false)

    const viewDetails = (id, title) => {
        props.navigation.navigate("Product Details", { productId: id, title: title})
    }

    const addToCartHandler = (product) => {
        dispatch(addToCart(product));
    }

    const handleRefresh = async () => {

        setRefresh(true)
        await dispatch(fetchProducts())
        setRefresh(false)
    }


    


    return (
        <FlatList data={products} keyExtractor={(item) => item.id} renderItem={(element) => (
            <ProductItem product={element.item} viewDetails={() => viewDetails(element.item.id, element.item.title)}>
                <Button title="View product" color={colors.primary} onPress={() => viewDetails(element.item.id, element.item.title)} />
                <Button title="Add to cart" color={colors.primary} onPress={() => {
                    addToCartHandler(element.item);
                    props.showAnimation();
                }
                } />
            </ProductItem>
        )} onRefresh={handleRefresh} refreshing={refresh }/>
    )
}

const styles = StyleSheet.create({})


export default AddToCartAnimation(ProductsOverviewScreen);