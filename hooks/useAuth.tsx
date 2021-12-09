import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import * as Google from "expo-google-app-auth";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut as logOut,
} from "@firebase/auth";
import { auth, db } from "../firebase";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "../lib/config";
import { AuthenticationProps } from "../types";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext<Partial<AuthenticationProps>>({});
const config = {
  androidClientId: ANDROID_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email"],
};

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [error, setError] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, user => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setLoadingInitial(false);
      }),
    []
  );

  const signInWithGoogle = async () => {
    setLoading(true);
    await Google.logInAsync(config)
      .then(async loginResult => {
        if (loginResult.type === "success") {
          const { idToken, accessToken } = loginResult;
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );
          await signInWithCredential(auth, credential);
        } else if (loginResult.type === "cancel") {
          throw "User cancelled login";
        }
        return Promise.reject();
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  };

  const signOut = async () => {
    setLoading(true);
    await logOut(auth).catch(err => setError(err));
  };

  const resetAuthentication = () => {
    setName("");
    setError(null);
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      signOut,
      signInWithGoogle,
      name,
      setName,
      resetAuthentication,
    }),
    [user, loading, error, name]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default function useAuth() {
  return useContext(AuthContext) as AuthenticationProps;
}
