import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import LoginScrren from "../components/LoginScreen";
import * as SecureStore from "expo-secure-store";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function RootLayout() {

  useFonts({
    "noto-black":require('.././assets/fonts/noto/NotoSans-Black.ttf')
  })
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey="pk_test_Y29uY2lzZS13ZXJld29sZi00My5jbGVyay5hY2NvdW50cy5kZXYk">
      
      <SignedIn>
        <Stack screenOptions={{headerShown:false}}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SignedIn>
      <SignedOut>
        <LoginScrren />
      </SignedOut>
    </ClerkProvider>
  );
}
