import React from "react";
import useAuth from "../hooks/useAuth";
import { db } from "../firebase";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { LoginScreenProps as Props } from "../types";

const LoginScreen = ({ route, navigation }: Props) => {
  const { loading, signInWithGoogle } = useAuth();
  const signIn = async () => await signInWithGoogle();

  return (
    <SafeAreaView style={{ alignItems: "center" }}>
      <Text>{loading ? "loading" : "login"}</Text>
      <TouchableOpacity style={{ marginTop: 10 }} onPress={signIn}>
        <Text style={{ color: "#246de0" }}>log in with google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
