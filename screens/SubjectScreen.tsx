import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import useData from "../hooks/useData";
import { Entypo, Feather } from "@expo/vector-icons";
import { getColor, getSubjectById } from "../functions";
import { SubjectScreenProps as Props } from "../types";

// TODO: add pills
const SubjectScreen = ({ route, navigation }: Props) => {
  const { id } = route.params;
  const { user } = useAuth();
  const { subjects } = useData();
  const { isDark, theme } = useTheme();
  const { name, color } = getSubjectById(subjects, id);
  const subjectColor = getColor(color);

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

          {/* TODO: add pill adding functionality */}
          {/* Add Pill */}
          <TouchableOpacity>
            <Feather name="plus" size={30} color={theme.secondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* TODO: add all pills here */}
    </SafeAreaView>
  );
};

export default SubjectScreen;
