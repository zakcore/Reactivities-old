import React from 'react';
import './App.css';
import axios from 'axios';
import {  Icon, Header, List } from 'semantic-ui-react'


class App extends React.Component {
 
state={
  values:[]
}
   componentDidMount() {
axios('http://localhost:5000/api/values')
.then((Response)=>{
  this.setState({values:Response.data})})
}

  render() {
    return(
      <div>
      <Header as='h2'>
      <Icon name='users' />
      <Header.Content>Reactivities</Header.Content>
    </Header>

      <List>
       {this.state.values.map((x:any)=>
           <List.Item key={x.id} >{x.name}</List.Item>
       )}
      </List>
        </div>
    )
  }
}
export default App;
