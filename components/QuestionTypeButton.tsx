import React from "react";
import { TouchableOpacity, Text } from "react-native";
import useTheme from "../hooks/useTheme";
import { typeToText } from "../functions";

type Props = {
  type: string;
  currentType: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
};

const QuestionTypeButton = ({ type, currentType, setType }: Props) => {
  const isSelected = type === currentType;
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
        {typeToText(type)}
      </Text>
    </TouchableOpacity>
  );
};

export default QuestionTypeButton;
