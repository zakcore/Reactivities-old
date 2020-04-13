import React from "react";
import {
  Item,
  Button,
  Segment,
  SegmentGroup,
  Icon,
  ItemGroup,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IActivity } from "../../../App/models/activity";
interface prop {
  activity: IActivity;
}
const ActivityListItem: React.FC<prop> = ({ activity }) => {
  return (
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Description>Hosted By Zak</Item.Description>
            </Item.Content>
          </Item>
        </ItemGroup>
      </Segment>
      <Segment>
        <Icon color="blue" name="clock" />
        {activity.date}
        <Icon color="orange" name="marker" />
        {activity.venue},{activity.city}
      </Segment>
      <Segment secondary>attendies will go here</Segment>
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
