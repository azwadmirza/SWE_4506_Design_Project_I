import CustomDateTime from './DateTimeCustom';
const getTimeDifference=Symbol('getTimeDifference');
const getHoursDifference=Symbol('getHoursDifference');
const getMinutesDifference=Symbol('getMinutesDifference');
const getDaysDifference=Symbol('getDaysDifference');
const getWeeksDifference=Symbol('getWeeksDifference');
const getMonthsDifference=Symbol('getMonthsDifference');
const getYearsDifference=Symbol('getYearsDifference');


class TimeElapsed{
  constructor(date){
    this.today = new Date();
    this.date=(new CustomDateTime(date).getDate());
    if (this.date.getTime() === this.today.getTime()) {
      this.timeElapsed="Now";
    } else {
      this.timeElapsed=this[getTimeDifference](this.date,this.today);
    }
  }

  getTimeElapsed(){
    return this.timeElapsed;
  }

  [getTimeDifference](time,currentTime){
    const timeDiffInMins = Math.floor(
      (currentTime.getTime() - time.getTime()) / 60000
    );
    return timeDiffInMins>60?this[getHoursDifference](Math.floor(timeDiffInMins/60)):this[getMinutesDifference](timeDiffInMins);
  }

  [getHoursDifference](hours){
    if(hours>24){
      return "Around "+this[getDaysDifference](Math.floor(hours/24));
    }
    else{
      return hours>1?hours + " hours ago":hours + " hour ago";
    }
  }

  [getMinutesDifference](minutes){
    if(minutes===0){
      return "Now";
    }
    else{
      return minutes>1?minutes.toString() + " mins ago":minutes.toString() + " min ago";
    }
  }

  [getDaysDifference](days){
    if(days>7){
      return this[getWeeksDifference](Math.floor(days/7));
    }
    else{
      return days>1?days.toString() + " days ago":days.toString() + " day ago";
    }

  }

  [getWeeksDifference](weeks){
    if(weeks>4){
      return this[getMonthsDifference](Math.floor(weeks/4));
    }
    else{
      return weeks>1?weeks.toString() + " weeks ago":weeks.toString() + " week ago";
    }
  }

  [getMonthsDifference](months){
    if(months>12){
      return this[getYearsDifference](Math.floor(months/12));
    }
    else{
      return months>1?months.toString() + " months ago":months.toString() + " month ago";
    }
  }

  [getYearsDifference](years){
    return years>1?years.toString() + " years ago":years.toString() + " year ago";
  }
}

export default TimeElapsed;