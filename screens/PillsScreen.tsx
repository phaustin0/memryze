import React, { useState, useEffect } from "react";
import { SafeAreaView, View, ScrollView, Text } from "react-native";
import Header from "../components/Header";
import Pill from "../components/Pill";
import useData from "../hooks/useData";
import useTheme from "../hooks/useTheme";
import { getTodayPills, getTomorrowPills, getWeekPills } from "../functions";
import { PillsScreenProps as Props, PillType } from "../types";

const PillsScreen = ({ route, navigation }: Props) => {
  const { pills } = useData();
  const { theme } = useTheme();

  const [todayPills, setTodayPills] = useState<PillType[]>([]);
  const [tomorrowPills, setTomorrowPills] = useState<PillType[]>([]);
  const [weekPills, setWeekPills] = useState<PillType[]>([]);

  const noUpcomingPills =
    todayPills.length == 0 &&
    tomorrowPills.length == 0 &&
    weekPills.length == 0;

  useEffect(() => {
    setTodayPills(getTodayPills(pills));
    setTomorrowPills(getTomorrowPills(pills));
    setWeekPills(getWeekPills(pills));
  }, [pills]);

  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
      {/* Header */}
      <Header text="upcoming" blueText=" pills" />

      {/* Main section */}
      <ScrollView style={{ paddingHorizontal: 20 }}>
        {/* Today */}
        {todayPills.length > 0 && (
          <View style={{ marginBottom: 15 }}>
            <Text
              style={{
                fontFamily: "bold",
                fontSize: 40,
                color: theme.secondary,
              }}
            >
              Today
            </Text>
            {todayPills.map(pill => (
              <Pill key={pill.id} navigation={navigation} id={pill.id} />
            ))}
          </View>
        )}

        {/* Tomorrow */}
        {tomorrowPills.length > 0 && (
          <View style={{ marginBottom: 15 }}>
            <Text
              style={{
                fontFamily: "bold",
                fontSize: 40,
                color: theme.secondary,
              }}
            >
              Tomorrow
            </Text>
            {tomorrowPills.map(pill => (
              <Pill key={pill.id} navigation={navigation} id={pill.id} />
            ))}
          </View>
        )}

        {/* Rest of week */}
        {weekPills.length > 0 && (
          <View style={{ marginBottom: 15 }}>
            <Text
              style={{
                fontFamily: "bold",
                fontSize: 40,
                color: theme.secondary,
              }}
            >
              This Week
            </Text>
            {weekPills.map(pill => (
              <Pill key={pill.id} navigation={navigation} id={pill.id} />
            ))}
          </View>
        )}

        {/* No pills */}
        {noUpcomingPills && (
          <Text
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 20,
              fontFamily: "thin",
              fontSize: 42,
              color: theme.secondary,
            }}
          >
            no upcoming pills
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PillsScreen;
