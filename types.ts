import React from "react";

export type AuthenticationProps = {
  user?: any;
  error?: any;
  name: string;
  imageUrl: string;
  loading: boolean;
  hasAccount: boolean;
  signOut: () => void;
  signInWithGoogle: () => Promise<void>;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
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
