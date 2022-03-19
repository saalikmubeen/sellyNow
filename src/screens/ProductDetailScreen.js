import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import AddToCartAnimation from '../animations/AddToCartAnimation';
import {SlideDownAnimation} from "../animations/SlideDown"
import colors from '../constants/Colors';
import { addToCart } from '../store/actions/cart';

function ProductDetailScreen({ route, showAnimation }) {
    const productId =  route.params.productId
    const product = useSelector((state) => state.products).find((product) => product.id === productId);
    const dispatch = useDispatch();

    return (
        <SlideDownAnimation>
            <ScrollView>
                <Image
                    source={{ uri: product.imageUrl }}
                    style={styles.image}
                />
                <View style={styles.btn}>
                    <Button title="Add to Cart" color={colors.primary} onPress={ () => {
                        dispatch(addToCart(product))
                        showAnimation()
                    }}/>
                </View>
                <Text style={styles.price}>${product.price}</Text>
                <Text style={styles.description}>{product.description}</Text>
            </ScrollView>
        </SlideDownAnimation>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300
    },
    
    price: {
        fontSize: 20,
        color: "#888",
        textAlign: "center",
        marginVertical: 20
    },

    description: {
        fontSize: 18,
        textAlign: 'center',
        marginHorizontal: 20
    },

    btn: {
        marginVertical: 10,
        alignItems: 'center'
    }

})


export default AddToCartAnimation(ProductDetailScreen)