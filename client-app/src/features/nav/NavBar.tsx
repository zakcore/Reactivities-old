import React, { useContext }  from "react";
import { Menu, Container, Button, Dropdown,Image } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import { RouteStoreContext } from "../../App/stores/rootStore";
const  NavBar:React.FC = () => {

  const rootstore=useContext(RouteStoreContext);
  const{isLoggedIn,user,logout}=rootstore.userStore;
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

        {user && (
                  <Menu.Item position='right'>
                    <Image avatar spaced='right' src= {user.image||'/assets/user.png' }/>
                    <Dropdown pointing='top left' text={user.displayname}>
                      <Dropdown.Menu>
                        <Dropdown.Item as={Link} to={`/profile/username`} text='My profile' icon='user'/>
                        <Dropdown.Item onClick={logout}  text='Logout' icon='power' />
                      </Dropdown.Menu>
                    </Dropdown>
                  </Menu.Item>



        )}
      </Container>
    </Menu>
  );
};

export default (NavBar);