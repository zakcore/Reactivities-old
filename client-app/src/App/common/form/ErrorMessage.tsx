import React from "react";
import { AxiosResponse } from "axios";
import { Message } from "semantic-ui-react";

interface Iprops {
  error: AxiosResponse;
  text: string;
}
export const ErrorMessage: React.FC<Iprops> = ({ error, text }) => {
  return (

      <Message error>
          <Message.Header>
              {error.statusText}
          </Message.Header>
          {error.data && Object.keys(error.data.errors).length>0 && 
          (
                
          <Message.List>
                 {Object.values(error.data.errors).flat().map((v,i)=>
                 <Message.Item key={i}>
                        {v}
                 </Message.Item>
                 
                 )}                                           
          </Message.List>
            
          )
          
          }
      </Message>
  )
};
