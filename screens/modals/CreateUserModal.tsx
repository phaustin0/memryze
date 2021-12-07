import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";
import { db } from "../../firebase";
import { doc, setDoc, serverTimestamp } from "@firebase/firestore";
import { CreateUserModalProps as Props } from "../../types";

const CreateUserModal = ({ route, navigation }: Props) => {
  const [username, setUsername] = useState("");
  const { user, setName } = useAuth();
  const { isDark, theme } = useTheme();
  const incompleteForm = username === "";

  const createUser = async () => {
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: username,
      timestamp: serverTimestamp(),
    }).catch(err => {
      throw new Error(err);
    });
    setName(username);
    navigation.navigate("HomeScreen");
  };

  return (
    <SafeAreaView
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      {/* Title */}
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontFamily: "bold", fontSize: 70, color: theme.text }}>
          mem
        </Text>
        <Text
          style={{ fontFamily: "bold", fontSize: 70, color: theme.primary }}
        >
          ryze
        </Text>
      </View>

      {/* Tag line */}
      <Text
        style={{
          fontFamily: "bold",
          fontSize: 40,
          color: theme.secondary,
          marginBottom: 25,
          transform: [{ translateY: -25 }],
        }}
      >
        Remember better.
      </Text>

      {/* Text input with prompt */}
      <View>
        <Text style={{ fontFamily: "thin", fontSize: 26, color: theme.text }}>
          To start off, please enter your name:
        </Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="enter your name"
          placeholderTextColor={`${theme.secondary}88`}
          maxLength={15}
          style={{
            textAlign: "center",
            fontFamily: "thin",
            fontSize: 32,
            color: theme.primary,
            marginBottom: "40%",
          }}
        />
      </View>

      {/* Button */}
      <TouchableOpacity
        disabled={incompleteForm}
        onPress={createUser}
        style={{
          position: "absolute",
          bottom: 80,
          paddingVertical: 10,
          paddingHorizontal: 50,
          borderRadius: 15,
          backgroundColor: incompleteForm ? theme.secondary : theme.primary,
        }}
      >
        <Text
          style={{
            fontFamily: "bold",
            color: isDark ? theme.text : theme.background,
            fontSize: 27,
            transform: [{ translateY: 2 }],
          }}
        >
          get started
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateUserModal;
