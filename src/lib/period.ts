import type { Period, YearMonth } from "@/types/portfolio";

const shortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const longMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatYearMonth(value: YearMonth, style: "short" | "long") {
  if (!value.month) return String(value.year);
  const months = style === "short" ? shortMonths : longMonths;
  return `${months[value.month - 1]} ${value.year}`;
}

/** "Nov 2025 – Present", "2022 – 2024". */
export function formatPeriod(period: Period, style: "short" | "long" = "short") {
  const start = formatYearMonth(period.start, style);
  const end = period.end === "present" ? "Present" : formatYearMonth(period.end, style);
  return `${start} – ${end}`;
}

/** Machine-readable value for `<time dateTime>`. */
export function isoYearMonth(value: YearMonth) {
  return value.month ? `${value.year}-${String(value.month).padStart(2, "0")}` : String(value.year);
}
