import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getColor, getPillText } from "../functions";
import useTheme from "../hooks/useTheme";
import SubjectLogo from "./SubjectLogo";
import SmallPill from "./SmallPill";
import { SubjectsScreenProps } from "../types";

type Props = {
  navigation: SubjectsScreenProps["navigation"];
  id: string;
  name: string;
  color: string;
  pills: number;
  type: string;
};

const Subject = ({ navigation, id, name, color, pills, type }: Props) => {
  const { isDark, theme } = useTheme();
  const subjectColor = getColor(color);

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 120,
        borderRadius: 10,
        paddingHorizontal: 17,
        marginBottom: 15,
        backgroundColor: subjectColor,
      }}
      // @ts-ignore
      onPress={() => navigation.navigate("SubjectScreen", { id: id })}
    >
      {/* Title */}
      <Text
        numberOfLines={1}
        style={{
          fontFamily: "bold",
          fontSize: 40,
          color: isDark ? theme.text : theme.background,
          paddingRight: 60,
        }}
      >
        {name}
      </Text>

      {/* Small pill */}
      <View style={{ marginTop: -13, marginRight: "auto" }}>
        <SmallPill text={getPillText(pills)} />
      </View>

      {/* Subject logo */}
      <View style={{ position: "absolute", right: 30, bottom: 15 }}>
        <SubjectLogo type={type} color={color} />
      </View>
    </TouchableOpacity>
  );
};

export default Subject;
