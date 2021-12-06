import React, { useContext, createContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native-appearance";
import { lightTheme, darkTheme } from "../lib/colorTheme";
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
  const [isDark, setIsDark] = useState(colorScheme === "dark");

  useEffect(() => {
    setIsDark(colorScheme === "dark");
  }, [colorScheme]);

  const defaultTheme: ThemeProps = {
    isDark,
    theme: isDark ? darkTheme : lightTheme,
    setTheme: (theme: string) => setIsDark(theme === "dark"),
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
