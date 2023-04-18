import { format, toDate, utcToZonedTime } from "date-fns-tz";
import enUS from "date-fns/locale/en-US";
import moment from "moment-timezone";

/**
 * Given three Date Objects, compare only the time portion of the objects and return true if the time being compared is within the min and max times (inclusive)
 * Returns Null if minDate is later than maxDate or if missing arguments
 * @param {Date} minDate date containing start of time range
 * @param {Date} maxDate date containing end of time range
 * @param {Date} compareDate date containing the time to be checked
 */
export function isTimeInRange(minDate: Date, maxDate: Date, compareDate: Date) {
  const breakException = {};
  const dateArr = [minDate, maxDate, compareDate];
  let returnValue = true;
  try {
    dateArr.forEach((element) => {
      if (!element) {
        returnValue = false;
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw breakException;
      }
      element.setDate(1);
      element.setFullYear(1970);
      element.setMonth(0);
    });
    if (!(dateArr[0].getTime() <= dateArr[1].getTime())) {
      returnValue = false;
    }
    if (
      !(
        dateArr[0].getTime() <= dateArr[2].getTime() &&
        dateArr[2].getTime() <= dateArr[1].getTime()
      )
    ) {
      returnValue = false;
    }
  } catch (breakException) {}
  return returnValue;
}

export const convertDatetimeToLocalDatetime = (
  datetime: string,
  alternateTimeZone = false,
  datetimeFormat: string,
  includeTimeZoneAbbr = false
) => {
  if (!datetime) {
    return null;
  }
  const userTime: any = Intl.DateTimeFormat().resolvedOptions();
  const timeZone: string = alternateTimeZone || userTime.timeZone;
  const timeZoneDatetime = utcToZonedTime(`${datetime} UTC`, timeZone);
  const formattedDatetime = format(timeZoneDatetime, datetimeFormat, {
    timeZone,
    locale: enUS,
  });
  const timeZoneAbbr = getTimeZoneAbbr(timeZone);
  return includeTimeZoneAbbr
    ? `${formattedDatetime} (${timeZoneAbbr})`
    : formattedDatetime;
};

export const getLocalDate = (
  datetime,
  timeZone = false,
  includeTimeZoneAbbr = false
) =>
  convertDatetimeToLocalDatetime(
    datetime,
    timeZone,
    "M/dd/yy",
    includeTimeZoneAbbr
  );

export const getLocalTime = (
  datetime,
  timeZone = false,
  includeTimeZoneAbbr = false
) =>
  convertDatetimeToLocalDatetime(
    datetime,
    timeZone,
    "HH:mm",
    includeTimeZoneAbbr
  );

export const getLocalDatetime = (
  datetime,
  timeZone = false,
  includeTimeZoneAbbr = false
) =>
  convertDatetimeToLocalDatetime(
    datetime,
    timeZone,
    "M/dd/yy h:mm a",
    includeTimeZoneAbbr
  );

export const getTimeZoneAbbr = (timeZone) => moment().tz(timeZone)?.zoneAbbr();

export const getLocalTimeZone = (): string => {
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  return timeZone;
};

export const convertDatetimeToUTC = (datetime: Date, timeZone: string) => {
  const dateTimeString: string = format(datetime, "yyyy-MM-dd'T'HH:mm:ss");
  const localDatetime: Date = toDate(dateTimeString, { timeZone });
  const utcDateTimeString: string = localDatetime
    .toISOString()
    .replace(".000Z", "");

  return utcDateTimeString;
};

export const parseDate = (datetime: string) => {
  if (datetime === null) {
    return "---";
  }
  const newDate = new Date(datetime);
  const month = newDate.getUTCMonth() + 1;
  const day = newDate.getUTCDate();
  const year = newDate.getUTCFullYear();
  return `${month}-${day}-${year}`;
};

export const timeZone = getLocalTimeZone();
export const timeZoneAbbr = getTimeZoneAbbr(timeZone);

export const getCurrentDateTimeUTC = () => {
  const currentDate = new Date();
  const currentDateTimeUTC = convertDatetimeToUTC(currentDate, timeZone);
  return currentDateTimeUTC;
};
