import React, { useContext } from 'react'
import { Segment, Item, Header, Button,Image } from 'semantic-ui-react'
import { IActivity } from '../../../App/models/activity';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { format } from "date-fns";
import { RouteStoreContext } from '../../../App/stores/rootStore';
const activityImageStyle = {
  filter: 'brightness(30%)'
};

const activityImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};
export const ActivityDetailsHeader:React.FC<{activity:IActivity}> = ({activity}) => {
  const rootstore=useContext(RouteStoreContext)
  const {JoinAtendence,CancelAtendence, loading , disabled}=rootstore.activityStore
    return (
         <Segment.Group>
           <Segment basic attached='top' style={{ padding: '0' }}>
             <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />
             <Segment basic style ={activityImageTextStyle}>
               <Item.Group>
                 <Item>
                   <Item.Content>
                     <Header
                       size='huge'
                       content={activity.title}
                       style={{ color: 'white' }}
                     />
                     <p>{format(activity.date,'eeee do MMMM')}</p>
                     <p>
                       Hosted by <strong>Bob</strong>
                     </p>
                   </Item.Content>
                 </Item>
               </Item.Group>
             </Segment>
           </Segment>
           <Segment clearing attached='bottom'>
             {activity.ishost ? (
              <Button as={Link} to={`/manage/${activity.id}`} color='orange' floated='right'> Manage this event </Button>
             ) : activity.isgoing ?
             ( <Button loading={loading} disabled={disabled} onClick={CancelAtendence}> Cancel attendance </Button> ) :

         (<Button loading={loading} disabled={disabled} color='teal' onClick={JoinAtendence}>Join Activity</Button>)
             }

           </Segment>
         </Segment.Group>
    )
}
export default observer(ActivityDetailsHeader)