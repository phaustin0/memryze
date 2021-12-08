import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import SubjectTypeButton from "../../components/SubjectTypeButton";
import ColorButton from "../../components/ColorButton";
import useAuth from "../../hooks/useAuth";
import useData from "../../hooks/useData";
import useTheme from "../../hooks/useTheme";
import { CreateSubjectModalProps as Props } from "../../types";

const CreateSubjectModal = ({ route, navigation }: Props) => {
  const [subjectName, setSubjectName] = useState("");
  const [subjectType, setSubjectType] = useState("");
  const [subjectColor, setSubjectColor] = useState("");
  const { user } = useAuth();
  const { isDark, theme } = useTheme();
  const { addSubject } = useData();

  const incompleteForm =
    subjectName === "" || subjectType === "" || subjectColor === "";

  const addNewSubject = async () => {
    await addSubject(subjectName, subjectType, subjectColor);
    // @ts-ignore
    navigation.navigate("SubjectsScreen");
  };

  return (
    <View
      style={{
        backgroundColor: theme.background,
        flex: 1,
        alignItems: "center",
      }}
    >
      {/* Title */}
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text
          style={{
            fontFamily: "bold",
            fontSize: 50,
            textAlign: "center",
            color: theme.text,
          }}
        >
          add
        </Text>
        <Text
          style={{
            fontFamily: "bold",
            fontSize: 50,
            textAlign: "center",
            color: theme.primary,
          }}
        >
          {" "}
          subject
        </Text>
      </View>

      {/* Subject name */}
      <View style={{ marginTop: 20 }}>
        {/* Heading */}
        <Text
          style={{
            fontFamily: "thin",
            fontSize: 30,
            textAlign: "center",
            color: theme.secondary,
          }}
        >
          subject name
        </Text>

        {/* Input */}
        <TextInput
          value={subjectName}
          onChangeText={setSubjectName}
          placeholder="enter name here"
          placeholderTextColor={`${theme.secondary}88`}
          style={{
            fontFamily: "thin",
            fontSize: 35,
            textAlign: "center",
            color: theme.primary,
          }}
        />
      </View>

      {/* Subject type */}
      <View style={{ marginTop: 30, width: "100%" }}>
        {/* Heading */}
        <Text
          style={{
            fontFamily: "thin",
            fontSize: 30,
            textAlign: "center",
            color: theme.secondary,
          }}
        >
          subject type
        </Text>

        {/* Buttons */}
        <View>
          {/* 1st row */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginBottom: 10,
            }}
          >
            <SubjectTypeButton
              type="art"
              currentType={subjectType}
              setType={setSubjectType}
            />
            <SubjectTypeButton
              type="music"
              currentType={subjectType}
              setType={setSubjectType}
            />
            <SubjectTypeButton
              type="science"
              currentType={subjectType}
              setType={setSubjectType}
            />
          </View>

          {/* 2nd row */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginBottom: 10,
            }}
          >
            <SubjectTypeButton
              type="math"
              currentType={subjectType}
              setType={setSubjectType}
            />
            <SubjectTypeButton
              type="language"
              currentType={subjectType}
              setType={setSubjectType}
            />
            <SubjectTypeButton
              type="humanities"
              currentType={subjectType}
              setType={setSubjectType}
            />
          </View>

          {/* 3rd row */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginBottom: 10,
            }}
          >
            <SubjectTypeButton
              type="religion"
              currentType={subjectType}
              setType={setSubjectType}
            />
            <SubjectTypeButton
              type="it"
              currentType={subjectType}
              setType={setSubjectType}
            />
            <SubjectTypeButton
              type="finance"
              currentType={subjectType}
              setType={setSubjectType}
            />
          </View>
        </View>
      </View>

      {/* Subject Color */}
      <View style={{ marginTop: 50, width: "90%" }}>
        {/* Heading */}
        <Text
          style={{
            fontFamily: "thin",
            fontSize: 30,
            textAlign: "center",
            color: theme.secondary,
          }}
        >
          subject color
        </Text>

        {/* Color buttons */}
        <View>
          {/* 1st row */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 8,
            }}
          >
            <ColorButton
              color="purple"
              currentColor={subjectColor}
              setColor={setSubjectColor}
            />
            <ColorButton
              color="red"
              currentColor={subjectColor}
              setColor={setSubjectColor}
            />
            <ColorButton
              color="blue"
              currentColor={subjectColor}
              setColor={setSubjectColor}
            />
            <ColorButton
              color="green"
              currentColor={subjectColor}
              setColor={setSubjectColor}
            />
            <ColorButton
              color="yellow"
              currentColor={subjectColor}
              setColor={setSubjectColor}
            />
            <ColorButton
              color="orange"
              currentColor={subjectColor}
              setColor={setSubjectColor}
            />
            <ColorButton
              color="pink"
              currentColor={subjectColor}
              setColor={setSubjectColor}
            />
          </View>

          {/* 2nd row */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <ColorButton
              color="darkpurple"
              currentColor={subjectColor}
              setColor={setSubjectColor}
            />
            <ColorButton
              color="darkred"
              currentColor={subjectColor}
              setColor={setSubjectColor}
            />
            <ColorButton
              color="darkblue"
              currentColor={subjectColor}
              setColor={setSubjectColor}
            />
            <ColorButton
              color="darkgreen"
              currentColor={subjectColor}
              setColor={setSubjectColor}
            />
            <ColorButton
              color="darkyellow"
              currentColor={subjectColor}
              setColor={setSubjectColor}
            />
            <ColorButton
              color="darkorange"
              currentColor={subjectColor}
              setColor={setSubjectColor}
            />
            <ColorButton
              color="darkpink"
              currentColor={subjectColor}
              setColor={setSubjectColor}
            />
          </View>
        </View>
      </View>

      {/* Add subject button */}
      <TouchableOpacity
        onPress={addNewSubject}
        disabled={incompleteForm}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 50,
          borderRadius: 15,
          marginTop: 65,
          backgroundColor: incompleteForm ? theme.secondary : theme.primary,
        }}
      >
        <Text
          style={{
            fontFamily: "thin",
            fontSize: 27,
            textAlign: "center",
            color: isDark ? theme.text : theme.background,
            transform: [{ translateY: 2 }],
          }}
        >
          add subject
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateSubjectModal;
