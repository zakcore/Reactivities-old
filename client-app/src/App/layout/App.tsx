import React, { useEffect, Fragment, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import ActivityDashoard  from '../../features/activities/dashboard/ActivityDashoard';
import { LoadingComponent } from './LoadingComponent';
import {observer} from 'mobx-react-lite'
import ActivityStore from '../stores/activityStore';

const App = () => {
  const activityStore = useContext(ActivityStore)
  useEffect(() => {
    activityStore.loadActivities();

  },[activityStore]);


  if (activityStore.loadingInitial) {return <LoadingComponent content='activities loading......' />;
  }
  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashoard />
      </Container>
    </Fragment>
  );
};
export default observer(App);
