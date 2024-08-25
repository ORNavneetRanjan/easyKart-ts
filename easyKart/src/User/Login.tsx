import { FaOpencart } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { FormikProps, withFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Input from "./Input";
import axios from "axios";
import { withAlert, withUser } from "../withProvider";
import { AlertType } from "../Components/Alert";
import { User } from "../Provider/UserProvider";
// Define the type for Formik values
interface FormValues {
  email: string;
  password: string;
}

// Define the types for props including FormikProps
interface LoginProps extends FormikProps<FormValues> {
  setAlert: (alert: AlertType) => void;
  setUser: (user: User) => void;
}

// Define the validation schema
const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).max(12).required(),
});

// Define the initial values
const initialValues: FormValues = {
  email: "",
  password: "",
};

// Function to call login API
function callLoginApi(values: FormValues, bag: { props: LoginProps }) {
  axios
    .post("https://myeasykart.codeyogi.io/login", {
      email: values.email,
      password: values.password,
    })
    .then((response) => {
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      bag.props.setAlert({
        type: "success",
        message: "Logged In Successfully",
      });
      bag.props.setUser(user);
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        bag.props.setAlert({ type: "error", message: "Invalid Credentials" });
      }
    });
}

// The Login component
function Login({
  handleSubmit,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}: LoginProps) {
  return (
    <div className="grow bg-gray-200 flex p-10">
      <div className="bg-sky-500 grow max-w-screen-lg m-auto h-svh flex flex-col gap-10 justify-center items-center">
        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-1 m-auto"
        >
          <FaOpencart className="p-2 text-white self-center h-28 lg:h-44 w-full" />
          <Input
            label={<GoPerson className="h-full text-3xl text-white p-1" />}
            id="email"
            value={values.email || ""}
            error={errors.email}
            touched={touched.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
            name="email"
            placeholder="EMAIL"
            autoComplete="email"
            required
            className=" mt-3 rounded-b-none "
          />
          {errors.email && (
            <p className="text-red-600 mt-0 mb-0">{errors.email}</p>
          )}
          <Input
            label={<CiLock className="h-full text-3xl text-white p-1" />}
            id="password"
            value={values.password || ""}
            error={errors.password}
            touched={touched.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            name="password"
            placeholder="PASSWORD"
            required
            autoComplete="password"
            className=" mb-2 rounded-t-none"
          />
          {errors.password && (
            <p className="text-red-600 mt-0 mb-0">{errors.password}</p>
          )}
          <span className="flex flex-col gap-1">
            <button
              type="submit"
              className="mt-3 text-sky-500 h-11 w-56 lg:w-72 p-2 text-2xl rounded-md shadow-md bg-white"
            >
              LOGIN
            </button>
            <Link to="/forgot-pass" className="text-white text-left self-end">
              Forgot password ?
            </Link>
            <Link to="/signin" className="text-blue-800 text-left self-end">
              New here? Sign In
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

// Wrapping Login component with Formik HOC and Provider HOCs
const FormikLogin = withFormik<LoginProps, FormValues>({
  validationSchema: schema,
  mapPropsToValues: () => initialValues,
  handleSubmit: callLoginApi,
})(Login);

export default withAlert(withUser(FormikLogin));
