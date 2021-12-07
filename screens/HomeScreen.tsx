import React from "react";
import { View, Text } from "react-native";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import { useFocusEffect } from "@react-navigation/native";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { HomeScreenProps as Props } from "../types";

const HomeScreen = ({ route, navigation }: Props) => {
  const { user } = useAuth();
  const { theme } = useTheme();

  useFocusEffect(() =>
    onSnapshot(doc(db, "users", user.uid), snapshot => {
      if (snapshot.exists()) return;
      navigation.navigate("CreateUserModal");
    })
  );

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
