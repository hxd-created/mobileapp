import moment from 'moment';
require("moment/locale/uk");

export default ({ time }) => {
  return pretiffyTime(time).toLowerCase();
}

const pretiffyTime = (time) => {
  moment.locale('uk');
  const timePublication = moment.unix(time).format();
  const currentTime = moment().format();

  if (moment(currentTime).isAfter(timePublication, 'year')) {
    return moment(timePublication).format('ll');
  } else if (moment(currentTime).diff(timePublication, 'days') > 2) {
    return moment(timePublication).format('Do MMM HH:mm');
  } else if (moment.duration(moment(currentTime).diff(moment(timePublication))).hours() > 2) {
    return moment(timePublication).calendar();
  } else {
    return moment(timePublication).fromNow();
  }
}
