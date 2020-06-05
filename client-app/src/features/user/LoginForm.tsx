import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import TextInput from "../../App/common/form/TextInput";
import { RouteStoreContext } from "../../App/stores/rootStore";
import { IuserFormValues } from "../../App/models/user";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import { ErrorMessage } from "../../App/common/form/ErrorMessage";


  const LoginForm = () => {
      const rootcontext=useContext(RouteStoreContext)
      const {login}=rootcontext.userStore;
      const validator=combineValidators({

        email:isRequired('email'),
        password:isRequired('password')

      })
  return (
    <FinalForm
      onSubmit={(values:IuserFormValues) => {


      
        
    return  login(values)
        .catch(error=>
         
          
            ({
              
              
                [FORM_ERROR]:error,
               
              
               
              }
              
                
                )
                )
              
              }
            }
                validate={validator}
                
      render={({ handleSubmit,submitting,submitError,dirtySinceLastSubmit,pristine,invalid,hasValidationErrors }) => (
   
      
      <Form onSubmit={handleSubmit} error>
        <Header as ='h2' content='Login To Reactivities' color='teal'/>
          <Field name="email" component={TextInput} placeholder="email" />
          <Field name="password" component={TextInput} placeholder="Password" type='password' />
         {submitError && !dirtySinceLastSubmit && (<ErrorMessage error={submitError} text='Invalid Email Or Password' />)}

          <Button disabled={invalid && hasValidationErrors && !dirtySinceLastSubmit || pristine} color='teal' fluid
           content='Login' loading={submitting}  />
        </Form>
      )}
    />
  );
};
export default LoginForm;
