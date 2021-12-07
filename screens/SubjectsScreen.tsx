import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Header from "../components/Header";
import Subject from "../components/Subject";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import useData from "../hooks/useData";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { SubjectsScreenProps as Props, SubjectType } from "../types";

const SubjectsScreen = ({ route, navigation }: Props) => {
  const { user } = useAuth();
  const { isDark, theme } = useTheme();
  const { subjects } = useData();

  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
      {/* Header */}
      <Header text="all" blueText=" subjects">
        {/* Plus button */}
        <TouchableOpacity
          // @ts-ignore
          onPress={() => navigation.navigate("CreateSubjectModal")}
        >
          <Feather name="plus" size={30} color={theme.secondary} />
        </TouchableOpacity>
      </Header>

      {/* Main section */}
      <ScrollView style={{ paddingHorizontal: 20 }}>
        {subjects.length > 0 ? (
          // subjects list
          subjects.map(subject => (
            <Subject
              key={subject.id}
              navigation={navigation}
              id={subject.id}
              name={subject.name}
              color={subject.color}
              pills={subject.totalPills}
              type={subject.type}
            />
          ))
        ) : (
          <View
            style={{ marginLeft: "auto", marginRight: "auto", marginTop: 30 }}
          >
            {/* Title */}
            <Text
              style={{
                fontFamily: "thin",
                fontSize: 42,
                textAlign: "center",
                color: theme.secondary,
              }}
            >
              no subjects found
            </Text>

            {/* Create new subject */}
            <View>
              <Text
                style={{
                  fontFamily: "thin",
                  fontSize: 38,
                  textAlign: "center",
                  color: theme.secondary,
                  marginTop: 20,
                }}
              >
                Press the{" "}
                <Text style={{ color: theme.primary }}>
                  '<Feather name="plus" size={26} color={theme.primary} />'
                </Text>{" "}
                icon or
              </Text>
              <TouchableOpacity
                // @ts-ignore
                onPress={() => navigation.navigate("CreateSubjectModal")}
                style={{
                  backgroundColor: theme.primary,
                  paddingVertical: 6,
                  paddingHorizontal: 20,
                  borderRadius: 15,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: isDark ? theme.text : theme.background,
                    fontFamily: "thin",
                    fontSize: 34,
                    transform: [{ translateY: 1.5 }],
                  }}
                >
                  create one here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubjectsScreen;
