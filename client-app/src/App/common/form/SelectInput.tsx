import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label, Select } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLSelectElement>,
    FormFieldProps {}

const TextArea: React.FC<IProps> = ({
  input,
 placeholder,
 width,
 options,
  meta:{ touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error}  width={width}>
      <Select  value={input.value} placeholder={placeholder} options={options}
       onChange={(e,data)=>{
            input.onChange(data.value);
      }}/>
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextArea;
