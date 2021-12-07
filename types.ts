import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";

export type AuthenticationProps = {
  user?: any;
  error?: any;
  name: string;
  loading: boolean;
  hasAccount: boolean;
  signOut: () => void;
  signInWithGoogle: () => Promise<void>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setHasAccount: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ThemeProps = {
  isDark: boolean;
  theme: ColorTheme;
  setTheme: (scheme: string) => void;
};

export type ColorTheme = {
  background: string;
  primary: string;
  secondary: string;
  text: string;
};

export type DataProps = {
  subjects: SubjectType[];
  addSubject: (name: string, type: string, color: string) => Promise<void>;
  editSubject: (
    id: string,
    name: string,
    type: string,
    color: string
  ) => Promise<void>;
  deleteSubject: (id: string) => Promise<void>;
};

export type SubjectType = {
  id: string;
  userId: string;
  name: string;
  type: string;
  color: string;
  totalPills: number;
};

export type TabParamList = {
  HomeScreen: undefined;
  PillsScreen: undefined;
  SubjectsScreen: undefined;
  ProfileScreen: undefined;
};

export type StackParamList = {
  LoginScreen: undefined;
  HomeScreen: undefined;
  PillScreen: undefined;
  SubjectScreen: undefined;
  CreatePillScreen: undefined;
  CreateUserModal: undefined;
  EditUserModal: undefined;
  CreateSubjectModal: undefined;
  EditSubjectModal: undefined;
  CreateQuestionModal: undefined;
};

export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, "HomeScreen">,
  NativeStackScreenProps<StackParamList>
>;
export type PillsScreenProps = BottomTabScreenProps<
  TabParamList,
  "PillsScreen"
>;
export type SubjectsScreenProps = BottomTabScreenProps<
  TabParamList,
  "SubjectsScreen"
>;
export type ProfileScreenProps = BottomTabScreenProps<
  TabParamList,
  "ProfileScreen"
>;

export type LoginScreenProps = NativeStackScreenProps<
  StackParamList,
  "LoginScreen"
>;
export type PillScreenProps = NativeStackScreenProps<
  StackParamList,
  "PillScreen"
>;
export type SubjectScreenProps = NativeStackScreenProps<
  StackParamList,
  "SubjectScreen"
>;
export type CreatePillScreenProps = NativeStackScreenProps<
  StackParamList,
  "CreatePillScreen"
>;
export type CreateUserModalProps = NativeStackScreenProps<
  StackParamList,
  "CreateUserModal"
>;
export type EditUserModalProps = NativeStackScreenProps<
  StackParamList,
  "EditUserModal"
>;
export type CreateSubjectModalProps = NativeStackScreenProps<
  StackParamList,
  "CreateSubjectModal"
>;
export type EditSubjectModalProps = NativeStackScreenProps<
  StackParamList,
  "EditSubjectModal"
>;
export type CreateQuestionModal = NativeStackScreenProps<
  StackParamList,
  "CreateQuestionModal"
>;
