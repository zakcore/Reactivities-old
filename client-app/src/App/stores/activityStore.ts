import { observable, action, computed, runInAction, toJS } from "mobx";
import {  SyntheticEvent } from "react";
import { IActivity,IAttendees } from "../models/activity";
import agent from "../api/agent";
import { history } from "../..";
import { toast } from "react-toastify";
import {RootStore} from "./rootStore"
import { SetActivityProps, SetAtendees } from "../common/Util/Util";

class ActivityStore {

  rootStore:RootStore;
  constructor(rts:RootStore){
    this.rootStore=rts;
  }



  @observable activityRegistry = new Map();
  @observable selectedActivity: IActivity|null= null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable loading = false;
  @observable disabled = false;
  @observable target = "";

@computed get ActivitiesByDate (){
return this.GroupActivitiesByDate(Array.from(this.activityRegistry.values()))
}

  GroupActivitiesByDate (activities:IActivity[]){
activities.sort((a,b) => a.date.getTime()- b.date.getTime());
return Object.entries(activities.reduce( (ac,activity) =>{
const date=activity.date.toISOString().split('T')[0];
if(ac[date]){
ac[date]=[...ac[date],activity]
}else{
  ac[date]=[activity];
}


// ac[date]=ac[date]?[...ac[date],activity]:[activity];
return ac
},{}as {[key:string]:IActivity[]} ))



}
  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction('loading activities',()=>{
        activities.forEach(ac => {
          if(this.rootStore.userStore.user){
            SetActivityProps(ac,this.rootStore.userStore.user)  
          }
           this.activityRegistry.set(ac.id,ac)
          this.loadingInitial = false;
        });
       }
      )
    } catch (err) {
      console.log(err);
      runInAction('loading activities err',()=>{
      this.loadingInitial = false;})
    }
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
   };

  
 
  
   
 
@action EditActivity=async (activity:IActivity)=>{

  this.submitting=true
try{
  await agent.Activities.update(activity)
  runInAction('update activities',()=>{
    this.activityRegistry.set(activity.id,activity)
    this.submitting=false
    this.selectedActivity=activity;
   })
   history.push(`/activities/${activity.id}`)
}
catch(e){
console.log(e.reponse);
toast.error("problem!!!!!!!!!!!!")
runInAction('update activities err',()=>{
  this.submitting=false;
})

}
}

  @action CreateActivity = async (activity: IActivity) => {
    try {
      this.submitting = true;
      await agent.Activities.create(activity);
      const attende=SetAtendees(this.rootStore.userStore.user!)
      attende.isHost=true;
      let attendees:IAttendees[]=[];
      attendees.push(attende);
      activity.atendees=attendees;
      activity.ishost=true;
      runInAction('create activities',()=>{
          
        this.activityRegistry.set(activity.id,activity)
        this.selectedActivity=activity;
        this.submitting = false;
       })
       history.push(`/activities/${activity.id}`);

    } catch (e) {
      console.log(e.reponse);
      runInAction('create activities',()=>{
        toast.error("problem!!!!!!!!!!!!")
          this.submitting = false;
      })
    }
  };

  @action DeleteActivity =async (e:SyntheticEvent<HTMLButtonElement>,id:string)=>{
      this.target=e.currentTarget.name
      this.submitting=true
    try{
      await agent.Activities.delete(id)
      runInAction('delete activities',()=>{
   
         this.activityRegistry.delete(id);
        this.submitting=false;
        this.target=''
      })
    }catch{
      runInAction('delete activities err',()=>{
        this.submitting=false;
        this.target=''
      })
    }

  }

  @action LoadActivity= async (id:string)=>{
    let activity = this.steactivity(id);
    if(activity){
      this.selectedActivity=activity;
            return toJS(activity);

    }
    else{
      this.loadingInitial=true;
      try{
          activity= await agent.Activities.details(id);
        runInAction('getting single activity',()=>{
          SetActivityProps(activity,this.rootStore.userStore.user!)  
          this.selectedActivity=activity;
          this.activityRegistry.set(activity.id,activity)
          this.loadingInitial=false;
        })
        return activity;
      }catch(e){
        console.log(e);
        runInAction('errr',()=>{
          this.loadingInitial=false;
        })

      }
      finally{

        runInAction('errr',()=>{
          this.loadingInitial=false;
        })
      }


    }
  
  }
  @action CleanActivity=()=>{
    this.selectedActivity=null
  }
  @action steactivity=(id:string)=>{
    return this.activityRegistry.get(id)
  }



  @action JoinAtendence= async () =>{

    const atendence = SetAtendees(this.rootStore.userStore.user!)
    this.loading=true;
    this.disabled=true;
    try{
     await  agent.Activities.attend(this.selectedActivity!.id);
     runInAction(()=>{

       if(this.selectedActivity)
       {
         this.selectedActivity.atendees.push(atendence)
         this.activityRegistry.set(this.selectedActivity?.id,this.selectedActivity);
         this.selectedActivity.isgoing = true;
         this.loading=false;
         this.disabled=false;
       }

     })
    }
    catch(error){
    toast.error("problem signing in")
    runInAction(()=>{

      this.loading=false;
      this.disabled=false;
    })

    }

  }
  
  @action CancelAtendence = async()=>{
    const atendence = SetAtendees(this.rootStore.userStore.user!)
    this.loading=true;
    this.disabled=true;
    try {
      await agent.Activities.unattend(this.selectedActivity!.id);
      runInAction(()=>{

        if(this.selectedActivity){
          this.selectedActivity.atendees=this.selectedActivity.atendees.filter(a =>a.userName !== atendence.userName)
          this.activityRegistry.set(this.selectedActivity.id,this.selectedActivity);
          this.selectedActivity.isgoing = false;
          this.loading=false;
          this.disabled=false;
  
        }


      })

    } 
    catch (error) {
      toast.error("problem signing in")
      runInAction(()=>{

        this.loading=false;
        this.disabled=false;
      })
    }



  }
  

 
}


export default  ActivityStore;
// export default createContext(new ActivityStore());
