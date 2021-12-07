import React from "react";
import { View, Text } from "react-native";
import useTheme from "../hooks/useTheme";

const SmallPill = ({ text }: { text: string }) => {
  const { isDark, theme } = useTheme();

  return (
    <View
      style={{
        paddingHorizontal: 10,
        height: 20,
        borderWidth: 1.5,
        borderColor: isDark ? theme.text : theme.background,
        borderRadius: 10,
        marginRight: "5",
        marginTop: -13,
      }}
    >
      <Text
        numberOfLines={1}
        style={{
          fontFamily: "bold",
          fontSize: 20,
          color: isDark ? theme.text : theme.background,
          marginTop: -5,
          maxWidth: 200,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default SmallPill;
