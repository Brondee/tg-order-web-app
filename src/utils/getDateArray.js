let startDate = new Date();
let endDate = new Date();
endDate.setDate(endDate.getDate() + 29);

const getDateArray = (start, end) => {
  let arr = [];
  let dt = new Date(start);
  let idx = 0;
  while (dt <= end) {
    let isWorking = true;
    if (dt.getDay() === 6 || dt.getDay() === 0) {
      isWorking = false;
    }
    const year = dt.getFullYear();
    const month = String(dt.getMonth() + 1).padStart(2, "0");
    const day = String(dt.getDate()).padStart(2, "0");
    const fullDate = year + "-" + month + "-" + day;
    const weekDay = dt.getDay();
    let date = {
      id: idx,
      date: dt.getDate(),
      fullDate,
      weekDay,
      isWorking,
    };
    arr.push(date);
    dt.setDate(dt.getDate() + 1);
    idx += 1;
  }
  return arr;
};

export const dateArray = getDateArray(startDate, endDate);
