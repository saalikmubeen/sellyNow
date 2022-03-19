import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Platform } from "react-native";

export default function SafeArea({ children }) {
    return <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>;
}



const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
});
