import React  from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
const  NavBar:React.FC = () => {
  return (
    <Menu fixed='top' inverted>
      <Container>
        
        <Menu.Item as={NavLink} exact to={'/'} >
            <img className="logoimg" src="../assets/logo.png" alt=""/>
            Reactivities
        </Menu.Item>

        <Menu.Item name="Activities" as={NavLink} to={'/activities'} />
        <Menu.Item>
            <Button as={NavLink} to={'/createactivity'}positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default (NavBar);