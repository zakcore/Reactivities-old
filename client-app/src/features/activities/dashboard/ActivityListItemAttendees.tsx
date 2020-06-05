import React from 'react'
import { List, Image, Popup } from 'semantic-ui-react'
import { IAttendees } from '../../../App/models/activity'
interface Iprops{
   Attendees:IAttendees[] 
}
 const ActivityListItemAttendees:React.FC<Iprops> = ({Attendees}) => {
    return (
       <List horizontal>
        {Attendees.map((attende)=>(
            <List.Item key={attende.userName}>
                 
                 

                 <Popup
       
        header={attende.displayName}
        trigger={<Image size='mini' circular src={attende.image ||'/assets/user.png'} avatar />}
      />
                 
            </List.Item>
        )
                )}
       </List>
    )
}
export default ActivityListItemAttendees