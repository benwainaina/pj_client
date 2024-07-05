const dayjs = require('dayjs');

export const dateFormatterUtility = (date: Date, format: string): string => {
  return dayjs(date).format(format);
};
