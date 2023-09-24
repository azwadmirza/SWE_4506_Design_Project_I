//private
const initMap=Symbol('initMap');
const monthMap=Symbol('monthMap');
const monthNames=Symbol('monthNames');

const leadingZero=Symbol('leadingZero');
const dateString=Symbol('dateString');
const setMonthNames=Symbol('setMonthNames');

const getMeridian=Symbol('getMeridian');
const getHour=Symbol('getHour');

const isDate=Symbol('isDate');

class CustomDateTime {

  constructor(date){
   this[setMonthNames]();
    this[initMap]();
    this[dateString] = date;
  }

  [isDate](input) {
    const timestamp = Date.parse(input);
    return !isNaN(timestamp);
  }

  [getMeridian](hour){
    return hour>=12?"PM":"AM";
  }

  [getHour](hour){
    if (hour >= 12) {
      return hour%12;
    }
    else if(hour===0){
      return hour+12;
    }
    else{
      return hour;
    }
  }

  [setMonthNames](){
    this[monthNames]=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov","Dec"];
  }

  [initMap](){
    this[monthMap] = new Map();
    for(let months=1;months<=12;months++){
      this[monthMap].set(this[monthNames][months-1],this[leadingZero](months).toString());
    }
  }

  [leadingZero](number){
    return number<10?"0"+number:number;
  }

  getDateString(){
    return this[dateString];
  }

  convertTimeTo24(timeString,timeMeridian){
    const timeSplit = timeString.split(":");
    if ((timeSplit[0] !== "12" && timeMeridian === "AM") ||(timeSplit[0] === "12" && timeMeridian === "PM")) {
      
      return this[leadingZero](timeSplit[0])+':'+this[leadingZero](timeSplit[1]);
    } else if (timeSplit[0] === "12" && timeMeridian === "AM") {
      return "00:" + timeSplit[1];
    } else {
      return this[leadingZero](((parseInt(timeSplit[0]) + 12) % 24).toString()) + ":" + timeSplit[1];
    }
  }

  getDate() {
    const dateComponents = this[dateString].split(" ");
    const date = dateComponents[2] + "-" + this[monthMap].get(dateComponents[1]) + "-" + this[leadingZero](dateComponents[0]) + "T" + this.convertTimeTo24(dateComponents[3], dateComponents[4]);
    console.log(date);
    console.log(new Date(date));
    return new Date(date);
  }
}

export default CustomDateTime;


