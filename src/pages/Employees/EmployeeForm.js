import {
     FormControl,
     FormControlLabel,
     FormLabel,
     Grid,
     makeStyles,
     RadioGroup,
     Radio,
     TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useForm, Form } from "../../Components/useForm";
import Controls from "../../Components/controls/Controls";
import * as employeeService from "../../services/employeeService";

const genderItems = [
     { id: "male", title: "Male" },
     { id: "female", title: "Female" },
     { id: "other", title: "Other" },
];

const initialFvalues = {
     id: 0,
     fullname: "",
     email: "",
     mobile: "",
     city: "",
     gender: "male",
     departmentId: "",
     hireDate: new Date(),
     isPermanent: false,
};

export default function EmployeeForm(props) {
     const { addOrEdit, recordsForEdit } = props;

     const validate = (fieldValues = values) => {
          let temp = { ...errors };
          if ("fullname" in fieldValues)
               temp.fullname = fieldValues.fullname
                    ? ""
                    : "This Field is Required.";
          if ("email" in fieldValues)
               temp.email = /$^|.+@.+..+/.test(fieldValues.email)
                    ? ""
                    : "Email is not Valid.";
          if ("mobile" in fieldValues)
               temp.mobile =
                    fieldValues.mobile.length > 10
                         ? ""
                         : "Minimum of 11 Numbers is Required.";
          if ("departmentId" in fieldValues)
               temp.departmentId =
                    fieldValues.departmentId.length !== 0
                         ? ""
                         : "This Field is Required.";

          setErrors({
               ...temp,
          });

          if (fieldValues === values)
               return Object.values(temp).every((x) => x === "");
     };

     const {
          values,
          setValues,
          errors,
          setErrors,
          handleInputChange,
          resetForm,
     } = useForm(initialFvalues, true, validate);

     const handleSubmit = (e) => {
          e.preventDefault();
          //   if (validate()) window.alert("testing...");
          if (validate()) {
               addOrEdit(values, resetForm);
          }
     };

     useEffect(() => {
          if (recordsForEdit != null)
               setValues({
                    ...recordsForEdit,
               });
     }, [recordsForEdit]);

     return (
          <Form onSubmit={handleSubmit}>
               <Grid container>
                    <Grid Item xs={6}>
                         <Controls.Input
                              label="Full Name"
                              name="fullname"
                              value={values.fullname}
                              onChange={handleInputChange}
                              error={errors.fullname}
                         />
                         <Controls.Input
                              label="Email"
                              name="email"
                              value={values.email}
                              onChange={handleInputChange}
                              error={errors.email}
                         />
                         <Controls.Input
                              label="Mobile"
                              name="mobile"
                              value={values.mobile}
                              onChange={handleInputChange}
                              error={errors.mobile}
                         />
                         <Controls.Input
                              label="City"
                              name="city"
                              value={values.city}
                              onChange={handleInputChange}
                         />
                    </Grid>
                    <Grid Item xs={6}>
                         <Controls.RadioGroup
                              name="gender"
                              label="Gender"
                              value={values.gender}
                              onChange={handleInputChange}
                              items={genderItems}
                         />
                         <Controls.Select
                              name="departmentId"
                              label="Department"
                              value={values.departmentId}
                              onChange={handleInputChange}
                              options={employeeService.getDepartmentCollection()}
                              error={errors.departmentId}
                         />
                         <Controls.DatePicker
                              name="hireDate"
                              label="Hire Date"
                              value={values.hireDate}
                              onChange={handleInputChange}
                         />
                         <Controls.CheckBox
                              name="isPermanent"
                              label="Permanent Employee"
                              value={values.isPermanent}
                              onChange={handleInputChange}
                         />

                         <div>
                              <Controls.Button type="submit" text="Submit" />
                              <Controls.Button
                                   color="default"
                                   text="Reset"
                                   onClick={resetForm}
                              />
                         </div>
                    </Grid>
               </Grid>
          </Form>
     );
}
