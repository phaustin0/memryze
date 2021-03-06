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
import {
  getFutureDay,
  getPillsBySubjectId,
  getQuestionsByPillId,
} from "../functions";
import {
  DataProps,
  SubjectType,
  PillType,
  QuestionType,
  ShortAnswerQuestion,
  TruthQuestion,
  MultipleChoiceQuestion,
} from "../types";

type Props = { children: React.ReactNode };

const DataContext = createContext<Partial<DataProps>>({});
const DataProvider = ({ children }: Props) => {
  const { user } = useAuth();
  const [pills, setPills] = useState<PillType[]>([]);
  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [tmpQuestions, setTmpQuestions] = useState<QuestionType[]>([]);

  // get user's subjects
  useEffect(() => {
    const getSubjects = async () => {
      const returnedSnapshots = await getDocs(
        query(collection(db, "subjects"), where("userId", "==", user.uid))
      ).catch(err => {
        throw new Error(err);
      });

      let tmpSubjectArray: SubjectType[] = [];
      returnedSnapshots.forEach(snapshot => {
        const subject = snapshot.data() as SubjectType;
        tmpSubjectArray = [subject, ...tmpSubjectArray];
      });
      setSubjects(tmpSubjectArray);
    };

    if (!user) return;
    getSubjects();
  }, [user]);

  // get user's pills and questions
  useEffect(() => {
    const getQuestions = async () => {
      const returnedSnapshots = await getDocs(
        collection(db, "questions")
      ).catch(err => {
        throw new Error(err);
      });

      let tmpQuestionArray: QuestionType[] = [];
      returnedSnapshots.forEach(snapshot => {
        const question = snapshot.data() as QuestionType;
        tmpQuestionArray = [question, ...tmpQuestionArray];
      });
      setQuestions(tmpQuestionArray);
    };

    const getPills = async () => {
      const returnedSnapshots = await getDocs(
        query(collection(db, "pills"), where("userId", "==", user.uid))
      ).catch(err => {
        throw new Error(err);
      });

      let tmpPillArray: PillType[] = [];
      returnedSnapshots.forEach(async snapshot => {
        const pill = snapshot.data() as PillType;
        tmpPillArray = [pill, ...tmpPillArray];
      });
      setPills(tmpPillArray);
    };

    if (!user) return;
    getPills();
    getQuestions();
  }, [user]);

  const resetData = () => {
    setPills([]);
    setSubjects([]);
    setQuestions([]);
    setTmpQuestions([]);
  };

  // --- DATA FUNCTIONS --- //
  // --- subjects --- //
  const addSubject = async (name: string, type: string, color: string) => {
    const addedSubjectRef = doc(collection(db, "subjects"));
    const addedSubject: SubjectType = {
      id: addedSubjectRef.id,
      userId: user.uid,
      name: name,
      type: type,
      color: color,
    };

    await setDoc(addedSubjectRef, addedSubject) // add to firestore
      .catch(err => {
        throw new Error(err);
      });
    setSubjects([...subjects, addedSubject]); // add to context layer
  };

  const editSubject = async (
    id: string,
    name: string = "",
    type: string = "",
    color: string = ""
  ) => {
    // get subject
    const editedSubject = subjects.filter(subject => subject.id === id)[0];
    const restOfSubjects = subjects.filter(subject => subject.id !== id);

    const newSubject: SubjectType = {
      id: editedSubject.id,
      userId: user.uid,
      name: name === "" ? editedSubject.name : name,
      type: type === "" ? editedSubject.type : type,
      color: color === "" ? editedSubject.color : color,
    };

    // update firestore
    await updateDoc(doc(db, "subjects", editedSubject.id), newSubject).catch(
      err => {
        throw new Error(err);
      }
    );
    setSubjects([newSubject, ...restOfSubjects]); // update context layer
  };

  const deleteSubject = async (
    id: string,
    pillsArray: PillType[],
    questionsArray: QuestionType[]
  ) => {
    const restOfSubjects = subjects.filter(subject => subject.id !== id);

    const subjectPills = getPillsBySubjectId(pillsArray, id);
    await subjectPills.forEach(async pill => {
      await deletePill(pill.id, questionsArray);
    });

    await deleteDoc(doc(db, "subjects", id)) // delete from firestore
      .catch(err => {
        throw new Error(err);
      });
    setSubjects(restOfSubjects); // delete from context layer
  };

  // --- pills --- //
  const addPill = async (
    name: string,
    subjectId: string,
    questions: QuestionType[]
  ) => {
    const tomorrow = getFutureDay();
    const addedPillRef = doc(collection(db, "pills"));
    const addedPill: PillType = {
      id: addedPillRef.id,
      userId: user.uid,
      subjectId: subjectId,
      name: name,
      level: 1,
      dueDate: tomorrow,
      correctQuestions: 0,
    };

    await setDoc(addedPillRef, addedPill).catch(err => {
      throw new Error(err);
    });
    addQuestions(questions, addedPillRef.id);

    setPills([...pills, addedPill]);
    setTmpQuestions([]);
  };

  // TODO: add increasing level and changing due date function
  const editPill = async (id: string, name: string = "") => {
    // get pill
    const editedPill = pills.filter(pill => pill.id === id)[0];
    const restOfPills = pills.filter(pill => pill.id !== id);

    const newPill: PillType = {
      id: editedPill.id,
      userId: user.uid,
      subjectId: editedPill.subjectId,
      name: name === "" ? editedPill.name : name,
      level: editedPill.level,
      dueDate: editedPill.dueDate,
      correctQuestions: 0,
    };

    await updateDoc(doc(db, "pills", id), newPill).catch(err => {
      throw new Error(err);
    });
    setPills([newPill, ...restOfPills]);
  };

  const deletePill = async (id: string, questionsArray: QuestionType[]) => {
    const restOfPills = pills.filter(pill => pill.id !== id);

    const pillQuestions = getQuestionsByPillId(questionsArray, id);
    await pillQuestions.forEach(async question => {
      await deleteQuestion(question.id);
    });

    await deleteDoc(doc(db, "pills", id)).catch(err => {
      throw new Error(err);
    });
    setPills(restOfPills);
  };

  // --- questions --- //
  const addQuestions = async (
    questionsArray: QuestionType[],
    pillId: string
  ) => {
    const questionIds = getQuestionsByPillId(questions, pillId).map(
      question => question.id
    ); // index of question ids

    // add all questions to firestore
    await questionsArray.forEach(async question => {
      let newQuestion = question;
      newQuestion.pillId = pillId;
      if (questionIds.includes(newQuestion.id)) {
        // if in firestore aleady
        const newQuestionRef = doc(db, "questions", question.id);
        await setDoc(newQuestionRef, newQuestion).catch(err => {
          throw new Error(err);
        });
      } else {
        const newQuestionRef = doc(collection(db, "questions"));
        newQuestion.id = newQuestionRef.id;
        await setDoc(newQuestionRef, newQuestion).catch(err => {
          throw new Error(err);
        });
      }
    });

    const restOfQuestions = questions.filter(
      question => question.pillId !== pillId
    );
    setQuestions([...questionsArray, ...restOfQuestions]);
  };

  const deleteQuestion = async (id: string) => {
    const restOfQuestions = questions.filter(question => question.id !== id);

    await deleteDoc(doc(db, "questions", id)).catch(err => {
      throw new Error(err);
    });
    setQuestions(restOfQuestions);
  };

  // --- temporary questions --- //
  const addTemporaryShortQuestion = (name: string, answer: string) => {
    const addedQuestion: ShortAnswerQuestion = {
      id: tmpQuestions.length.toString(),
      pillId: tmpQuestions.length.toString(),
      type: "short",
      name: name,
      answer: answer,
    };
    setTmpQuestions([...tmpQuestions, addedQuestion]);
  };

  const addTemporaryTruthQuestion = (name: string, answer: boolean) => {
    const addedQuestion: TruthQuestion = {
      id: tmpQuestions.length.toString(),
      pillId: tmpQuestions.length.toString(),
      type: "truth",
      name: name,
      answer: answer,
    };
    setTmpQuestions([...tmpQuestions, addedQuestion]);
  };

  const addTemporaryMultipleChoiceQuestion = (
    name: string,
    answer: string,
    option2: string,
    option3: string,
    option4: string
  ) => {
    const addedQuestion: MultipleChoiceQuestion = {
      id: tmpQuestions.length.toString(),
      pillId: tmpQuestions.length.toString(),
      type: "multiple",
      name: name,
      answer: answer,
      option2: option2,
      option3: option3,
      option4: option4,
    };
    setTmpQuestions([...tmpQuestions, addedQuestion]);
  };

  const editTemporaryShortQuestion = (
    id: string,
    name: string = "",
    answer: string = ""
  ) => {
    const editedQuestion = tmpQuestions.filter(
      question => question.id === id
    )[0];
    const restOfQuestions = tmpQuestions.filter(question => question.id !== id);

    const newQuestion: ShortAnswerQuestion = {
      id: editedQuestion.id,
      pillId: editedQuestion.pillId,
      type: "short",
      name: name === "" ? editedQuestion.name : name,
      // @ts-ignore
      answer: answer === "" ? editedQuestion.answer : answer,
    };

    setTmpQuestions([...restOfQuestions, newQuestion]);
  };

  const editTemporaryTruthQuestion = (
    id: string,
    name: string = "",
    answer: boolean = false
  ) => {
    const editedQuestion = tmpQuestions.filter(
      question => question.id === id
    )[0];
    const restOfQuestions = tmpQuestions.filter(question => question.id !== id);

    const addedQuestion: TruthQuestion = {
      id: editedQuestion.id,
      pillId: editedQuestion.pillId,
      type: "truth",
      name: name === "" ? editedQuestion.name : name,
      answer: answer,
    };
    setTmpQuestions([...restOfQuestions, addedQuestion]);
  };

  const editTemporaryMultipleChoiceQuestion = (
    id: string,
    name: string,
    answer: string,
    option2: string,
    option3: string,
    option4: string
  ) => {
    const editedQuestion = tmpQuestions.filter(
      question => question.id === id
    )[0];
    const restOfQuestions = tmpQuestions.filter(question => question.id !== id);

    const addedQuestion: MultipleChoiceQuestion = {
      id: editedQuestion.id,
      pillId: editedQuestion.pillId,
      type: "multiple",
      name: name === "" ? editedQuestion.name : name,
      answer: answer,
      // @ts-ignore
      option2: option2 === "" ? editedQuestion.option2 : option2,
      // @ts-ignore
      option3: option3 === "" ? editedQuestion.option3 : option3,
      // @ts-ignore
      option4: option4 === "" ? editedQuestion.option4 : option4,
    };
    setTmpQuestions([...restOfQuestions, addedQuestion]);
  };

  const deleteTemporaryQuestion = (id: string) => {
    const restOfQuestions = tmpQuestions.filter(question => question.id !== id);
    setTmpQuestions(restOfQuestions);
  };

  const resetTemporaryQuestions = () => {
    setTmpQuestions([]);
  };

  const memoedValue = useMemo(
    () => ({
      subjects,
      addSubject,
      editSubject,
      deleteSubject,

      pills,
      addPill,
      editPill,
      deletePill,
      resetData,

      questions,
      addQuestions,
      deleteQuestion,

      tmpQuestions,
      addTemporaryShortQuestion,
      addTemporaryTruthQuestion,
      addTemporaryMultipleChoiceQuestion,
      editTemporaryShortQuestion,
      editTemporaryTruthQuestion,
      editTemporaryMultipleChoiceQuestion,
      deleteTemporaryQuestion,
      resetTemporaryQuestions,
    }),
    [subjects, pills, questions, tmpQuestions]
  );

  return (
    <DataContext.Provider value={memoedValue}>{children}</DataContext.Provider>
  );
};

export { DataProvider };
export default function useData() {
  return useContext(DataContext) as DataProps;
}
