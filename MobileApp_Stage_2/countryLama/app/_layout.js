import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { SplashScreen, stack } from "expo-router";
import { useEffect } from "react";
// import countr

export default function RootLayout() {

  const [fontsLoaded, error] = useFonts({
    "Axiforma-regular": require("../assets/fonts/Kastelov - Axiforma Regular.otf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="country/[name]" options={{ headerShown: false }} />
      <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
