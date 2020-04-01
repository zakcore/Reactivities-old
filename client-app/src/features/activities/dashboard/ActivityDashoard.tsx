import React, { SyntheticEvent } from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";
import { ActivityList } from "./ActivityList";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";
interface Iprops{ 
activities:IActivity[];
SetSelectActivity:(id:string)=>void;
SelectActivity:IActivity|null;
editmode:boolean;
seteditmode:(editmode:boolean)=>void;
SetSelectedActivity:(activity:IActivity|null)=>void;
HandleCreateActivity:(activity:IActivity)=>void;
HandleEditActivity:(activity:IActivity)=>void;
HandleDeleteActivity:(e:SyntheticEvent<HTMLButtonElement>,id:string)=>void;
target:string;
submiting:boolean;
}
export const ActivityDashoard:React.FC<Iprops> = ({activities,
  SetSelectActivity,
  SelectActivity,
  editmode,
  seteditmode,
  SetSelectedActivity,
  HandleCreateActivity,
  HandleEditActivity,
  HandleDeleteActivity,
  submiting,
  target
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
       <ActivityList activities={activities} 
       SetSelectActivity={SetSelectActivity} 
        HandleDeleteActivity={HandleDeleteActivity}
        submiting={submiting}
        target={target}
  />
      </Grid.Column>
      <Grid.Column width={6}>
     
{  SelectActivity&& !editmode && 
<ActivityDetails key={ SelectActivity?.id||0}
 Activity={SelectActivity}
 seteditmode={seteditmode} 
 SetSelectedActivity={SetSelectedActivity}
 
  />
}    
  { editmode && 
   <ActivityForm 
  seteditmode={seteditmode}
   zctivity={SelectActivity !}
  key={ SelectActivity?.id||0}
  HandleCreateActivity={HandleCreateActivity}
      HandleEditActivity={HandleEditActivity}
      submiting={submiting}


   />}
   

      </Grid.Column>
    </Grid>
  );
};
