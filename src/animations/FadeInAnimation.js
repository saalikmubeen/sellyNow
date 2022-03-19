import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";

export const FadeAnimation = ({ style, ...props }) => {
    const slideIn = useRef(new Animated.Value(-300)).current;
    const fadeIn = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeIn, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),

            Animated.timing(slideIn, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),

        ]).start();
    }, [fadeIn, slideIn]);

    return (
        <Animated.View
            style={{
                ...style,
                opacity: fadeIn, // Bind opacity to animated value
                transform: [{
                    translateX: slideIn,
                }]
            }}
        >
            {props.children}
        </Animated.View>
    );
};
