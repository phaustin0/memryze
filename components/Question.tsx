import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import useTheme from "../hooks/useTheme";
import { getColor, getDarkerColor, typeToText } from "../functions";
import { CreatePillScreenProps, QuestionType } from "../types";

type Props = {
  question: QuestionType;
  navigation: CreatePillScreenProps["navigation"];
  color: string;
};

const Question = ({ question, navigation, color }: Props) => {
  const { isDark, theme } = useTheme();
  const subjectColor = getColor(color);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: subjectColor,
        marginBottom: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        paddingBottom: 15,
        paddingHorizontal: 15,
        paddingTop: 13,
      }}
    >
      {/* question name */}
      <Text
        style={{
          color: isDark ? theme.text : theme.background,
          fontFamily: "thin",
          fontSize: 30,
          lineHeight: 33,
        }}
      >
        {question.name}
      </Text>

      <View
        style={{
          borderRadius: 100,
          backgroundColor: getDarkerColor(color),
          paddingVertical: 3,
          paddingHorizontal: 13,
          marginRight: "auto",
          transform: [{ translateY: -3 }],
        }}
      >
        <Text
          style={{
            color: isDark ? theme.text : theme.background,
            fontFamily: "thin",
            fontSize: 20,
            transform: [{ translateY: 1 }],
          }}
        >
          {typeToText(question.type)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Question;
