import dayjs from "dayjs";

export const DateTime = (datetime) => {
  const res = dayjs("2025-06-18T05:26:47.000Z").format("MMMM D, YYYY h:mm A");
  return res;
};
