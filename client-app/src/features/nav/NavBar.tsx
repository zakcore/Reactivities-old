import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
interface Iprops{
  ShowFromNavbar:()=>void

}
export const NavBar:React.FC <Iprops>= ({ShowFromNavbar}) => {
  return (
    <Menu fixed='top' inverted>
      <Container>
        
        <Menu.Item >
            <img className="logoimg" src="../assets/logo.png" alt=""/>
            Reactivities
        </Menu.Item>

        <Menu.Item name="Activities" />
        <Menu.Item>
            <Button onClick={()=>ShowFromNavbar()} positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
