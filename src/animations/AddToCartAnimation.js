import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";

const AddToCartAnimation = (Component) => {

    const Wrapper = (props) => {
        const [addedToCart, setAddedToCart] = useState(false);

        const showAnimation = () => {
            setAddedToCart(true);
        };

        useEffect(() => {
            if (!addedToCart) {
                return;
            }

            const timeOut = setTimeout(() => {
                setAddedToCart(false);
            }, 2000);

            return () => clearTimeout(timeOut);
        }, [addedToCart]);

        if (addedToCart) {
            return (
                <LottieView
                    source={require("../../assets/addToCart.json")}
                    autoPlay
                    loop
                />
            );
        }

        return <Component showAnimation={showAnimation} {...props} />;
    };

    return Wrapper;
};

export default AddToCartAnimation;
