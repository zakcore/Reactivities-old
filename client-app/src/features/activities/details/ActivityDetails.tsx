import React, { Fragment, useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityStore from "../../../App/stores/activityStore";
import { RouteComponentProps } from "react-router-dom";
import { LoadingComponent } from "../../../App/layout/LoadingComponent";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDeatilsSideBar from "./ActivityDeatilsSideBar";
interface idpara {
  id: string;
}
const ActivityDetails: React.FC<RouteComponentProps<idpara>> = ({ match,history }) => {
  const activityStore = useContext(ActivityStore);
  const {
    selectedActivity,
    LoadActivity,
    loadingInitial,
  } = activityStore;

  useEffect(() => {
    LoadActivity(match.params.id);
  }, [LoadActivity,match.params.id]);

  if (loadingInitial || !selectedActivity) {
    return <LoadingComponent content="activity loading......" />;
  }
  return (
    <Fragment>
      <Grid>
        <Grid.Column width={10}>
          <ActivityDetailsHeader activity={selectedActivity}/>
          <ActivityDetailsInfo activity={selectedActivity}/>
          <ActivityDetailsChat/>
          </Grid.Column>
        <Grid.Column width={6}>
        <ActivityDeatilsSideBar/>
          </Grid.Column>
        </Grid>

    </Fragment>
  );
};
export default observer(ActivityDetails);

/* <Card fluid>
  <Image
    src={`/assets/categoryimages/${selectedActivity!.category}.jpg`}
    wrapped
    ui={false}
  />
  <Card.Content>
    <Card.Header>{selectedActivity!.title}</Card.Header>
    <Card.Meta>
      <span>{selectedActivity!.date}</span>
    </Card.Meta>
    <Card.Description>{selectedActivity!.description}</Card.Description>
  </Card.Content>
  <Card.Content extra>
    <Button.Group widths={2}>
      <Button as={Link} to={`/manage/${selectedActivity.id}`} basic color="blue" content="Edit" />
      <Button onClick={()=>{history.push('/activities')}} basic color="grey" content="Cancel" />
    </Button.Group>
  </Card.Content>
</Card> */