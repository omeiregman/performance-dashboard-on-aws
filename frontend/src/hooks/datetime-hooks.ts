import { useCallback } from "react";
import dayjs from "dayjs";
import { useSettings } from "./";

export function useDateTimeFormatter(): Function {
  const { settings } = useSettings();
  return useCallback(
    (dateToDisplay: Date) => {
      const { date, time } = settings.dateTimeFormat;
      return dayjs(dateToDisplay).format(`${date} ${time}`);
    },
    [settings]
  );
}
