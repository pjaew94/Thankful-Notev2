const checkToday = async (date: Date) => {
  const n = new Date().toISOString();
  const now = new Date(n);
  const nowDate = now.getDate();
  const nowMonth = now.getMonth(); //It comes in respect to index(starts at 0);
  const nowYear = now.getFullYear();
  const nowHour = now.getHours();
  const nowMin = now.getMinutes();

  const last = new Date(date);
  const lastDate = last.getDate();
  const lastMonth = last.getMonth(); //It comes in respect to index(starts at 0);
  const lastYear = last.getFullYear();
  const lastHour = last.getHours();
  const lastMin = last.getMinutes();

  const MS_PER_DAY = 1000 * 60 * 60 * 24;

  const nowUTC = Date.UTC(nowYear, nowMonth, nowDate, nowHour, nowMin);
  const lastPostUTC = Date.UTC(
    lastYear,
    lastMonth,
    lastDate,
    lastHour,
    lastMin
  );

  const diff = (nowUTC - lastPostUTC) / MS_PER_DAY;

  if (diff > 1) {
    return false;
  } else {
    return true;
  }
};

const convertDate = (date: string) => {
  const toBeConverted = new Date(date) 
  const dateMap: {
    [key: number]: string;
  } = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
  }
  const getDate = toBeConverted.getDate()
  const getYear = toBeConverted.getFullYear()
  const getMonth = dateMap[toBeConverted.getMonth()]

  return getMonth + " " + getDate + ", " + getYear

}

export const helperFunc = {
  checkToday,
  convertDate
};
