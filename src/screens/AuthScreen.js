import React, { useState, useEffect } from 'react';
import { ScrollView, View, KeyboardAvoidingView, StyleSheet, Button, ActivityIndicator, Text, TextInput, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import LottieView from "lottie-react-native";

import Card from "../components/Card";
import Colors from '../constants/Colors';
import { signUp, signIn } from '../store/actions/auth';
import { SlideDownAnimation } from '../animations/SlideDown';


const AuthScreen = props => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showAnimation, setShowAnimation] = useState(true);

    const [logIn, setLogIn] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const handleAuth = async () => {
        setError(null);
        setIsLoading(true);
        try {
            if (logIn) {
                await dispatch(signIn(email, password))
            } else {
                await dispatch(signUp(email, password))
            }
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    }


    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    useEffect(() => {

        if(!showAnimation) {
          return
        }

        const timeOut = setTimeout(() => {
              setShowAnimation(false);
        }, 6000)

        return () => clearTimeout(timeOut)

    }, [showAnimation])


    if (showAnimation) {
        return <LottieView
            source={require("../../assets/shopping.json")}
            autoPlay
            loop
        />;
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={30}
            style={styles.screen}
        >
            <LinearGradient
                colors={["#ffedff", "#ffe3ff"]}
                style={styles.gradient}
            >
                <Card style={styles.authContainer}>
                    <SlideDownAnimation>
                        <ScrollView>
                            <View style={styles.formControl}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    value={email}
                                    onChangeText={(newEmail) =>
                                        setEmail(newEmail)
                                    }
                                />
                            </View>

                            <View style={styles.formControl}>
                                <Text style={styles.label}>Password</Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="default"
                                    secureTextEntry
                                    autoCapitalize="none"
                                    value={password}
                                    onChangeText={(newPassword) =>
                                        setPassword(newPassword)
                                    }
                                />
                            </View>

                            <View style={styles.buttonContainer}>
                                {isLoading ? (
                                    <ActivityIndicator
                                        size="small"
                                        color={Colors.primary}
                                    />
                                ) : (
                                    <Button
                                        title={logIn ? "Log In" : "Sign Up"}
                                        color={Colors.primary}
                                        onPress={handleAuth}
                                    />
                                )}
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button
                                    title={`${
                                        logIn ? "Sign up" : "Log In"
                                    } instead ?`}
                                    color={Colors.accent}
                                    onPress={() =>
                                        setLogIn((prevState) => !prevState)
                                    }
                                />
                            </View>
                        </ScrollView>
                    </SlideDownAnimation>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};



const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
    },
   formControl: {
    width: '100%'
  },
  label: {
    // fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
});

export default AuthScreen;
