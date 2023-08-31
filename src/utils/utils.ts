export const toUnixTimestamp = (time: string) =>
  Math.floor(new Date(time + 'Z').getTime() / 1000);
export const toLocaleDateFormat = (date: Date) => {
  const hours = String(date.getHours()).padStart(2,"0");
  const minutes = String(date.getMinutes()).padStart(2,"0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`
}