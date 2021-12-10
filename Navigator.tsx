import React from "react";
import { Image } from "react-native";
import useAuth from "./hooks/useAuth";
import useTheme from "./hooks/useTheme";
import HomeScreen from "./screens/HomeScreen";
import PillScreen from "./screens/PillScreen";
import PillsScreen from "./screens/PillsScreen";
import SubjectScreen from "./screens/SubjectScreen";
import SubjectsScreen from "./screens/SubjectsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CreatePillScreen from "./screens/CreatePillScreen";
import CreateUserModal from "./screens/modals/CreateUserModal";
import CreateSubjectModal from "./screens/modals/CreateSubjectModal";
import EditSubjectModal from "./screens/modals/EditSubjectModal";
import EditUserModal from "./screens/modals/EditUserModal";
import CreateQuestionModal from "./screens/modals/CreateQuestionModal";
import EditQuestionModal from "./screens/modals/EditQuestionModal";
import LoginScreen from "./screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabParamList, StackParamList } from "./types";

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<StackParamList>();
const pathToIcon = "./assets/icons";

const Tabs = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          width: "100%",
          height: 100,
          paddingTop: 5,
          backgroundColor: theme.background,
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require(`${pathToIcon}/home.png`)}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? theme.primary : theme.secondary,
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="PillsScreen"
        component={PillsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require(`${pathToIcon}/capsule.png`)}
              resizeMode="contain"
              style={{
                transform: [{ rotate: "45deg" }, { translateY: 1 }],
                width: 25,
                height: 25,
                paddingHorizontal: -10,
                tintColor: focused ? theme.primary : theme.secondary,
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="SubjectsScreen"
        component={SubjectsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require(`${pathToIcon}/grid.png`)}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? theme.primary : theme.secondary,
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require(`${pathToIcon}/user.png`)}
              resizeMode="contain"
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? theme.primary : theme.secondary,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Navigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        {user ? (
          <>
            <Stack.Screen name="HomeScreen" component={Tabs} />
            <Stack.Screen name="SubjectScreen" component={SubjectScreen} />
            <Stack.Screen name="PillScreen" component={PillScreen} />
            <Stack.Screen
              name="CreatePillScreen"
              component={CreatePillScreen}
            />
          </>
        ) : (
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        )}
      </Stack.Group>

      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="CreateSubjectModal"
          component={CreateSubjectModal}
        />
        <Stack.Screen name="EditSubjectModal" component={EditSubjectModal} />
        <Stack.Screen name="EditUserModal" component={EditUserModal} />
        <Stack.Screen name="CreateUserModal" component={CreateUserModal} />
        <Stack.Screen
          name="CreateQuestionModal"
          component={CreateQuestionModal}
        />
        <Stack.Screen name="EditQuestionModal" component={EditQuestionModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Navigator;
