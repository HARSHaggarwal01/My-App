import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from "../constants/Colors";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  
    const onPress = React.useCallback(async () => {
      try {
        const { createdSessionId, signIn, signUp, setActive } =
          await startOAuthFlow();
  
        if (createdSessionId) {
          setActive({ session: createdSessionId });
        } else {
          // Use signIn or signUp for next steps such as MFA
        }
      } catch (err) {
        console.error("OAuth error", err);
      }
    }, []);

    return (
        <View style={styles.container}>
        <Image 
            source={require('../assets/images/login.png')} 
            style={styles.image}
        />
        <View style={styles.subContainer}>
            <Text style={styles.text}>
            Your Ultimate 
            <Text style={styles.highlight}> Community Business Directory </Text> 
            App
            </Text>
            <Text style={styles.description}>
            Find Your Favorite Business near you and post your Business to your Community.
            </Text>
            <TouchableOpacity style={styles.btn} onPress={onPress}> 
                <Text style={styles.btnText}>Let's Get Started</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 220,
    height: 450,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#000",
  },
  subContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: -20, 
    alignItems: 'center', 
    width: '100%',
  },
  text: {
    fontSize: 20,
    fontFamily: "noto-black",
    textAlign: "center",
  },
  highlight: {
    color: Colors.PRIMARY,
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    marginVertical: 15,
    color: Colors.GRAY,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 99,
    marginTop: 20,
    width: '100%', 
    alignItems: 'center',
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
  }
});

export default LoginScreen;
