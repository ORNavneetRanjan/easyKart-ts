import React from "react";
import { FaOpencart } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { TfiEmail } from "react-icons/tfi";
import { CiLock } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { User } from "../Provider/UserProvider";

// Define the shape of the form values
interface SignInFormValues {
  username: string;
  email: string;
  password: string;
  cpassword: string;
}

// Props Type
interface SignInProps {
  setUser: (user: User) => void; // Replace 'any' with the actual user type if available
}

// SignIn component
const SignIn: React.FC<SignInProps> = ({ setUser }) => {
  const navigate = useNavigate();

  const callSignInApi = (
    values: SignInFormValues,
    formikHelpers: FormikHelpers<SignInFormValues>
  ) => {
    axios
      .post("https://myeasykart.codeyogi.io/signup", {
        fullName: values.username,
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        const { user, token } = response.data;
        localStorage.setItem("token", token);
        setUser(user);
        navigate("/"); // Navigate to the desired page after successful sign-in
      })
      .catch((error) => {
        console.error("Signup failed", error);
        formikHelpers.setSubmitting(false); // Stop the form from submitting
      });
  };

  // Validation schema
  const schema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(18, "Password must be at most 18 characters")
      .required("Password is required"),
    cpassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm password is required"),
  });

  // useFormik hook with typed initial values and validation schema
  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    isSubmitting,
  } = useFormik<SignInFormValues>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    onSubmit: callSignInApi,
    validationSchema: schema,
  });

  return (
    <div className="grow bg-gray-200 flex p-10">
      <div className="bg-sky-500 grow max-w-screen-lg m-auto h-svh flex flex-col gap-10 justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="gap-2 flex flex-col justify-center items-center"
        >
          <FaOpencart className="text-white text-7xl lg:text-9xl" />
          <span className="h-11 w-56 lg:w-72 flex border-2 border-solid gap-2">
            <GoPerson className="h-full text-3xl text-white p-1" />
            <input
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              id="username"
              name="username"
              placeholder="USERNAME"
              className="grow text-white bg-transparent p-1 placeholder-white outline-none overflow-scroll"
            />
          </span>
          {touched.username && errors.username && (
            <div className="text-red-600">* {errors.username}</div>
          )}

          <span className="h-11 w-56 lg:w-72 flex border-2 border-solid gap-2">
            <TfiEmail className="h-full text-3xl text-white p-1" />
            <input
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              id="email"
              name="email"
              placeholder="EMAIL"
              className="grow text-white bg-transparent p-1 placeholder-white outline-none overflow-scroll"
            />
          </span>
          {touched.email && errors.email && (
            <div className="text-red-600">* {errors.email}</div>
          )}

          <span className="h-11 w-56 lg:w-72 flex border-2 border-solid gap-2">
            <CiLock className="h-full text-4xl text-white p-1" />
            <input
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              id="password"
              name="password"
              placeholder="PASSWORD"
              className="grow text-white bg-transparent p-1 placeholder-white outline-none overflow-scroll"
            />
          </span>
          {touched.password && errors.password && (
            <div className="text-red-600">* {errors.password}</div>
          )}

          <span className="h-11 w-56 lg:w-72 flex border-2 border-solid gap-2">
            <CiLock className="h-full text-4xl text-white p-1" />
            <input
              value={values.cpassword}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              id="cpassword"
              name="cpassword"
              placeholder="CONFIRM PASSWORD"
              className="grow text-white bg-transparent p-1 placeholder-white outline-none overflow-scroll"
            />
          </span>
          {touched.cpassword && errors.cpassword && (
            <div className="text-red-600">* {errors.cpassword}</div>
          )}

          <button
            type="submit"
            className="bg-white text-sky-500 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="text-white mt-4">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
