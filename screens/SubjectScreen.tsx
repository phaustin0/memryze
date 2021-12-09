import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import Pill from "../components/Pill";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import useData from "../hooks/useData";
import { useIsFocused } from "@react-navigation/core";
import { Entypo, Feather } from "@expo/vector-icons";
import { getColor, getSubjectById, getPillsBySubjectId } from "../functions";
import { SubjectScreenProps as Props } from "../types";

const SubjectScreen = ({ route, navigation }: Props) => {
  const { id } = route.params;
  const { user } = useAuth();
  const { subjects, pills, resetTemporaryQuestions } = useData();
  const { isDark, theme } = useTheme();
  const isFocused = useIsFocused();
  const { name, type, color } = getSubjectById(subjects, id);
  const subjectPills = getPillsBySubjectId(pills, id);
  const subjectColor = getColor(color);

  useEffect(() => {
    if (!isFocused) return;
    resetTemporaryQuestions();
  }, [isFocused]);

  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Subject name + go back button */}
        <TouchableOpacity
          // @ts-ignore
          onPress={() => navigation.navigate("SubjectsScreen")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 10,
            flex: 1,
          }}
        >
          <Entypo
            name="chevron-left"
            size={35}
            color={subjectColor}
            style={{ transform: [{ translateY: -3 }] }}
          />
          <Text
            numberOfLines={1}
            style={{
              fontFamily: "bold",
              fontSize: 42,
              color: subjectColor,
              flex: 1,
              paddingRight: 2,
            }}
          >
            {name}
          </Text>
        </TouchableOpacity>

        {/* Icons */}
        <View style={{ flexDirection: "row", marginRight: 15 }}>
          {/* Edit subject */}
          <TouchableOpacity
            style={{ marginRight: 20, transform: [{ translateY: 3 }] }}
            onPress={() =>
              navigation.navigate("EditSubjectModal", {
                id: id,
                name: name,
                type: type,
                color: color,
              })
            }
          >
            <Feather name="edit" size={25} color={theme.secondary} />
          </TouchableOpacity>

          {/* TODO: add filter functionality */}
          {/* Filter */}
          <TouchableOpacity
            style={{ marginRight: 15, transform: [{ translateY: 3 }] }}
          >
            <Feather name="filter" size={25} color={theme.secondary} />
          </TouchableOpacity>

          {/* Add Pill */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CreatePillScreen", { subjectId: id })
            }
          >
            <Feather name="plus" size={30} color={theme.secondary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ paddingHorizontal: 20 }}>
        {subjectPills.length > 0 ? (
          subjectPills.map(pill => (
            <Pill key={pill.id} navigation={navigation} id={pill.id} />
          ))
        ) : (
          <Text style={{ color: theme.text }}>no pills</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubjectScreen;
