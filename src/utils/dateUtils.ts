const separateDateString = (dateString: string) => {
  let month: number;
  let day: number;
  let year: number;

  let split = dateString.trim().split("/");

  month = parseInt(split[0]);
  day = parseInt(split[1]);
  year = parseInt(split[2]);

  return {
    month,
    day,
    year,
  };
};

// Assume date string is valid
export const stringToDate = (dateString: string) => {
  let { month, day, year } = separateDateString(dateString);

  let date = new Date();

  date.setMonth(month - 1);
  date.setDate(day);
  date.setFullYear(2000 + year);

  return date;
};

export const isDateAfterToday = (date: Date) => {
  let today = new Date();

  return today.getTime() < date.getTime();
};

// mm/dd/yy
export const isStringValidDate = (dateString: string) => {
  if (dateString.trim().split("/").length !== 3) return false;

  let { month, day, year } = separateDateString(dateString);

  if (month > 12 || month < 1) return false;

  if (day > 31 || day < 1) return false;

  if (year > 100 || year < 1) return false;

  let date = stringToDate(dateString);

  if (!isDateAfterToday(date)) return false;

  return true;
};

// Assume both are validated
export const dateAndTimeStringToDate = (
  dateString: string,
  timeString: string
) => {
  let date = stringToDate(dateString);
  date = combineTimeStringToDate(timeString, date);
  return date;
};

const separateTimeString = (timeString: string) => {
  let split = timeString.trim().split(" ");
  let times = split[0].split(":");

  let hours = parseInt(times[0]);
  let minutes = parseInt(times[1]);
  let amPm = split[1];

  return {
    hours,
    minutes,
    amPm,
  };
};

// Assume time is validated
const combineTimeStringToDate = (timeString: string, date: Date) => {
  let { hours, minutes, amPm } = separateTimeString(timeString);

  date.setMinutes(minutes);

  if (amPm == "PM" && hours != 12) {
    hours += 12;
  }

  if (amPm == "AM" && hours == 12) {
    hours = 0;
  }

  date.setHours(hours);
  date.setSeconds(0, 0);

  return date;
};

// hh:mm AM/PM
export const isStringValidTime = (timeString: string) => {
  let split = timeString.trim().split(" ");
  if (split.length !== 2) return false;

  let times = split[0].split(":");

  if (times.length !== 2) return false;

  let { hours, minutes, amPm } = separateTimeString(timeString);

  if (hours > 12 || hours < 1) return false;

  if (minutes > 59 || minutes < 0) return false;

  if (amPm !== "AM" && amPm !== "PM") return false;

  return true;
};
