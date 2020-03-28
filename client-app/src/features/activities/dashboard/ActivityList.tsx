import React from "react";
import { IActivity } from "../../../App/models/activity";
import { Item, Button, Label, Segment } from "semantic-ui-react";
interface Iprops {
  activities: IActivity[];
  SetSelectActivity:(id:string)=>void
  HandleDeleteActivity:(id:string)=>void;

}
export const ActivityList: React.FC<Iprops> = ({activities,SetSelectActivity,HandleDeleteActivity}) => {
  
  return (
    <Segment clearing>
        <Item.Group divided  >
      {activities.map(ac => (
          <Item key={ac.id} >
            <Item.Content>
              <Item.Header as="a">{ac.title}</Item.Header>
              <Item.Meta>{ac.date}</Item.Meta>
              <Item.Description>
                <div>{ac.description}</div>
                <div>
                  {ac.city} {ac.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button onClick={()=> SetSelectActivity(ac.id)} floated="right" content="View" color="blue"></Button>
                <Button onClick={()=> HandleDeleteActivity(ac.id)} floated="right" content="delete" color="red"></Button>
                <Label basic content={ac.category}></Label>
              </Item.Extra>
            </Item.Content>
          </Item>
      ))}
        </Item.Group>
    </Segment>
  );
};
