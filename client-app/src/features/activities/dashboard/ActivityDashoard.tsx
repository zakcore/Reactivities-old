import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import  ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';
import { LoadingComponent } from '../../../App/layout/LoadingComponent';
import { RouteStoreContext } from '../../../App/stores/rootStore';

 const ActivityDashoard: React.FC = () => {
   

  const routestore = useContext(RouteStoreContext)
  const {loadActivities,loadingInitial}=routestore.activityStore;
  useEffect(() => {
    loadActivities();

  },[loadActivities]);


  if (loadingInitial) {return <LoadingComponent content='activities loading......' />;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
     <h1> Activity Filters</h1>
         </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashoard);
