import axios from "axios";
import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import React, { useState, useEffect, Fragment } from "react";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashoard } from "../../features/activities/dashboard/ActivityDashoard";

const App = () => {
  const [activities, setactivities] = useState<IActivity[]>([]);
  const [SelectedActivity, SetSelectedActivity] = useState<IActivity|null>(null);
  const HandleSelected=(id:string)=>{
    SetSelectedActivity(activities.filter(a=>a.id===id)[0]);
    seteditmode(false);

  }
  const[editmode,seteditmode]=useState(false);
  useEffect(() => {
    axios.get<IActivity[]>("http://localhost:5000/api/activities").then(response => {
      let activities:IActivity []=[];
      response.data.forEach(activity => {
        activity.date=activity.date.split('.')[0];
        activities.push(activity);
      });
      setactivities(response.data);
    });
  }, []);
  const ShowFromNavbar=()=>{
    SetSelectedActivity(null);
    seteditmode(true);

  }

  const HandleCreateActivity=(activity:IActivity)=>{

    setactivities([...activities,activity]);
    SetSelectedActivity(activity);
    seteditmode(false);
  }
  const HandleEditActivity=(activity:IActivity)=>{
    setactivities([...activities.filter(a=>a.id!==activity.id),activity]);
    SetSelectedActivity(activity);
    seteditmode(false);

  }
  const HandleDeleteActivity=(id:string)=>{
    setactivities([...activities.filter(a=>a.id!==id)]);
    SetSelectedActivity(null);
  }

  return (
    <Fragment>
     <NavBar ShowFromNavbar={ShowFromNavbar} />
     <Container style={{marginTop:'7em'}}>
      <ActivityDashoard activities={activities} 
      SetSelectActivity={HandleSelected} 
      SelectActivity={SelectedActivity}
      editmode={editmode}
      seteditmode={seteditmode}
      SetSelectedActivity={SetSelectedActivity}
      HandleCreateActivity={HandleCreateActivity}
      HandleEditActivity={HandleEditActivity}
      HandleDeleteActivity={HandleDeleteActivity}
       />
      
      </Container>
    </Fragment>
  );
};
export default App;
