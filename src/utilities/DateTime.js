import dayjs from "dayjs";

export const DateTime = (datetime) => {
  const res = dayjs(datetime).format("MMMM D, YYYY h:mm A");
  return res;
};
