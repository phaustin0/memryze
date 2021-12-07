import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import Header from "../components/Header";
import { useFocusEffect } from "@react-navigation/native";
import { db } from "../firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { dummyPillData } from "../lib/dummyData";
import { getTimeOfDay, isSameDay } from "../functions";
import { HomeScreenProps as Props } from "../types";

const HomeScreen = ({ route, navigation }: Props) => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [username, setUsername] = useState("");
  const [pills, setPills] = useState([]);
  const timeOfDay = getTimeOfDay();

  useFocusEffect(() =>
    onSnapshot(doc(db, "users", user.uid), snapshot => {
      if (snapshot.exists()) return;
      navigation.navigate("CreateUserModal");
    })
  );

  useEffect(() => {
    const getUser = async () => {
      const snapshot = await getDoc(doc(db, "users", user.uid)).catch(err => {
        throw new Error(err);
      });

      if (!snapshot.exists()) return;
      const data = snapshot.data();
      setUsername(data.displayName);
    };
    getUser();
  }, []);

  useEffect(() => {
    // TODO: get pills from firestore
    const today = new Date();
    const todayPills = dummyPillData.filter(pill =>
      isSameDay(pill.dueDate, today)
    );
    // @ts-ignore
    setPills(todayPills);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      {/* Header */}
      <Header text="mem" blueText="ryze">
        {/* Profile Picture */}
        <TouchableOpacity>
          <Image
            source={{ uri: user.photoURL }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </TouchableOpacity>
      </Header>

      {/* Main section */}
      <ScrollView style={{ paddingHorizontal: 20 }}>
        {/* Greeting */}
        <View>
          <Text
            style={{ fontFamily: "bold", fontSize: 40, color: theme.secondary }}
          >
            Good {timeOfDay},
          </Text>
          <Text
            style={{
              fontFamily: "bold",
              fontSize: 70,
              color: theme.primary,
              marginTop: -36,
            }}
          >
            {username}!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
