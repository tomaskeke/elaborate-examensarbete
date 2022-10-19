import React from "react";
import { Controller } from "react-hook-form";
import DateTimePicker from '@react-native-community/datetimepicker';


const CustomDatePicker = ({
    control,
    name,
    mode,
    date
}) => {

return(
<>
<Controller
  control={control}
  name={name}
  render={({ field: { value, onChange, onBlur } }) => (
        <DateTimePicker
        value={date}
        selected={value}
        onChange={onChange}
        mode={mode}
        /> )
      }
/>
</>
)
}

export default CustomDatePicker;