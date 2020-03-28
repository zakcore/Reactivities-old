import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../App/models/activity";
import {v4 as uuid} from 'uuid';
interface Iprops {
  seteditmode: (editmode: boolean) => void;
  Activity: IActivity;
HandleCreateActivity:(activity:IActivity)=>void;
HandleEditActivity:(activity:IActivity)=>void;
}
export const ActivityForm: React.FC<Iprops> = ({
  seteditmode,
  Activity: erractivity,
  HandleCreateActivity,
  HandleEditActivity
}) => {
  const intializeactivity = () => {
    if (erractivity) {
      return erractivity;
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
  const onchangeeventhandler = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;

    initactivity({ ...Activity, [name]: value });
  };

  const onsubmithandler=()=>{

    if(Activity.id.length>0){

      HandleEditActivity(Activity);
    }else{
      HandleCreateActivity({...Activity,id:uuid()})

    }

  }
  return (
    <Segment>
      <Form onSubmit={onsubmithandler}>
        <Form.Input
          onChange={onchangeeventhandler}
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
          <Button type="submit" positive content="submit" />
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
