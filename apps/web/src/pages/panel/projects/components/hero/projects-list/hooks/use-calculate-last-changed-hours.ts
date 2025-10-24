import dayjs from "dayjs";

export const useCalculateLastChangedHours = (date: string) => {
    return dayjs().diff(dayjs(date), "hour");
};