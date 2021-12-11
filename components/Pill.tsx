import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import SmallPill from "./SmallPill";
import useData from "../hooks/useData";
import useTheme from "../hooks/useTheme";
import {
  getColor,
  getDateText,
  getDateFromJSON,
  getLevelText,
  getPillById,
  getSubjectById,
} from "../functions";
import {
  HomeScreenProps,
  PillsScreenProps,
  SubjectScreenProps,
} from "../types";

type Props = {
  navigation:
    | HomeScreenProps["navigation"]
    | PillsScreenProps["navigation"]
    | SubjectScreenProps["navigation"];
  id: string;
};

const Pill = ({ navigation, id }: Props) => {
  const { isDark, theme } = useTheme();
  const { subjects, pills } = useData();

  const pill = getPillById(pills, id);
  if (pill === null) return <View></View>;
  const { name: pillName, level, dueDate, subjectId } = pill;

  const { name: subjectName, color } = getSubjectById(subjects, subjectId);
  const pillColor = getColor(color);
  const pillDueDate = getDateFromJSON(dueDate);
  const pillDueDateText = getDateText(pillDueDate);

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 100,
        borderRadius: 15,
        paddingHorizontal: 15,
        flexDirection: "row",
        marginBottom: 15,
        backgroundColor: pillColor,
      }}
    >
      {/* Left side */}
      <View style={{ flex: 1 }}>
        {/* Title */}
        <Text
          style={{
            fontFamily: "bold",
            fontSize: 35,
            color: isDark ? theme.text : theme.background,
            maxWidth: "95%",
          }}
        >
          {pillName}
        </Text>

        {/* Small pills */}
        <View
          style={{ marginRight: "auto", flexDirection: "row", marginTop: -10 }}
        >
          <SmallPill text={subjectName} />
          <SmallPill text={getLevelText(level)} />
        </View>
      </View>

      <View style={{ width: 65 }}>
        <Text
          style={{
            fontFamily: "bold",
            fontSize: 30,
            color: isDark ? theme.text : theme.background,
            marginLeft: "auto",
            marginTop: 3,
          }}
        >
          {pillDueDateText}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Pill;
