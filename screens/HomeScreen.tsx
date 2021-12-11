import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/useData";
import useTheme from "../hooks/useTheme";
import Header from "../components/Header";
import Pill from "../components/Pill";
import { useIsFocused } from "@react-navigation/core";
import { useFocusEffect } from "@react-navigation/native";
import { db } from "../firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { getTimeOfDay, getTodayPills } from "../functions";
import { HomeScreenProps as Props, PillType } from "../types";

const HomeScreen = ({ route, navigation }: Props) => {
  const { user, name } = useAuth();
  const { pills } = useData();
  const { isDark, theme } = useTheme();
  const [username, setUsername] = useState("");
  const [todayPills, setTodayPills] = useState<PillType[]>([]);
  const isFocused = useIsFocused();
  const timeOfDay = getTimeOfDay();

  useFocusEffect(() =>
    onSnapshot(doc(db, "users", user.uid), snapshot => {
      if (snapshot.exists()) return;
      navigation.navigate("CreateUserModal");
    })
  );

  useLayoutEffect(() => {
    const getUser = async () => {
      const snapshot = await getDoc(doc(db, "users", user.uid)).catch(err => {
        throw new Error(err);
      });

      if (!snapshot.exists()) return;
      const data = snapshot.data();
      setUsername(data.displayName);
    };

    if (!isFocused) return;
    if (name === "") {
      getUser();
    } else {
      setUsername(name);
    }
  }, [name, isFocused]);

  useEffect(() => {
    setTodayPills(getTodayPills(pills));
  }, [pills]);

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
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
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

        {/* Pills */}
        <View>
          {todayPills.length > 0 ? (
            <View>
              <Text
                style={{
                  fontFamily: "bold",
                  fontSize: 40,
                  color: theme.secondary,
                }}
              >
                To do today
              </Text>
              <View>
                {todayPills.map(pill => (
                  <Pill key={pill.id} navigation={navigation} id={pill.id} />
                ))}
              </View>
            </View>
          ) : (
            <View
              style={{ marginLeft: "auto", marginRight: "auto", marginTop: 80 }}
            >
              <Text
                style={{
                  fontFamily: "thin",
                  fontSize: 40,
                  color: theme.secondary,
                  textAlign: "center",
                }}
              >
                No pills to do today
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  backgroundColor: theme.primary,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 15,
                }}
                onPress={() => navigation.navigate("PillsScreen")}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontFamily: "thin",
                    fontSize: 28,
                    color: isDark ? theme.text : theme.background,
                    transform: [{ translateY: 2 }],
                  }}
                >
                  Check out the upcoming pills
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
