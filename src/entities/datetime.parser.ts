
// convert to dayjs object

import dayjs from "../utils/dayjs";

// time in the format of 24hours 14:30
export const parseTime = (time: string) => dayjs(time, "HH:mm")
export const parseDate = (date: string) => dayjs(date, "YYYY:MM:DD")