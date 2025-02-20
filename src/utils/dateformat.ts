import moment from 'moment';
export const dateFormats =
(date:string, format:string='MM/DD/YYYY , hh:mm A') => {
  const testDateUtc = moment.utc(date);
  return (testDateUtc).local().format(format);
};

export const updatedDateFormats =
(date:string, format:string='LLL') => {
  const testDateUtc = moment.utc(date);
  return (testDateUtc).local().format(format);
};
export const dateDuration = (date:string) => {
  // const offset = new Date().getTimezoneOffset();
  return moment(date).fromNow();
};
export const dateDiffDuration = (date:string) => {
  // const offset = new Date().getTimezoneOffset();
  const now = moment();
  const there = moment(date);
  return there.diff(now, 'minutes');
};
export const daysDiffDuration = (date:string) => {
  // const offset = new Date().getTimezoneOffset();
  const now = moment();
  const there = moment(date);
  return there.diff(now, 'days');
};
export const addDateDuration = (date:string, limit, format) => {
  // const offset = new Date().getTimezoneOffset();
  const testDateUtc = moment.utc(date);
  return moment(testDateUtc).add(limit, format);
};

