import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";
configure({'enforceActions':'always'})
class ActivityStore {
  @observable activityRegistry = new Map();
  @observable selectedActivity: IActivity|null= null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";

@computed get ActivitiesByDate (){
return this.GroupActivitiesByDate(Array.from(this.activityRegistry.values()))
}

  GroupActivitiesByDate (activities:IActivity[]){
activities.sort((a,b) => Date.parse(a.date)- Date.parse(b.date));
return Object.entries(activities.reduce( (ac,activity) =>{
const date=activity.date.split('T')[0];
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
        activities.forEach((activity) => {
          activity.date = activity.date.split(".")[0];
          this.activityRegistry.set(activity.id,activity)
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
}catch(e){
console.log(e);
runInAction('update activities err',()=>{
  this.submitting=false;
})

}
}

  @action CreateActivity = async (activity: IActivity) => {
    try {
      this.submitting = true;
      await agent.Activities.create(activity);
      runInAction('create activities',()=>{

        this.activityRegistry.set(activity.id,activity)
        this.selectedActivity=activity;
        this.submitting = false;
       })
     
    } catch (e) {
      console.log(e);
      runInAction('create activities',()=>{
   
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
    let activity=this.steactivity(id);
    if(activity){
      this.selectedActivity=activity;
    }else{
      this.loadingInitial=true;
      try{
        activity=await agent.Activities.details(id)
        runInAction('getting single activity',()=>{
          this.selectedActivity=activity;
          this.loadingInitial=false;
        })
      }catch(e){
        console.log(e);
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
    return (this.activityRegistry.get(id))
  }

 
}


export default createContext(new ActivityStore());
