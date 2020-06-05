import React from "react";
import {
  Item,
  Button,
  Segment,
  SegmentGroup,
  Icon,
  ItemGroup,
  Label,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IActivity } from "../../../App/models/activity";
import { format } from "date-fns";
import ActivityListItemAttendees from "./ActivityListItemAttendees";

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
  var  host=activity.atendees.filter(a => a.isHost)[0];
  return (
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
               <Item.Description>{`Hosted by ${host.displayName}`}
               </Item.Description>

             { activity.ishost && 
               <Item.Description>
               <Label basic color='orange' content='You are hosting this event'  />
               </Item.Description>
             

               }
             
  
               
                 {activity.isgoing && !activity.ishost &&(
               <Item.Description>
               <Label basic color='green' content='You are going to this event' />
    
               </Item.Description>)
                 } 
            </Item.Content>
          </Item>
        </ItemGroup>
      </Segment>
      <Segment>
        <Icon color="blue" name="clock" />
        {format(activity.date,'h:mm a')}
        <Icon color="orange" name="marker" />
        {activity.venue},{activity.city}
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendees Attendees={activity.atendees}/>
      </Segment>
      <Segment clearing>
        <span>{activity.description} </span>
        <Button
          as={Link}
          to={`activities/${activity.id}`}
          floated="right"
          content="View"
          color="blue"
        />
      </Segment>
    </SegmentGroup>
  );
};

export default ActivityListItem;
