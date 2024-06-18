import { Form, Formik } from "formik";
import React, { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import Input from "./Input";
import { UserAccountProviderHOC } from "../HOC&Context/Context";

interface LogInPageProps {
  accountApiCall: (
    data: {
      [key: string]: string;
    },
    type: "signup" | "login"
  ) => void;
}

const LogInPage: React.FC<LogInPageProps> = ({ accountApiCall }) => {

  const [searchParams] = useSearchParams();
  function DataServerSender(value: any) {
    accountApiCall(value, "login");
  }

  const schema = useMemo(() => {
    return Yup.object().shape({
      username: Yup.string().min(8).max(25).required(),
      password: Yup.string().min(8).required(),
    });
  }, []);

  const initialValues = {
    username: "",
    password: "",
  };

  return (
    <div className="flex items-center justify-center h-screen">
      
      <Formik
        initialValues={initialValues}
        onSubmit={DataServerSender}
        validationSchema={schema}
        validateOnMount
      >
        <Form>
          <div className="bg-indigo-950 p-6 rounded-lg flex max-w-96 flex-col gap-4">
            <h2 className="text-xl text-center font-bold text-white opacity-40">
              Welcome back to AnkiEditor
            </h2>

            <Input
              brClass
              id="input1"
              placeholder="unique username"
              type="text"
              name="username"
              label="Username"
              required
            />

            <Input
              brClass
              id="input2"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="your password"
              label="Password"
              required
            />

            <button
              type="submit"
              className="bg-blue-500 text-white rounded-full hover:bg-blue-400 font-bold px-4 py-2 disabled:bg-blue-300 disabled:text-gray-200"
            >
              Log In
            </button>
            <p className="font-bold text-white">
              Don't have an account{" "}
              <Link className="text-blue-600 underline" to={{pathname : "/signup" , search: searchParams.toString()}}>
                Sign Up
              </Link>
            </p>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default UserAccountProviderHOC(LogInPage);
