export type PeriodType =
  | "today"
  | "weekly"
  | "weekly-per-day"
  | "this-month"
  | "last-month"
  | "two-months-ago"
  | "three-months-ago"
  | "four-months-ago"
  | "five-months-ago"
  | "six-months-ago"
  | "total";

export type DateRangeDay = {
  day: string;
  date: string;
};

export type DateRangeResult = {
  from?: string;
  to?: string;
  label: string;
  days: DateRangeDay[];
};

const formatDate = (date: Date) => date.toISOString().split("T")[0];

const getLast7Days = (): DateRangeResult => {
  const today = new Date();

  const fromDate = new Date(today);
  fromDate.setDate(today.getDate() - 6);

  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(fromDate);
    date.setDate(fromDate.getDate() + index);

    return {
      day: date.toLocaleString("default", { weekday: "long" }),
      date: formatDate(date),
    };
  });

  return {
    from: formatDate(fromDate),
    to: formatDate(today),
    label: "Last 7 Days",
    days,
  };
};

const getMonthRange = (monthOffset: number): DateRangeResult => {
  const today = new Date();

  const fromDate = new Date(
    today.getFullYear(),
    today.getMonth() - monthOffset,
    1,
  );

  const toDate = new Date(
    today.getFullYear(),
    today.getMonth() - monthOffset + 1,
    0,
  );

  return {
    from: formatDate(fromDate),
    to: formatDate(toDate),
    label: fromDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    }),
    days: [],
  };
};

export const getDateRange = (type: PeriodType): DateRangeResult => {
  const today = new Date();

  if (type === "total") {
    return {
      from: undefined,
      to: undefined,
      label: "Total",
      days: [],
    };
  }

  if (type === "today") {
    return {
      from: formatDate(today),
      to: formatDate(today),
      label: "Today",
      days: [],
    };
  }

  if (type === "weekly-per-day") {
    return getLast7Days();
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
      days: [],
    };
  }

  const monthOffsetMap: Record<
    Exclude<PeriodType, "today" | "weekly" | "weekly-per-day" | "total">,
    number
  > = {
    "this-month": 0,
    "last-month": 1,
    "two-months-ago": 2,
    "three-months-ago": 3,
    "four-months-ago": 4,
    "five-months-ago": 5,
    "six-months-ago": 6,
  };

  return getMonthRange(monthOffsetMap[type]);
};