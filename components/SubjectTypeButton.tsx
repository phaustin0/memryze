import React from "react";
import { Text, TouchableOpacity } from "react-native";
import useTheme from "../hooks/useTheme";
import { capitalizeSubjectType } from "../functions";

type Props = {
  type: string;
  currentType: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
};

const SubjectTypeButton = ({ type, currentType, setType }: Props) => {
  const { isDark, theme } = useTheme();
  const isSelected = currentType === type;
  const capitalizedType = capitalizeSubjectType(type);

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
        {capitalizedType}
      </Text>
    </TouchableOpacity>
  );
};

export default SubjectTypeButton;
