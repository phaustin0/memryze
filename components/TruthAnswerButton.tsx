import React from "react";
import { TouchableOpacity, Text } from "react-native";
import useTheme from "../hooks/useTheme";

type Props = {
  type: boolean;
  currentType: boolean;
  setType: React.Dispatch<React.SetStateAction<boolean>>;
};

const TruthAnswerButton = ({ type, currentType, setType }: Props) => {
  const isSelected = currentType === type;
  const { isDark, theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => setType(type)}
      style={{
        borderColor: theme.primary,
        borderWidth: 2,
        backgroundColor: isSelected ? theme.primary : theme.background,
        borderRadius: 10,
        width: 110,
      }}
    >
      <Text
        style={{
          fontFamily: "thin",
          fontSize: 25,
          textAlign: "center",
          transform: [{ translateY: 2 }],
          color: isSelected
            ? isDark
              ? theme.text
              : theme.background
            : theme.secondary,
        }}
      >
        {type ? "True" : "False"}
      </Text>
    </TouchableOpacity>
  );
};

export default TruthAnswerButton;
