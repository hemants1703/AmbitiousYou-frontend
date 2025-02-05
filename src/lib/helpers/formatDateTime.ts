/**
 * Formats a given Date object into a human-readable string.
 *
 * The output string is formatted as "YYYY-MM-DD HH:MM:SS", where:
 * - YYYY is the full year.
 * - MM is the two-digit month (1-indexed).
 * - DD is the two-digit day of the month.
 * - HH is the two-digit hour in 24-hour format.
 * - MM is the two-digit minutes.
 * - SS is the two-digit seconds.
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
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }