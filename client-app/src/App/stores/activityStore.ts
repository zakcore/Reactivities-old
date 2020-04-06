import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";
configure({'enforceActions':'always'})
class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable selectedActivity: IActivity | undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = "";

@computed get ActivitiesByDate (){
return Array.from(this.activityRegistry.values()).sort((a,b) => Date.parse(a.date)- Date.parse(b.date))
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
    this.editMode = false;
  };

  @action OpenForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  };
  @action CloseForm= ()=>{
    this.editMode = false;
  }
  
  @action CloseDetail= ()=>{
    this.selectedActivity = undefined;
  }

@action OpenEditForm=()=>{
this.editMode=true;
}
@action EditActivity=async (activity:IActivity)=>{

try{
  await agent.Activities.update(activity)
  runInAction('update activities',()=>{
    this.submitting=true
    this.submitting=false
    this.activityRegistry.set(activity.id,activity)
    this.selectedActivity=activity;
    this.editMode=false;
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
        this.editMode=false;
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
}

export default createContext(new ActivityStore());
