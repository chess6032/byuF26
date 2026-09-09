const weekdays = {
  mon: 0,
  tue: 1,
  wed: 2,
  thu: 3,
  fri: 4
};

const sat = 5;
const sun = 6;

const daysOfTheWeek = {
  ...weekdays,
  sat,
  sun
};

console.log(daysOfTheWeek.mon); // 0
console.log(daysOfTheWeek.fri); // 4
console.log(daysOfTheWeek.sat); // 5
console.log(daysOfTheWeek.sun); // 6