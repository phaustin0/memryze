import { SubjectType, PillType, QuestionType } from "./types";

// --- UTILITY FUNCTIONS --- //
export const getTimeOfDay = (): string => {
  const currentHour = new Date().getHours();

  if (currentHour >= 0 && currentHour < 12) return "morning"; // 0000hrs - 1159hrs
  if (currentHour >= 12 && currentHour < 18) return "afternoon"; // 1200hrs - 1759hrs
  return "evening"; // 1800hrs - 2359hrs
};

export const getDateText = (
  date: Date,
  includeYears: boolean = false
): string => {
  const day = date.getDate();
  const month = date.getMonth();

  const dayString = day < 10 ? `0${day}` : `${day}`;
  const monthString = month < 10 ? `0${month}` : `${month}`;

  if (includeYears) {
    const year = date.getFullYear();
    const yearString = year < 10 ? `0${year}` : `${year}`;
    return `${dayString}/${monthString}/${yearString}`;
  }
  return `${dayString}/${monthString}`;
};

export const isSameDay = (day1: Date, day2: Date): boolean => {
  const firstDay = getDateText(day1);
  const secondDay = getDateText(day2);
  return firstDay === secondDay;
};

export const getColor = (c: string): string => {
  const color = c.toLowerCase();
  if (color === "purple") return "#ce7deb";
  if (color === "darkpurple") return "#9359a7";
  if (color === "red") return "#ea6060";
  if (color === "darkred") return "#b54141";
  if (color === "blue") return "#74aaff";
  if (color === "darkblue") return "#326fce";
  if (color === "green") return "#21bf64";
  if (color === "darkgreen") return "#1e9539";
  if (color === "yellow") return "#e6ca32";
  if (color === "darkyellow") return "#bc9f00";
  if (color === "orange") return "#ffaa4f";
  if (color === "darkorange") return "#e8963c";
  if (color === "pink") return "#ed7ec6";
  if (color === "darkpink") return "#e856b6";
  return "";
};

export const getDarkerColor = (c: string): string => {
  const color = c.toLowerCase();
  if (color === "purple") return "#b96ed4";
  if (color === "darkpurple") return "#845096";
  if (color === "red") return "#d45555";
  if (color === "darkred") return "#9e3131";
  if (color === "blue") return "#6796e0";
  if (color === "darkblue") return "#2a5fb0";
  if (color === "green") return "#1da858";
  if (color === "darkgreen") return "#187d2f";
  if (color === "yellow") return "#d4b824";
  if (color === "darkyellow") return "#a68c00";
  if (color === "orange") return "#ed9334";
  if (color === "darkorange") return "#cc8635";
  if (color === "pink") return "#e06cb7";
  if (color === "darkpink") return "#d13d9e";
  return "";
};

export const getPillText = (numberOfPills: number): string => {
  const returnedText =
    numberOfPills === 1 ? `${numberOfPills} pill` : `${numberOfPills} pills`;
  return returnedText;
};

export const capitalizeSubjectType = (subjectName: string): string => {
  if (subjectName === "it") return "IT";

  const capitalizedName =
    subjectName[0].toUpperCase() + subjectName.substring(1);
  return capitalizedName;
};

export const getLevelText = (level: number): string => {
  if (level == 11 || level == 12 || level == 13) return `${level}th level`;
  if (level % 10 == 1) return `${level}st level`;
  if (level % 10 == 2) return `${level}nd level`;
  if (level % 10 == 3) return `${level}rd level`;
  return `${level}th level`;
};

export const getDateFromJSON = (date: string): Date => {
  return new Date(date);
};

export const getFutureDay = (
  startingDate: Date = new Date(),
  numberOfDays: number = 1
): string => {
  let futureDay = new Date();
  futureDay.setDate(startingDate.getDate() + numberOfDays);
  return futureDay.toJSON();
};

// --- DATA FUNCTIONS --- //
export const getSubjectById = (
  subjectsArray: SubjectType[],
  subjectId: string
): SubjectType => {
  const returnedSubjects = subjectsArray.filter(
    subject => subject.id === subjectId
  );
  return returnedSubjects[0];
};

export const getPillById = (
  pillsArray: PillType[],
  pillId: string
): PillType | null => {
  const returnedPills = pillsArray.filter(pill => pill.id === pillId);
  if (returnedPills.length < 1) return null;
  return returnedPills[0];
};

export const getQuestionById = (
  questionsArray: QuestionType[],
  questionId: string
): QuestionType => {
  const returnedQuestions = questionsArray.filter(
    question => question.id === questionId
  );
  return returnedQuestions[0];
};

export const getPillsBySubjectId = (
  pillsArray: PillType[],
  subjectId: string
): PillType[] => {
  const returnedPills = pillsArray.filter(pill => pill.subjectId === subjectId);
  return returnedPills;
};

export const getQuestionsByPillId = (
  questionsArray: QuestionType[],
  pillId: string
): QuestionType[] => {
  const returnedQuestions = questionsArray.filter(
    question => question.pillId === pillId
  );
  return returnedQuestions;
};

export const typeToText = (type: string): string => {
  if (type === "short") return "Short Answer";
  if (type === "truth") return "True or False";
  if (type === "multiple") return "MCQ";
  return "";
};

export const getTodayPills = (pillsArray: PillType[]): PillType[] => {
  const todaysDate = new Date();

  const todayPills = pillsArray.filter(pill =>
    isSameDay(getDateFromJSON(pill.dueDate), todaysDate)
  );
  return todayPills;
};

export const getTomorrowPills = (pillsArray: PillType[]): PillType[] => {
  const tomorrowsDate = getFutureDay(new Date());

  const tomorrowsPills = pillsArray.filter(pill =>
    isSameDay(getDateFromJSON(pill.dueDate), getDateFromJSON(tomorrowsDate))
  );
  return tomorrowsPills;
};

export const getWeekPills = (pillsArray: PillType[]): PillType[] => {
  const thirdDate = getFutureDay(new Date(), 2);
  const fourthDate = getFutureDay(new Date(), 3);
  const fifthDate = getFutureDay(new Date(), 4);
  const sixthDate = getFutureDay(new Date(), 5);
  const seventhDate = getFutureDay(new Date(), 6);

  const weekPills = pillsArray.filter(
    pill =>
      isSameDay(getDateFromJSON(pill.dueDate), getDateFromJSON(thirdDate)) ||
      isSameDay(getDateFromJSON(pill.dueDate), getDateFromJSON(fourthDate)) ||
      isSameDay(getDateFromJSON(pill.dueDate), getDateFromJSON(fifthDate)) ||
      isSameDay(getDateFromJSON(pill.dueDate), getDateFromJSON(sixthDate)) ||
      isSameDay(getDateFromJSON(pill.dueDate), getDateFromJSON(seventhDate))
  );
  return weekPills;
};
