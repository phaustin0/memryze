import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Question from "../components/Question";
import useData from "../hooks/useData";
import useTheme from "../hooks/useTheme";
import { Feather } from "@expo/vector-icons";
import { getColor, getSubjectById } from "../functions";
import { CreatePillScreenProps as Props } from "../types";

const CreatePillScreen = ({ route, navigation }: Props) => {
  const { isDark, theme } = useTheme();
  const { subjects, addPill, tmpQuestions } = useData();

  const [pillName, setPillName] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);
  const incompleteForm = pillName === "" || tmpQuestions.length < 3;

  const { subjectId } = route.params;
  const { color } = getSubjectById(subjects, subjectId);
  const subjectColor = getColor(color);

  const addNewPill = async () => {
    setButtonPressed(true);
    await addPill(pillName, subjectId, tmpQuestions);
    navigation.navigate("SubjectScreen", { id: subjectId });
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.background,
        flex: 1,
        paddingHorizontal: 20,
      }}
    >
      {/* Header */}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            color: subjectColor,
            fontFamily: "bold",
            fontSize: 38,
          }}
        >
          Create Pill
        </Text>
      </View>

      {/* Main section */}
      <ScrollView>
        {/* Pill name input */}
        <View style={{ width: "100%", alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "thin",
              fontSize: 30,
              textAlign: "center",
              color: theme.secondary,
              marginTop: 10,
            }}
          >
            pill name
          </Text>
          <TextInput
            value={pillName}
            onChangeText={setPillName}
            placeholder="enter pill name here"
            placeholderTextColor={`${theme.secondary}88`}
            multiline={true}
            style={{
              textAlign: "center",
              fontFamily: "thin",
              fontSize: 33,
              color: subjectColor,
              maxWidth: "80%",
            }}
          />
        </View>

        {/* Questions section */}
        <View>
          <Text
            style={{
              fontFamily: "thin",
              fontSize: 30,
              textAlign: "center",
              color: theme.secondary,
              marginTop: 40,
            }}
          >
            questions
          </Text>
          <View style={{ marginBottom: 10 }}>
            {tmpQuestions.map(question => (
              <Question
                key={question.id}
                question={question}
                navigation={navigation}
                color={color}
              />
            ))}
          </View>

          {/* Add question button */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("CreateQuestionModal", {
                subjectId: subjectId,
              });
            }}
            style={{
              backgroundColor: `${getColor("green")}55`,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: 20,
              paddingVertical: 5,
              flexDirection: "row",
              marginBottom: 150,
            }}
          >
            <Feather
              name="plus"
              size={25}
              color={isDark ? getColor("green") : getColor("darkgreen")}
            />
            <Text
              style={{
                color: isDark ? getColor("green") : getColor("darkgreen"),
                fontFamily: "thin",
                fontSize: 30,
                marginLeft: 10,
                transform: [{ translateY: 2 }],
              }}
            >
              Add Question
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add pill button */}
      <View style={{ margin: 20 }}>
        <TouchableOpacity
          disabled={incompleteForm || buttonPressed}
          onPress={addNewPill}
          style={{
            backgroundColor: incompleteForm ? theme.secondary : theme.primary,
            alignItems: "center",
            paddingVertical: 10,
            borderRadius: 15,
          }}
        >
          <Text
            style={{
              color: isDark ? theme.text : theme.background,
              fontFamily: "bold",
              fontSize: 25,
              transform: [{ translateY: 2 }],
            }}
          >
            add pill
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreatePillScreen;
