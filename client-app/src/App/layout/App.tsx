import React, { Fragment, useContext, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar';
import ActivityDashoard  from '../../features/activities/dashboard/ActivityDashoard';
import {ToastContainer} from 'react-toastify';
import {observer} from 'mobx-react-lite'
import { Route, RouteComponentProps, withRouter, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import NotFound from './NotFound';
import LoginForm from '../../features/user/LoginForm';
import { RouteStoreContext } from '../stores/rootStore';
import { LoadingComponent } from './LoadingComponent';
import ModalContainer from '../common/modals/modalContainer';

const App:React.FC<RouteComponentProps> = ({location}) => {
 const rootcontext=useContext(RouteStoreContext);
 const {setapploaded,token,appLoaded}=rootcontext.commonStore;
 const {getuser}=rootcontext.userStore;

 useEffect(() => {
   if(token){
    getuser().finally(()=>{setapploaded()})

   }else{

    setapploaded();
   }
   
 }, [token,getuser,setapploaded])


  if(!appLoaded){

    return(<LoadingComponent content='application loading'/>)
  }else

  return (
    <Fragment>
      <ModalContainer/>
      <ToastContainer position='bottom-right' />
   <Route exact path='/' component={HomePage} />
   <Route 
   path={'/(.+)'}
   render={()=>(
     <Fragment>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
      <Switch>
   <Route exact path='/activities' component={ActivityDashoard} />
   <Route path='/activities/:id' component={ActivityDetails} />
   <Route key={location.key} path={['/createactivity','/manage/:id']}component={ActivityForm} />
   <Route path='/Login' component={LoginForm} />
   <Route component={NotFound} />
    </Switch>
       </Container>
    </Fragment>
   ) }
    />
    </Fragment>
  );
};
export default withRouter(observer(App));
