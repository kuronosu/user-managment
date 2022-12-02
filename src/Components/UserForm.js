import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const FormSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function UserForm({
  id,
  initialValues = {
    firstName: "",
    lastName: "",
    email: "",
  },
}) {
  return (
    <div>
      <h1>User {id && id}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={FormSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="FieldContainer">
              <label className="Field">
                First Name
                <Field
                  name="firstName"
                  placeholder="First name"
                  label="First name"
                />
              </label>
              {errors.firstName && touched.firstName ? (
                <div>{errors.firstName}</div>
              ) : null}
            </div>
            <Field name="lastName" />
            {errors.lastName && touched.lastName ? (
              <div>{errors.lastName}</div>
            ) : null}
            <Field name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
