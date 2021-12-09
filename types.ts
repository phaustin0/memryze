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
  resetAuthentication: () => void;
  setName: React.Dispatch<React.SetStateAction<string>>;
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
    name?: string,
    type?: string,
    color?: string
  ) => Promise<void>;
  deleteSubject: (
    id: string,
    pillsArray: PillType[],
    questionsArray: QuestionType[]
  ) => Promise<void>;

  pills: PillType[];
  addPill: (
    name: string,
    subjectId: string,
    questions: QuestionType[]
  ) => Promise<void>;
  editPill: (id: string, name?: string) => Promise<void>;
  deletePill: (id: string, questionsArray: QuestionType[]) => Promise<void>;

  questions: QuestionType[];
  addQuestions: (
    questionsArray: QuestionType[],
    pillId: string
  ) => Promise<void>;
  deleteQuestion: (id: string) => Promise<void>;

  tmpQuestions: QuestionType[];
  addTemporaryShortQuestion: (name: string, answer: string) => void;
  addTemporaryTruthQuestion: (name: string, answer: boolean) => void;
  addTemporaryMultipleChoiceQuestion: (
    name: string,
    answer: string,
    option2: string,
    option3: string,
    option4: string
  ) => void;
  editTemporaryShortQuestion: (
    id: string,
    name?: string,
    answer?: string
  ) => void;
  editTemporaryTruthQuestion: (
    id: string,
    name?: string,
    answer?: boolean
  ) => void;
  editTemporaryMultipleChoiceQuestion: (
    id: string,
    name: string,
    answer: string,
    option2: string,
    option3: string,
    option4: string
  ) => void;
  deleteTemporaryQuestion: (id: string) => void;
  resetTemporaryQuestions: () => void;

  resetData: () => void;
};

export type SubjectType = {
  id: string;
  userId: string;
  name: string;
  type: string;
  color: string;
};

export type PillType = {
  id: string;
  userId: string;
  subjectId: string;
  name: string;
  level: number;
  dueDate: string;
  correctQuestions: number;
};

export type QuestionType =
  | ShortAnswerQuestion
  | TruthQuestion
  | MultipleChoiceQuestion;

export type ShortAnswerQuestion = {
  id: string;
  pillId: string;
  type: string;
  name: string;
  answer: string;
};

export type TruthQuestion = {
  id: string;
  pillId: string;
  type: string;
  name: string;
  answer: boolean;
};

export type MultipleChoiceQuestion = {
  id: string;
  pillId: string;
  type: string;
  name: string;
  answer: string;
  option2: string;
  option3: string;
  option4: string;
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
  SubjectScreen: { id: string };
  CreatePillScreen: { subjectId: string };
  CreateUserModal: undefined;
  EditUserModal: undefined;
  CreateSubjectModal: undefined;
  EditSubjectModal: { id: string; name: string; type: string; color: string };
  CreateQuestionModal: { subjectId: string };
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
export type CreateQuestionModalProps = NativeStackScreenProps<
  StackParamList,
  "CreateQuestionModal"
>;
