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
