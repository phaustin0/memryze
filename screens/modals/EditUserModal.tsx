import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";
import { db } from "../../firebase";
import { doc, updateDoc } from "@firebase/firestore";
import { EditUserModalProps as Props } from "../../types";

const EditUserModal = ({ route, navigation }: Props) => {
  const [buttonPressed, setButtonPressed] = useState(false);
  const [username, setUsername] = useState("");
  const { user, setName } = useAuth();
  const { isDark, theme } = useTheme();
  const incompleteForm = username === "";

  const editUser = async () => {
    setButtonPressed(true);
    const userSnapshot = await updateDoc(doc(db, "users", user.uid), {
      displayName: username,
    }).catch(err => {
      throw new Error(err);
    });
    setName(username);
    // @ts-ignore
    navigation.navigate("ProfileScreen");
  };

  return (
    <View
      style={{
        backgroundColor: theme.background,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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

      {/* Subtitle */}
      <Text
        style={{
          fontFamily: "bold",
          fontSize: 40,
          color: theme.secondary,
          marginBottom: 25,
          marginTop: -25,
        }}
      >
        Remember better
      </Text>

      <View>
        {/* Prompt */}
        <Text style={{ fontFamily: "thin", fontSize: 26, color: theme.text }}>
          Please enter the new name:
        </Text>

        {/* Input */}
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

      {/* edit button */}
      <TouchableOpacity
        disabled={incompleteForm || buttonPressed}
        onPress={editUser}
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
            fontSize: 27,
            color: isDark ? theme.text : theme.background,
            transform: [{ translateY: 2 }],
          }}
        >
          edit name
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditUserModal;
