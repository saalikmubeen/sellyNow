
import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";

export const SlideDownAnimation = ({ style, ...props }) => {
    const slideDown = useRef(new Animated.Value(-500)).current;
    const fadeIn = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeIn, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true,
            }),

            Animated.timing(slideDown, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeIn, slideDown]);

    return (
        <Animated.View
            style={{
                ...style,
                opacity: fadeIn, // Bind opacity to animated value
                transform: [
                    {
                        translateY: slideDown,
                    },
                ],
            }}
        >
            {props.children}
        </Animated.View>
    );
};
