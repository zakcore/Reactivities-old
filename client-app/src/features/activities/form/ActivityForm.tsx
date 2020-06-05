import React, {
  useState,
  useEffect,
  useContext,
} from "react";
import { Segment, Form, Button, GridColumn, Grid } from "semantic-ui-react";
import {  ActivityFormValues } from "../../../App/models/activity";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import {Form as FinalForm,Field} from 'react-final-form';
import TextInput from "../../../App/common/form/TextInput";
import TextArea from "../../../App/common/form/TextArea";
import SelectInput from "../../../App/common/form/SelectInput";
import { category } from "../../../App/common/options/CategoryOptions";
import DateInput from "../../../App/common/form/DateInput";
import { CombineDateAnTime } from "../../../App/common/Util/Util";
import{combineValidators, isRequired, composeValidators, hasLengthGreaterThan} from 'revalidate';
import { RouteStoreContext } from "../../../App/stores/rootStore";

    const valiator=combineValidators({
    title:isRequired({message:'the title is required'}),
    category:isRequired('Category'),
    description : composeValidators (
      isRequired('description'),
      hasLengthGreaterThan(4)({message:'description needs at least 5 caracthers'}))(),
    city:isRequired('city'),
    venue:isRequired('venue'),
    date:isRequired('date'),
    time:isRequired('time'),
    })
interface idpara {
  id: string;
}
const ActivityForm: React.FC<RouteComponentProps<idpara>> = ({ match,history }) => {
  const rootstore = useContext(RouteStoreContext);
  const {

    CreateActivity,
    submitting,
    EditActivity,
    LoadActivity,
  } = rootstore.activityStore;

  const [loading,setloading]=useState(false);
  const [Activity, initactivity] = useState(new ActivityFormValues());
  //   const[actforbtn,setactforbn]=useState(selectedActivity);
  // const [btnst, setbtnst] = useState<boolean>(true);
  
   useEffect(() => {
     if (match.params.id){
        setloading(true);
        LoadActivity(match.params.id).then(
          activity=>{
              initactivity(new ActivityFormValues(activity)) 
             }).finally(()=>{
          setloading(false);
        })
    }
    
    
  },[LoadActivity,match.params.id]);



  // useEffect(() => {
  //   if (match.params.id) {
  //     setLoading(true);
  //     loadActivity(match.params.id)
  //       .then(activity => {
  //         setActivity(new ActivityFormValues(activity));
  //       })
  //       .finally(() => setLoading(false));
  //   }
  // }, [loadActivity, match.params.id]);






 
  // useEffect(() => {
  //   if(actforbtn!==null && JSON.stringify(actforbtn) === JSON.stringify(Activity)){
  //     setbtnst(true);
  //   } else {
  //     setbtnst(false);
  //   }
 
  // }, [Activity,actforbtn]);


const onSubmitReactForm=(values:any)=>{
const {date,time,...Activity}=values;
Activity.date=CombineDateAnTime(values.date,values.time);
    if (Activity.id) {
      EditActivity(Activity);
    } else {
      CreateActivity({ ...Activity, id: uuid() });
    }
   
}
  // if(loadingInitial){ return (<LoadingComponent content='activity loading......'  />)}
  return (

    <Grid>
    <GridColumn width='10' >

    <Segment clearing>

      <FinalForm validate={valiator} initialValues={Activity} onSubmit={onSubmitReactForm}
       render={({handleSubmit,invalid,pristine})=>
      <Form loading={loading} onSubmit={handleSubmit}>
       <Field
                  name='title'
                  placeholder='Title'
                  value={Activity.title}
                  component={TextInput}
                />
        <Field
          component={TextArea}
          rows='2'
          name="description"
           placeholder="Description"
          value={Activity.description}
        />
         <Field
                  component={SelectInput}
                  options={category}
                  name='category'
                  placeholder='Category'
                  value={Activity.category}
                />


        <Form.Group widths='equal'>
        <Field
          component={DateInput}
          name="date"
          placeholder="Date"
          date={true}
          value={Activity.date}
        />
        <Field
          component={DateInput}
          name="time"
          placeholder="Time"
          time={true}
          value={Activity.time}
        />
        </Form.Group>
        <Field
          component={TextInput}
          name="city"
          placeholder="City"
          value={Activity.city}
        />
        <Field
          component={TextInput}
          name="venue"
          placeholder="Venue"
          value={Activity.venue}
        />
        <Button
          disabled={loading||invalid||pristine}
          onClick={() => handleSubmit}
          type="submit"
          positive
          content="submit"
          loading={submitting}
          floated="right"
        />
        <Button
          onClick={()=>{Activity.id ? history.push(`/activities/${Activity.id}`):history.push('/activities')}}
          floated="right"
           
          content="Cancel"
          disabled={loading}
        />
      </Form>
    }
    
    />
    </Segment>
    </GridColumn>

    </Grid>
   
  );
};
export default observer(ActivityForm);

