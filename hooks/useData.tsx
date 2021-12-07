import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
} from "react";
import useAuth from "./useAuth";
import { db } from "../firebase";
import {
  doc,
  collection,
  getDocs,
  query,
  where,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { DataProps, SubjectType } from "../types";

type Props = { children: React.ReactNode };

// TODO: add pills to data context layer
const DataContext = createContext<Partial<DataProps>>({});
const DataProvider = ({ children }: Props) => {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<SubjectType[]>([]);

  // get user's subjects
  useEffect(() => {
    const getSubjects = async () => {
      const returnedSnapshots = await getDocs(
        query(collection(db, "subjects"), where("userId", "==", user.uid))
      ).catch(err => {
        throw new Error(err);
      });
      returnedSnapshots.forEach(snapshot => {
        const subject = snapshot.data() as SubjectType;
        setSubjects([...subjects, subject]);
      });
    };
    getSubjects();
  }, []);

  // --- FUNCTIONS --- //
  const addSubject = async (name: string, type: string, color: string) => {
    const addedSubjectRef = doc(collection(db, "subjects"));
    const addedSubject: SubjectType = {
      id: addedSubjectRef.id,
      userId: user.uid,
      name: name,
      type: type,
      color: color,
      totalPills: 0,
    };

    await setDoc(addedSubjectRef, addedSubject) // add to firestore
      .catch(err => {
        throw new Error(err);
      });
    setSubjects([...subjects, addedSubject]); // add to context layer
  };

  const editSubject = async (
    id: string,
    name: string,
    type: string,
    color: string
  ) => {
    // get subject
    const editedSubject = subjects.filter(subject => subject.id === id)[0];
    const restOfSubjects = subjects.filter(subject => subject.id !== id);

    const newSubject: SubjectType = {
      id: editedSubject.id,
      userId: user.uid,
      name: name,
      type: type,
      color: color,
      totalPills: editedSubject.totalPills,
    };

    // update firestore
    await updateDoc(doc(db, "subjects", editedSubject.id), newSubject).catch(
      err => {
        throw new Error(err);
      }
    );
    setSubjects([newSubject, ...restOfSubjects]); // update context layer
  };

  const deleteSubject = async (id: string) => {
    const restOfSubjects = subjects.filter(subject => subject.id !== id);

    await deleteDoc(doc(db, "subjects", id)) // delete from firestore
      .catch(err => {
        throw new Error(err);
      });
    setSubjects(restOfSubjects); // delete from context layer
  };

  const memoedValue = useMemo(
    () => ({
      subjects: subjects,
      addSubject: addSubject,
      editSubject: editSubject,
      deleteSubject: deleteSubject,
    }),
    [subjects]
  );

  return (
    <DataContext.Provider value={memoedValue}>{children}</DataContext.Provider>
  );
};

export { DataProvider };
export default function useData() {
  return useContext(DataContext) as DataProps;
}
