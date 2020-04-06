import React, {useContext } from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../App/stores/activityStore';
 const ActivityList: React.FC = () => {
const activityStore=useContext(ActivityStore);
const {selectActivity,ActivitiesByDate,DeleteActivity,target,submitting}=activityStore;
  return (
    
    <Segment clearing>
        <Item.Group  divided  >
        {ActivitiesByDate.map(ac => (
      <Item  key={ac.id} id={ac.id}  >
        <Item.Content >
          <Item.Header as='a'>{ac.title}</Item.Header>
          <Item.Meta>{ac.date}</Item.Meta>
          <Item.Description>
            <div>{ac.description}</div>
            <div>
              {ac.city} {ac.venue}
            </div>
          </Item.Description>
          <Item.Extra>
            <Button onClick={()=>selectActivity(ac.id)} floated='right' content='View' color='blue'/>
            <Button onClick={(e)=>DeleteActivity(e,ac.id)} loading={target===ac.id && submitting} name={ac.id} floated='right' content='delete' color='red'/>
            <Label  basic content={ac.category}></Label>
          </Item.Extra>
        </Item.Content>
      </Item>
      ))}
        </Item.Group>
       

    </Segment>
  );
};

export default observer(ActivityList);