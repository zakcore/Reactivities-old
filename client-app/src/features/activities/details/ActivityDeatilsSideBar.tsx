import React, { Fragment } from 'react'
import { Segment, List, Item, Label , Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { IAttendees } from '../../../App/models/activity'
import { observer } from 'mobx-react-lite'

interface Iprops{


  atendees:IAttendees[]
}

export const ActivityDeatilsSideBar:React.FC<Iprops> = ({atendees}) => {
    return (
           <Fragment>
             <Segment
               textAlign='center'
               style={{ border: 'none' }}
               attached='top'
               secondary
               inverted
               color='teal'
             >
               {atendees.length}{atendees.length===1? " Person going":"People going"}
             </Segment>
             <Segment attached>
               <List relaxed divided>
                 {atendees.map(atendee =>
                  
                  
                  
                  
                 <Item style={{ position: 'relative' }} key={atendee.userName}>
                   
                     { atendee.isHost && (

                     <Label
                     style={{ position: 'absolute' }}
                     color='orange'
                     ribbon='right'
                   > 
                     Host
                   </Label>)}
                     
                   <Image size='tiny' src={atendee.image||'/assets/user.png'} />
                   <Item.Content verticalAlign='middle'>
                     <Item.Header as='h3'>
                     <Link to={`profile/${atendee.userName}`}>{atendee.displayName}</Link>
                     </Item.Header>
                     <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                   </Item.Content>
                 </Item>
                  )}
               </List>
             </Segment>
           </Fragment>
    )
}
export default observer (ActivityDeatilsSideBar)