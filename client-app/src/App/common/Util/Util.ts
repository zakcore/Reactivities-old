import { IActivity, IAttendees } from "../../models/activity";
import { Iuser } from "../../models/user";

export const CombineDateAnTime=(date:Date,time:Date)=>{
const timestring=time.getHours() +':'+time.getMinutes()+':00';
const year=date.getFullYear();
const month=date.getMonth()+1;
const day=date.getDate();
const datestring=`${year}-${month}-${day}`;
return new Date(datestring + ' ' + timestring);
}


export const SetActivityProps=(activity:IActivity,user:Iuser)=>{

    
    activity.date = new Date(activity.date);
  
    activity.isgoing=activity.atendees.some(a => a.userName === user.username)
    activity.ishost=activity.atendees.some(a => a.userName === user.username && a.isHost)
         
    // console.log(activity.id +"...."+activity.title+"...."+activity.isgoing+"...."+activity.ishost)
}

export const SetAtendees=(user:Iuser):IAttendees => {
    return { 
        displayName:user.displayname,
        userName:user.username,
        image:user.image!,
        isHost:false
    }
}