import React, { useState, FormEvent, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";
import {v4 as uuid} from 'uuid';
interface Iprops {
  seteditmode: (editmode: boolean) => void;
  zctivity: IActivity;
HandleCreateActivity:(activity:IActivity)=>void;
HandleEditActivity:(activity:IActivity)=>void;
submiting:boolean;
}

export const ActivityForm: React.FC<Iprops> = ({
  seteditmode,
  zctivity,
  HandleCreateActivity,
  HandleEditActivity,
  submiting,
  
}) => {

  const intializeactivity = () => {
    if (zctivity) {
      return zctivity;
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
    if(JSON.stringify(zctivity)!==JSON.stringify(Activity)){
      setbtnst(false)
     
    }else{
      setbtnst(true)
    }


   },[Activity])
  const onsubmithandler=()=>{

    if(Activity.id.length>0){

      HandleEditActivity(Activity);
      
    }else{
      HandleCreateActivity({...Activity,id:uuid()})

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
      
          <Button disabled={btnst}  onClick={()=>onsubmithandler} type="submit" positive content="submit" loading={submiting}/>
          <Button
         
            onClick={() => seteditmode(false)}
            negative
            content="Cancel"
          />
        </Button.Group>
      </Form>
    </Segment>
  );
};
