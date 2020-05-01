export const CombineDateAnTime=(date:Date,time:Date)=>{
const timestring=time.getHours() +':'+time.getMinutes()+':00';
const year=date.getFullYear();
const month=date.getMonth()+1;
const day=date.getDate();
const datestring=`${year}-${month}-${day}`;
return new Date(datestring + ' ' + timestring);
}