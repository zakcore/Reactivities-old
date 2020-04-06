import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import ActivityStore from '../../App/stores/activityStore'
const  NavBar:React.FC = () => {
  const activityStore=useContext(ActivityStore)
  const {OpenForm}=activityStore;
  return (
    <Menu fixed='top' inverted>
      <Container>
        
        <Menu.Item >
            <img className="logoimg" src="../assets/logo.png" alt=""/>
            Reactivities
        </Menu.Item>

        <Menu.Item name="Activities" />
        <Menu.Item>
            <Button onClick={OpenForm} positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default (NavBar);