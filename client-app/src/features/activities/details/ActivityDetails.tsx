import React, { Fragment, useContext } from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../App/stores/activityStore';
 const ActivityDetails:React.FC= () => {
const activityStore=useContext(ActivityStore);
const {selectedActivity,OpenEditForm,CloseDetail}=activityStore;

  return (
    <Fragment >
      <Card fluid>
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
          <Card.Description>
          {selectedActivity!.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <Button.Group widths={2}>
    <Button onClick={OpenEditForm} basic color='blue' content='Edit'/>
    <Button onClick={CloseDetail} basic color='grey' content='Cancel'/>
    
    
  </Button.Group>
        </Card.Content>
      </Card>
    </Fragment>
  );
};
export default observer(ActivityDetails);