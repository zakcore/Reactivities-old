import React, { Fragment } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";
interface Iprops{

  Activity:IActivity
  seteditmode:(editmode:boolean)=>void
  SetSelectedActivity:(activity:IActivity|null)=>void;
}
export const ActivityDetails:React.FC<Iprops> = ({Activity,seteditmode,SetSelectedActivity}) => {

  return (
    <Fragment >
      <Card fluid>
        <Image
          src={`/assets/categoryimages/${Activity.category}.jpg`}
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>{Activity.title}</Card.Header>
          <Card.Meta>
            <span>{Activity.date}</span>
          </Card.Meta>
          <Card.Description>
          {Activity.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <Button.Group widths={2}>
    <Button onClick={()=>seteditmode(true)} basic color='blue' content='Edit'/>
    <Button onClick={()=>SetSelectedActivity(null)} basic color='grey' content='Cancel'/>
    
    
  </Button.Group>
        </Card.Content>
      </Card>
    </Fragment>
  );
};
