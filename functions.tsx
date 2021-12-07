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
