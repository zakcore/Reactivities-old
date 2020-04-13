import React, {useContext, Fragment } from 'react';
import { Item, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../App/stores/activityStore';
import ActivityListItem from './ActivityListItem';

 const ActivityList: React.FC = () => {
const activityStore=useContext(ActivityStore);
const {ActivitiesByDate}=activityStore;
  return (
  <Fragment>
    {
      ActivitiesByDate.map(([group,activity])=>(
        <Fragment key={group}>
        <Label size='large' color='blue'>
        {group}
        </Label>
      
          <Item.Group  divided  >
          {activity.map(ac => (
            <ActivityListItem key={ac.id} activity={ac}/>
        ))}
          </Item.Group>
         
  

      </Fragment>

  ))


    }
    </Fragment >
  
)
}
export default observer(ActivityList)