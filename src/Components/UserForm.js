import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import tw from "tailwind-styled-components";
import { useRef, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

const FormSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Demasiado corto")
    .max(50, "Muy largo")
    .required("Campo requerido"),
  lastName: Yup.string()
    .min(2, "Demasiado corto")
    .max(50, "Muy largo")
    .required("Campo requerido"),
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("Campo requerido"),
  phone: Yup.string().required("Campo requerido"),
  description: Yup.string(),
  avatar: Yup.mixed()
    .required("Campo requerido")
    .test("fileSize", "Archivo demasiado grande", (value) => {
      return value && value.size <= 2000000;
    })
    .test("fileFormat", "Solo se admiten imágenes", (value) => {
      return value && value.type.startsWith("image/");
    }),
});

const EmailIcon = () => (
  <svg
    aria-hidden="true"
    className="w-5 h-5 text-gray-500 dark:text-gray-400"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
  </svg>
);

export default function UserForm({
  onSubmit,
  title,
  loading,
  initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    description: "",
    avatar: null,
  },
}) {
  const [submmited, setSubmmited] = useState(false);
  const navigate = useNavigate();

  // const [avatar, setAvatar] = useState(null);

  // const onAvatarChange = (e) => {
  //   let files = e.target.files;
  //   setFieldValue("file", event.currentTarget.files[0]);
  //   setAvatar(files[0]);
  // };

  return (
    <div className="px-8 py-6">
      <h1 className="text-2xl mb-4">{title}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={FormSchema}
        onSubmit={onSubmit}
      >
        {({ errors, setFieldValue, values }) => (
          <Form>
            <div className="flex flex-row items-center mb-5 w-full">
              <label className="font-medium text-white w-1/5 text-lg">
                Nombre
              </label>
              <div className="w-4/5 flex">
                <div className="flex flex-1 flex-col mr-5">
                  <Field
                    required
                    type="text"
                    name="firstName"
                    disabled={loading}
                    className="p-2.5 bg-transparent border-b-2 focus:outline-none  text-white border-neutral-500 focus:border-neutral-200"
                    placeholder="Nombre"
                  />
                  <ErrorSpan>{submmited && errors.firstName}</ErrorSpan>
                </div>
                <div className="flex flex-1 flex-col ml-5">
                  <Field
                    required
                    type="text"
                    name="lastName"
                    disabled={loading}
                    className="p-2.5 bg-transparent border-b-2 focus:outline-none  text-white border-neutral-500 focus:border-neutral-200"
                    placeholder="Apellido"
                  />
                  <ErrorSpan>{submmited && errors.lastName}</ErrorSpan>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center mb-5 w-full">
              <label
                htmlFor="email"
                className="font-medium text-white w-1/5 text-lg"
              >
                Email
              </label>
              <div className="flex flex-1 flex-col w-4/5">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <EmailIcon />
                  </div>
                  <Field
                    required
                    id="email"
                    type="email"
                    name="email"
                    disabled={loading}
                    className="pl-10 p-2.5 bg-transparent w-full border-b-2 focus:outline-none  text-white border-neutral-500 focus:border-neutral-200"
                    placeholder="name@example.com"
                  />
                </div>
                <ErrorSpan>{submmited && errors.email}</ErrorSpan>
              </div>
            </div>
            <div className="flex flex-row items-center mb-5 w-full">
              <label
                className="font-medium text-white w-1/5 text-lg"
                htmlFor="phone"
              >
                Telefono
              </label>
              <div className="w-4/5 flex">
                <div className="flex flex-1 flex-col">
                  <Field
                    required
                    id="phone"
                    type="phone"
                    name="phone"
                    disabled={loading}
                    className="p-2.5 flex-1 bg-transparent border-b-2 focus:outline-none  text-white border-neutral-500 focus:border-neutral-200"
                    placeholder="+54 351 1234567"
                  />
                  <ErrorSpan>{submmited && errors.phone}</ErrorSpan>
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center mb-5 w-full">
              <label className="font-medium text-white w-1/5 text-lg">
                Avatar
              </label>
              <div className="w-4/5 flex">
                <div className="flex flex-1 flex-col">
                  <label className="inline-block py-3 cursor-pointer w-full border-b-2 text-white border-neutral-500 focus:border-neutral-200">
                    <input
                      type="file"
                      accept="image/*"
                      disabled={loading}
                      className="hidden"
                      onChange={(e) => {
                        setFieldValue(
                          "avatar",
                          e.currentTarget.files[0] ?? null
                        );
                      }}
                    />
                    {values.avatar ? values.avatar.name : "Seleccionar archivo"}
                  </label>
                  <ErrorSpan>{submmited && errors.avatar}</ErrorSpan>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center mb-5 w-full">
              <SubmitButton
                onClick={() => setSubmmited(true)}
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <div className="animate-spin rounded-full w-6 h-6 border-b-2" />
                ) : (
                  "Guardar"
                )}
              </SubmitButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

const SubmitButton = tw.button`
font-bold py-2 px-10
rounded inline-flex items-center
text-neutral-300
hover:text-white
border-none 
bg-[#121212] hover:bg-[#2e2e2e]
`;

const ErrorSpan = tw.span`
mt-2 text-sm text-red-600 dark:text-red-500`;
