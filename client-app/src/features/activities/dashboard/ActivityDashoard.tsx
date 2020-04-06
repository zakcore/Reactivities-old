import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import  ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../App/stores/activityStore';
import ActivityForm from '../form/ActivityForm';

 const ActivityDashoard: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { selectedActivity, editMode } = activityStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
      {selectedActivity && !editMode && (
          <ActivityDetails />
        )}  
        {editMode &&(<ActivityForm />)}   
         </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashoard);
