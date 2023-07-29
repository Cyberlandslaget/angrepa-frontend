export const toUnixTimestamp = (time: string) =>
  Math.floor(new Date(time + 'Z').getTime() / 1000);
