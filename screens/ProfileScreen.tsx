import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/useData";
import useTheme from "../hooks/useTheme";
import { Feather } from "@expo/vector-icons";
import { ProfileScreenProps as Props } from "../types";

const ProfileScreen = ({ route, navigation }: Props) => {
  const { user, signOut, resetAuthentication } = useAuth();
  const { resetData } = useData();
  const { isDark, theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const signOutAndResetContext = async () => {
    await signOut();
    resetData();
    resetAuthentication();
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
      {/* Header */}
      <Header text="my" blueText=" profile">
        <TouchableOpacity>
          <Image
            source={{ uri: user.photoURL }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              resizeMode: "cover",
            }}
          />
        </TouchableOpacity>
      </Header>

      {/* Main section */}
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          marginTop: 20,
          justifyContent: "space-between",
        }}
      >
        <View>
          {/* Theme toggle */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  color: theme.text,
                  fontFamily: "thin",
                  fontSize: 30,
                  transform: [{ translateY: 2 }],
                  marginRight: 10,
                }}
              >
                {isDark ? "Light mode" : "Dark mode"}
              </Text>
              {isDark ? (
                <Feather name="sun" size={25} color={theme.secondary} />
              ) : (
                <Feather name="moon" size={25} color={theme.secondary} />
              )}
            </View>
            <Switch value={isDark} onValueChange={toggleTheme} />
          </View>

          {/* Edit user button */}
          <TouchableOpacity
            // @ts-ignore
            onPress={() => navigation.navigate("EditUserModal")}
            style={{
              width: "100%",
              paddingVertical: 10,
              marginTop: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: theme.text,
                fontFamily: "thin",
                fontSize: 30,
                transform: [{ translateY: 2 }],
              }}
            >
              Change display name
            </Text>
            <Feather name="edit-2" size={25} color={theme.primary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={signOutAndResetContext}
          style={{
            backgroundColor: "#ff4545",
            marginVertical: 20,
            marginLeft: "auto",
            marginRight: "auto",
            paddingHorizontal: 50,
            paddingVertical: 5,
            width: 200,
            borderRadius: 15,
          }}
        >
          <Text
            style={{
              fontFamily: "thin",
              fontSize: 30,
              textAlign: "center",
              color: isDark ? theme.text : theme.background,
              transform: [{ translateY: 2 }],
            }}
          >
            sign out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
