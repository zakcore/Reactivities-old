import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import TextInput from "../../App/common/form/TextInput";
import { RouteStoreContext } from "../../App/stores/rootStore";
import { IuserFormValues } from "../../App/models/user";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import { ErrorMessage } from "../../App/common/form/ErrorMessage";


  const RegisterForm = () => {
      const rootcontext=useContext(RouteStoreContext)
      const {register}=rootcontext.userStore;
      const validator=combineValidators({

          DisplayName:isRequired('DisplayName'),
          UserName:isRequired('UserName'),
          Email:isRequired('Email'),
        Password:isRequired('Password')
      })
  return (
    <FinalForm
      onSubmit={(values:IuserFormValues) => {
        
    return  register(values)
        .catch(error=>
         
          
            ({
              
              
                [FORM_ERROR]:error,
               
              
               
              }
              
                
                )
                )
              
              }
            }
                validate={validator}
                
      render={({ handleSubmit,submitting,form,submitError,dirtySinceLastSubmit,pristine,invalid,hasValidationErrors }) => (
   
      
      <Form onSubmit={handleSubmit} error>
        <Header as ='h2' content='Login To Reactivities' color='teal'/>
          <Field name="DisplayName" component={TextInput} placeholder="Display Name" type="text"/>
          <Field name="UserName" component={TextInput} placeholder="User Name" type="text"/>
          <Field name="Email" component={TextInput} placeholder="E-mail" type="email" />
          <Field name="Password" component={TextInput} placeholder="Password" type='password' />
         {submitError && !dirtySinceLastSubmit &&(<ErrorMessage error={submitError} 
         text={JSON.stringify(submitError.data.errors)} />)}

          <Button disabled={invalid &&hasValidationErrors && !dirtySinceLastSubmit||pristine} color='teal' fluid
           content='Register' loading={submitting}  />
                      <pre>{JSON.stringify(form.getState(),null,2)} </pre>

        </Form>
      )}
    />
  );
};
export default RegisterForm;
