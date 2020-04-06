import React, { useState, FormEvent, useEffect, useContext } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";
import {v4 as uuid} from 'uuid';
import ActivityStore from '../../../App/stores/activityStore'
import { observer } from "mobx-react-lite";

 const ActivityForm: React.FC= () =>
 {
const activityStore=useContext(ActivityStore)
const {selectedActivity,CreateActivity,submitting,CloseForm,EditActivity}=activityStore
  const intializeactivity = () => {
    if (selectedActivity) {
      return selectedActivity;
    } else {
      return {
        id: "",
        title: "",
        description: "",
        category: "",
        date: "",
        city: "",
        venue: ""
      };
    }
   

  };

 
  const [Activity, initactivity] = useState<IActivity>(intializeactivity);
  const [btnst,setbtnst]=useState<boolean>(true);
  const  onchangeeventhandler = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
     initactivity({ ...Activity, [name]: value });

     
      
   };
  
   useEffect(()=>{
    if(JSON.stringify(selectedActivity)!==JSON.stringify(Activity)){
      setbtnst(false)
     
    }else{
      setbtnst(true)
    }


   },[Activity,selectedActivity])

  const onsubmithandler=()=>{

    if(Activity.id.length>0){
      EditActivity(Activity);
    }else{
      CreateActivity({...Activity,id:uuid()})

    }

    
  }
  return (
    
    <Segment>
     
      <Form  onSubmit={onsubmithandler}>
        <Form.Input
          onChange={(e:FormEvent<HTMLInputElement | HTMLTextAreaElement>)=>onchangeeventhandler(e)}
          name="title"
          placeholder="Title"
          value={Activity.title}
        />
        <Form.TextArea
          onChange={onchangeeventhandler}
          name="description"
          rows={2}
          placeholder="Description"
          value={Activity.description}
        />
        <Form.Input
          onChange={onchangeeventhandler}
          name="category"
          placeholder="Category"
          value={Activity.category}
        />
        <Form.Input
          onChange={onchangeeventhandler}
          name="date"
          type="datetime-local"
          placeholder="Date"
          value={Activity.date}
        />
        <Form.Input
          onChange={onchangeeventhandler}
          name="city"
          placeholder="City"
          value={Activity.city}
        />
        <Form.Input
          onChange={onchangeeventhandler}
          name="venue"
          placeholder="Venue"
          value={Activity.venue}
        />
        <Button.Group widths={2}>
      
          <Button disabled={btnst}  onClick={()=>onsubmithandler}
           type="submit" positive content="submit" loading={submitting}/>
          <Button onClick={CloseForm} negative content="Cancel"/>
        </Button.Group>
      </Form>
    </Segment>
  );
};
export default observer(ActivityForm);