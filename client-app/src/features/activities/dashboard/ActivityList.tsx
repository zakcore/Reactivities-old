import React, {useContext, Fragment } from 'react';
import { Item, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityListItem from './ActivityListItem';
import { RouteStoreContext } from '../../../App/stores/rootStore';

 const ActivityList: React.FC = () => {
  const routestore = useContext(RouteStoreContext)
const {ActivitiesByDate}=routestore.activityStore;
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