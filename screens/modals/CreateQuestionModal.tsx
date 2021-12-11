import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import QuestionTypeButton from "../../components/QuestionTypeButton";
import TruthAnswerButton from "../../components/TruthAnswerButton";
import Option from "../../components/Option";
import useData from "../../hooks/useData";
import useTheme from "../../hooks/useTheme";
import { CreateQuestionModalProps as Props } from "../../types";

type Answer = string | boolean;

const CreateQuestionModal = ({ route, navigation }: Props) => {
  const {
    addTemporaryShortQuestion,
    addTemporaryTruthQuestion,
    addTemporaryMultipleChoiceQuestion,
  } = useData();
  const { isDark, theme } = useTheme();
  const { subjectId } = route.params;

  const [buttonPressed, setButtonPressed] = useState(false);
  const [questionName, setQuestionName] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [answer, setAnswer] = useState<Answer>("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");

  useEffect(() => {
    setAnswer("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
  }, [questionType]);

  const addQuestion = () => {
    setButtonPressed(true);
    if (questionType === "short") {
      addTemporaryShortQuestion(questionName, answer as string);
    } else if (questionType === "truth") {
      addTemporaryTruthQuestion(questionName, answer as boolean);
    } else {
      addTemporaryMultipleChoiceQuestion(
        questionName,
        option1,
        option2,
        option3,
        option4
      );
    }
    navigation.navigate("CreatePillScreen", { subjectId: subjectId });
  };

  const emptyAnswer = () => {
    if (typeof answer === "string") return answer === "";
    return false;
  };
  const emptyOption =
    option1 === "" || option2 === "" || option3 === "" || option4 === "";
  const incompleteForm =
    questionName === "" ||
    questionType === "" ||
    (emptyAnswer() && emptyOption);

  return (
    <View
      style={{
        backgroundColor: theme.background,
        flex: 1,
        alignItems: "center",
      }}
    >
      {/* Header */}
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
          question
        </Text>
      </View>

      <ScrollView style={{ width: "100%" }}>
        <View style={{ alignItems: "center" }}>
          {/* Question Type */}
          <View>
            <Text
              style={{
                fontFamily: "thin",
                fontSize: 30,
                textAlign: "center",
                color: theme.secondary,
              }}
            >
              question type
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-evenly",
              }}
            >
              <QuestionTypeButton
                type="short"
                currentType={questionType}
                setType={setQuestionType}
              />
              <QuestionTypeButton
                type="truth"
                currentType={questionType}
                setType={setQuestionType}
              />
              <QuestionTypeButton
                type="multiple"
                currentType={questionType}
                setType={setQuestionType}
              />
            </View>
          </View>
          {/* Question name */}
          <View>
            <Text
              style={{
                fontFamily: "thin",
                fontSize: 30,
                textAlign: "center",
                color: theme.secondary,
                marginTop: 30,
              }}
            >
              question name
            </Text>
            <TextInput
              value={questionName}
              onChangeText={setQuestionName}
              placeholder="enter question here"
              placeholderTextColor={`${theme.secondary}88`}
              multiline={true}
              style={{
                fontFamily: "thin",
                fontSize: 33,
                textAlign: "center",
                color: theme.primary,
                maxWidth: "80%",
              }}
            />
          </View>
          {/* Answer/Options */}
          {questionType !== "" && (
            <View style={{ width: "100%", alignItems: "center" }}>
              {/* Header */}
              <Text
                style={{
                  fontFamily: "thin",
                  fontSize: 30,
                  textAlign: "center",
                  color: theme.secondary,
                  marginTop: 30,
                  marginBottom: 10,
                }}
              >
                {questionType === "multiple" ? "options" : "answer"}
              </Text>
              {/* Short Answer */}
              {questionType === "short" && (
                <View>
                  <TextInput
                    value={answer as string}
                    onChangeText={
                      setAnswer as React.Dispatch<React.SetStateAction<string>>
                    }
                    placeholder="enter answer here"
                    placeholderTextColor={`${theme.secondary}88`}
                    multiline={true}
                    style={{
                      fontFamily: "thin",
                      fontSize: 33,
                      textAlign: "center",
                      color: theme.primary,
                      maxWidth: "80%",
                    }}
                  />
                </View>
              )}
              {/* Truth Answer */}
              {questionType === "truth" && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    width: "70%",
                  }}
                >
                  <TruthAnswerButton
                    type={true}
                    currentType={answer as boolean}
                    setType={
                      setAnswer as React.Dispatch<React.SetStateAction<boolean>>
                    }
                  />
                  <TruthAnswerButton
                    type={false}
                    currentType={answer as boolean}
                    setType={
                      setAnswer as React.Dispatch<React.SetStateAction<boolean>>
                    }
                  />
                </View>
              )}
              {/* Multiple Choice Answer */}
              {questionType === "multiple" && (
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    paddingHorizontal: 20,
                  }}
                >
                  {/* 1st row */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                      marginBottom: 15,
                    }}
                  >
                    <Option index={0} option={option1} setOption={setOption1} />
                    <Option index={1} option={option2} setOption={setOption2} />
                  </View>
                  {/* 2nd row */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Option index={2} option={option3} setOption={setOption3} />
                    <Option index={3} option={option4} setOption={setOption4} />
                  </View>
                  {/* Correct answer reminder */}
                  <Text
                    style={{
                      color: theme.secondary,
                      fontFamily: "thin",
                      fontSize: 20,
                      marginTop: 7,
                    }}
                  >
                    * green outline is the correct answer
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Add question button */}
      <TouchableOpacity
        disabled={incompleteForm || buttonPressed}
        onPress={addQuestion}
        style={{
          position: "absolute",
          bottom: 50,
          paddingVertical: 10,
          paddingHorizontal: 50,
          borderRadius: 15,
          backgroundColor: incompleteForm ? theme.secondary : theme.primary,
        }}
      >
        <Text
          style={{
            fontFamily: "thin",
            color: isDark ? theme.text : theme.background,
            fontSize: 27,
            transform: [{ translateY: 2 }],
          }}
        >
          add question
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateQuestionModal;
