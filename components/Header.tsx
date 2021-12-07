import React from "react";
import { View, Text } from "react-native";
import useTheme from "../hooks/useTheme";

type Props = {
  text: string;
  blueText: string;
  children?: React.ReactNode;
};

const Header = ({ text, blueText, children }: Props) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 20,
      }}
    >
      {/* Left side */}
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontFamily: "bold", fontSize: 50, color: theme.text }}>
          {text}
        </Text>
        <Text
          style={{ fontFamily: "bold", fontSize: 50, color: theme.primary }}
        >
          {blueText}
        </Text>
      </View>

      {/* Right side */}
      {children}
    </View>
  );
};

export default Header;
