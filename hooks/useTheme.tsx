import React, { useContext, createContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native-appearance";
import { setStatusBarStyle } from "expo-status-bar";
import { lightTheme, darkTheme } from "../lib/colorTheme";
import useAuth from "./useAuth";
import { ThemeProps } from "../types";

const ThemeContext = createContext<ThemeProps>({
  isDark: false,
  theme: lightTheme,
  setTheme: () => {},
});
type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const colorScheme = useColorScheme();
  const { user } = useAuth();
  const [isDark, setIsDark] = useState(colorScheme === "dark");

  useEffect(() => {
    setIsDark(colorScheme === "dark");
  }, [colorScheme, user]);

  const defaultTheme: ThemeProps = {
    isDark,
    theme: isDark ? darkTheme : lightTheme,
    setTheme: (theme: string) => {
      setIsDark(theme === "dark");
      setStatusBarStyle(theme === "dark" ? "light" : "dark");
    },
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export default function useTheme() {
  return useContext(ThemeContext);
}
