const checkToday = (date: string) => {
  const now = new Date();
  
  const last = new Date(date);
  last.setHours(last.getHours() - 5);


  const lastDate = last.getDate();
  const nowDate = now.getDate();


  if(lastDate !== nowDate){
    return false
  } else {
    return true
  }



};

const convertDate = (date: string) => {
  const toBeConverted = new Date(date) 
  toBeConverted.setHours(toBeConverted.getHours() - 5);
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
  const now = new Date();
  const nowDate = now.getDate()
  const nowYear = now.getFullYear()
  const nowMonth = now.getMonth()

  


  const getDate = toBeConverted.getDate()
  const getYear = toBeConverted.getFullYear()
  const getMonth = dateMap[toBeConverted.getMonth()]

  if(nowDate + nowMonth + nowYear === getDate + toBeConverted.getMonth() + getYear) {
    return "Today"
  } else {
    return getMonth + " " + getDate + ", " + getYear
  }
}

export const helperFunc = {
  checkToday,
  convertDate
};
