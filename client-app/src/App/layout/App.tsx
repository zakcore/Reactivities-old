import { Container } from "semantic-ui-react";
import { IActivity } from "../models/activity";
import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashoard } from "../../features/activities/dashboard/ActivityDashoard";
import agent from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";
// import  ActivitiesAgent   from '../api/agent';
const App = () => {
  const [activities, setactivities] = useState<IActivity[]>([]);
  const [SelectedActivity, SetSelectedActivity] = useState<IActivity | null>(null );
  const [editmode, seteditmode] = useState(false);
  const [loader, setloader] = useState<boolean>(true);
  const [submiting, setsubmiting] = useState<boolean>(false);
  const [target, settarget] = useState<string>('');
  

  const HandleSelected = (id: string) => {
    SetSelectedActivity(activities.filter(a => a.id === id)[0]);
    seteditmode(false);
  };
  useEffect(() => {
    agent.Activities.list()
      .then(response => {
        let activities: IActivity[] = [];
        response.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          activities.push(activity);
        });
        setactivities(response);
      })
      .then(() => setloader(false));

  }, []);
  const ShowFromNavbar = () => {
    SetSelectedActivity(null);
    seteditmode(true);
  };

  const HandleCreateActivity = (activity: IActivity) => {
    setsubmiting(true);
    agent.Activities.create(activity)
      .then(() => {
        setactivities([...activities, activity]);
        SetSelectedActivity(activity);
        seteditmode(false);
      })
      .then(() => setsubmiting(false));
  };
  const HandleEditActivity = (activity: IActivity) => {
    if(activity!==SelectedActivity){


      setsubmiting(true);
      agent.Activities.update(activity).then(() => {
          setactivities([...activities.filter(a => a.id !== activity.id),activity]);
          SetSelectedActivity(activity);
          seteditmode(false);
        })
        .then(() => setsubmiting(false));
    }
  };

  const HandleDeleteActivity = (e:SyntheticEvent<HTMLButtonElement>,id: string) => {
    settarget(e.currentTarget.name)
    setsubmiting(true);
    agent.Activities.delete(id)
      .then(() => {
        
        setactivities([...activities.filter(a => a.id !== id)]);
        if (SelectedActivity?.id === id && id !== null) {
          SetSelectedActivity(null);
          seteditmode(false);
        }
      })
      .then(() => setsubmiting(false));
  };
  if (loader) {
    return <LoadingComponent content="activities loading......" />;
  }
  return (
    <Fragment>
      <NavBar ShowFromNavbar={ShowFromNavbar} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashoard
          activities={activities}
          SetSelectActivity={HandleSelected}
          SelectActivity={SelectedActivity}
          editmode={editmode}
          seteditmode={seteditmode}
          SetSelectedActivity={SetSelectedActivity}
          HandleCreateActivity={HandleCreateActivity}
          HandleEditActivity={HandleEditActivity}
          HandleDeleteActivity={HandleDeleteActivity}
          submiting={submiting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};
export default App;
