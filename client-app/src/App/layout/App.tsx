import React from 'react';
import axios from 'axios';
import {  Icon, Header, List } from 'semantic-ui-react'


class App extends React.Component {
 
state={
  activities:[]
}
   componentDidMount() {
axios('http://localhost:5000/api/activities')
.then((Response)=>{
  this.setState({activities:Response.data})})
}

  render() {
    return(
      <div>
      <Header as='h2'>
      <Icon name='users' />
      <Header.Content>Reactivities</Header.Content>
    </Header>

      <List>
       {this.state.activities.map((x:any)=>
           <List.Item key={x.id} >{x.title}</List.Item>
       )}
      </List>
        </div>
    )
  }
}
export default App;
