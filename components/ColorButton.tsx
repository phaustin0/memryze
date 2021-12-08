import React from "react";
import { TouchableOpacity } from "react-native";
import useTheme from "../hooks/useTheme";
import { getColor } from "../functions";

type Props = {
  color: string;
  currentColor: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
};

const ColorButton = ({ color, currentColor, setColor }: Props) => {
  const { theme } = useTheme();
  const fillColor = getColor(color);
  const isSelected = color === currentColor;

  return (
    <TouchableOpacity
      onPress={() => setColor(color)}
      style={{
        width: 45,
        height: 30,
        borderRadius: 13,
        borderWidth: 3.5,
        borderColor: fillColor,
        backgroundColor: isSelected ? fillColor : theme.background,
      }}
    ></TouchableOpacity>
  );
};

export default ColorButton;
