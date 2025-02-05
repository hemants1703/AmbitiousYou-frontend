/**
 * Formats a given Date object into a human-readable string with milliseconds.
 *
 * The output string is formatted as "YYYY-MM-DD HH:MM:SS.mmm", where:
 * - YYYY is the full year.
 * - MM is the two-digit month (1-indexed).
 * - DD is the two-digit day of the month.
 * - HH is the two-digit hour in 24-hour format.
 * - MM is the two-digit minutes.
 * - SS is the two-digit seconds.
 * - mmm is the three-digit milliseconds.
 *
 * For example, September 27, 2022 at 6 p.m. is represented as:
 * "2022-09-27 18:00:00.000"
 *
 * @param date - The Date object to format.
 * @returns A formatted string representing the date and time.
 */
export default function formatDateTime(date: Date): string {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }