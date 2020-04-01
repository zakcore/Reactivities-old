import React, { SyntheticEvent, useEffect } from "react";
import { IActivity } from "../../../App/models/activity";
import { Item, Button, Label, Segment, Dimmer, Loader } from "semantic-ui-react";
interface Iprops {
  activities: IActivity[];
  SetSelectActivity:(id:string)=>void
  HandleDeleteActivity:(e:SyntheticEvent<HTMLButtonElement>,id:string)=>void;
  target:string;
  submiting:boolean
}

export const ActivityList: React.FC<Iprops> = ({activities,SetSelectActivity,HandleDeleteActivity,submiting,target}) => {
  useEffect(()=>{


  },[submiting])
  if(submiting){
    return(
      <Segment clearing>
    <Dimmer active inverted>
    <Loader inverted content='Loading' />
  </Dimmer>
  
  <Item.Group  divided  >

          
  {activities.map(ac => (
      <Item  key={ac.id} id={ac.id}  >
        <Item.Content >
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
            <Button name={ac.id} loading={target===ac.id && submiting} onClick={(e)=> HandleDeleteActivity(e,ac.id)}  floated="right" content="delete" color="red"></Button>
            <Label  basic content={ac.category}></Label>
          </Item.Extra>
        </Item.Content>
      </Item>
  ))}
    </Item.Group>
   

</Segment>
  )
  
  }else
  return (
    <Segment clearing>
    
        <Item.Group  divided  >

          
      {activities.map(ac => (
          <Item  key={ac.id} id={ac.id}  >
            <Item.Content >
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
                <Button name={ac.id} loading={target===ac.id && submiting} onClick={(e)=> HandleDeleteActivity(e,ac.id)}  floated="right" content="delete" color="red"></Button>
                <Label  basic content={ac.category}></Label>
              </Item.Extra>
            </Item.Content>
          </Item>
      ))}
        </Item.Group>
       

    </Segment>
  );
};
// 