import dayjs from "dayjs";

export const calculateLastChangedHours = (date: string) => {
    return dayjs().diff(dayjs(date), "hour");
};