const dayjs = require('dayjs');

export const dateFormatterUtility = (
  date: Date | string,
  format: string,
): string => {
  return dayjs(date).format(format);
};
