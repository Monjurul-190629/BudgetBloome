export type PeriodType =
  | "today"
  | "weekly"
  | "this-month"
  | "last-month"
  | "two-months-ago"
  | "three-months-ago"
  | "total";

const formatDate = (date: Date) => date.toISOString().split("T")[0];

const getMonthRange = (monthOffset: number) => {
  const today = new Date();

  const fromDate = new Date(today.getFullYear(), today.getMonth() - monthOffset, 1);
  const toDate = new Date(today.getFullYear(), today.getMonth() - monthOffset + 1, 0);

  return {
    from: formatDate(fromDate),
    to: formatDate(toDate),
    label: fromDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    }),
  };
};

export const getDateRange = (type: PeriodType) => {
  const today = new Date();

  if (type === "total") {
    return {
      from: undefined,
      to: undefined,
      label: "Total",
    };
  }

  if (type === "today") {
    return {
      from: formatDate(today),
      to: formatDate(today),
      label: "Today",
    };
  }

  if (type === "weekly") {
    const day = today.getDay();
    const diffToMonday = day === 0 ? 6 : day - 1;

    const fromDate = new Date(today);
    fromDate.setDate(today.getDate() - diffToMonday);

    return {
      from: formatDate(fromDate),
      to: formatDate(today),
      label: "This Week",
    };
  }

  if (type === "this-month") return getMonthRange(0);
  if (type === "last-month") return getMonthRange(1);
  if (type === "two-months-ago") return getMonthRange(2);
  if (type === "three-months-ago") return getMonthRange(3);

  return getMonthRange(0);
};