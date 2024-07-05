import {IPeriod} from '../interfaces';

const dayjs = require('dayjs');

const PERIOD_MAPPER = {
  all: '',
  daily: 'day',
  weekly: 'week',
  monthly: 'month',
};

export const datePeriodFormatterUtility = (
  period: IPeriod,
): {start: string; end: string} => ({
  start: dayjs().startOf(PERIOD_MAPPER[period]),
  end: dayjs().endOf(PERIOD_MAPPER[period]),
});
