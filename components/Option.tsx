import React from "react";
import { View, TextInput } from "react-native";
import useTheme from "../hooks/useTheme";
import { getColor } from "../functions";

const Option = ({
  index,
  option,
  setOption,
}: {
  index: number;
  option: string;
  setOption: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const correct = index == 0;
  const { theme } = useTheme();

  return (
    <View
      style={{
        borderColor: correct ? getColor("green") : theme.primary,
        borderWidth: 2,
        borderRadius: 10,
        flex: 1,
        marginRight: index % 2 == 0 ? 7.5 : 0,
        marginLeft: index % 2 == 0 ? 0 : 7.5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput
        value={option}
        onChangeText={setOption}
        placeholder={`Option ${index + 1}`}
        placeholderTextColor={`${theme.secondary}88`}
        multiline={true}
        style={{
          textAlign: "center",
          fontFamily: "thin",
          fontSize: 26,
          color: correct ? getColor("green") : theme.primary,
          minHeight: 50,
          transform: [{ translateY: 3 }],
          paddingHorizontal: 5,
          width: "100%",
        }}
      />
    </View>
  );
};

export default Option;
