import React from "react";
import { Text, SafeAreaView } from "react-native";
import Navigator from "./Navigator";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { AuthProvider } from "./hooks/useAuth";
import { DataProvider } from "./hooks/useData";
import { ThemeProvider } from "./hooks/useTheme";
import { AppearanceProvider } from "react-native-appearance";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  let [fontsLoaded] = useFonts({
    bold: require("./assets/fonts/Dongle-Bold.ttf"),
    thin: require("./assets/fonts/Dongle-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaView>
        <Text>loading</Text>
      </SafeAreaView>
    );
  }
  return (
    <AppearanceProvider>
      <ThemeProvider>
        <NavigationContainer>
          <AuthProvider>
            <DataProvider>
              <Navigator />
              <StatusBar style="auto" />
            </DataProvider>
          </AuthProvider>
        </NavigationContainer>
      </ThemeProvider>
    </AppearanceProvider>
  );
};

export default App;
