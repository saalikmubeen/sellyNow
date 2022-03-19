import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from '@expo/vector-icons';

export default function CustomHeaderBtn(props) {
    return (
        <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} />
    )
}

const styles = StyleSheet.create({})
