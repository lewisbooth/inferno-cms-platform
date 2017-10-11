function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function getStartDay(month, year) {
  return new Date(year, month, 0).getDay();
}

function generateMonth(startDay, daysInMonth, selectedDay, endDay) {
  let month = [];
  // Keep track of current day during loops
  let day = 1;
  // Loop through each week
  for (let i = 0; i < daysInMonth + 7; i += 7) {
    const week = [];
    if (i === 0) {
      // If first week, pad the start
      for (let j = 0; j < startDay; j++) {
        week.push(" ");
      }
      // Else push the current day
      for (let j = 0; j < 7 - startDay; j++) {
        week.push(day);
        day++;
      }
    } else {
      for (let j = 0; j < 7; j++) {
        if (day <= daysInMonth) {
          // Push the remaining days
          week.push(day);
        } else {
          // Pad the end of the last week
          week.push(" ");
        }
        day++;
      }
    }
    month.push(week);
  }
  // Trim off the start for current month
  if (selectedDay !== null) {
    month = month
      .map(week => {
        return week.map(day => {
          return day < selectedDay ? " " : day;
        });
      })
      .filter(week => {
        return week.filter(day => {
          return day === " " || day < selectedDay;
        }).length === 7
          ? null
          : week;
      });
  }
  // Trim off the end for next month
  if (endDay !== null) {
    month = month
      .map(week => {
        return week.map(day => {
          return day >= endDay ? " " : day;
        });
      })
      .filter(week => {
        return week.filter(day => {
          return day === " " || day < selectedDay;
        }).length === 7
          ? null
          : week;
      });
  }

  return month;
}

function generateCalendar(date) {
  const calendar = { currentMonth: {}, nextMonth: {} };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const currentDay = date.getDate();
  const currentYear = date.getFullYear();
  const currentMonthIndex = date.getMonth();
  const nextYear = currentMonthIndex === 12 ? currentYear + 1 : currentYear;
  const nextMonthIndex = currentMonthIndex === 12 ? 0 : currentMonthIndex + 1;

  calendar.currentMonth.monthIndex = currentMonthIndex;
  calendar.nextMonth.monthIndex = nextMonthIndex;
  calendar.currentMonth.monthName = months[currentMonthIndex];
  calendar.nextMonth.monthName = months[nextMonthIndex];
  calendar.currentMonth.year = currentYear;
  calendar.nextMonth.year = nextYear;

  const currentMonthDayCount = daysInMonth(currentMonthIndex, currentYear);
  const nextMonthDayCount = daysInMonth(nextMonthIndex, nextYear);

  const currentMonthStartDay = getStartDay(currentMonthIndex, currentYear);
  const nextMonthStartDay = getStartDay(nextMonthIndex, nextYear);

  calendar.currentMonth.grid = generateMonth(
    currentMonthStartDay,
    currentMonthDayCount,
    currentDay,
    null
  );

  calendar.nextMonth.grid = generateMonth(
    nextMonthStartDay,
    nextMonthDayCount,
    null,
    currentDay
  );

  console.log(calendar);

  return calendar;
}

export default generateCalendar;
