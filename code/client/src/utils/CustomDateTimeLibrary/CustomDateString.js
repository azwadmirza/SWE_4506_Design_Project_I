const dateString=Symbol('dateString');
const monthNames=Symbol('monthNames');
const getMeridian=Symbol('getMeridian');
const getHour=Symbol('getHour');
const leadingZero=Symbol('leadingZero');

class CustomDateString{
  constructor(date){
    this[monthNames]=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov","Dec"];
    this[dateString]=`${date.getDate()} ${this[monthNames][date.getMonth()]} ${date.getFullYear()} ${this[getHour](date.getHours())}:${this[leadingZero](date.getMinutes())} ${this[getMeridian](date.getHours())}`;
  }

  [leadingZero](number){
    return number<10?"0"+number:number;
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

  getDateString(){
    return this[dateString];
  }

}

export default CustomDateString;