import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const initialValues = { username: "", password: "" };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: { username: string; password: string }) => {
    const url = isLogin ? "http://localhost:5000/auth/login" : "http://localhost:5000/auth/register";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Success:", data);
      // Store the access token (optional, based on your requirements)
      localStorage.setItem("access_token", data.access_token);
      // Redirect to chat page
      navigate("/chat");
    } else {
      console.error("Error:", response.statusText);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">{isLogin ? "Sign In" : "Sign Up"}</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {() => (
          <Form className="bg-white p-6 rounded shadow-md">
            <div className="mb-4">
              <label htmlFor="username" className="block mb-1">Username</label>
              <Field type="text" id="username" name="username" className="border border-gray-300 rounded p-2 w-full" />
              <ErrorMessage name="username" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1">Password</label>
              <Field type="password" id="password" name="password" className="border border-gray-300 rounded p-2 w-full" />
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>
            <button type="submit" className="bg-blue-500 text-white rounded p-2">{isLogin ? "Sign In" : "Sign Up"}</button>
            <div className="mt-4">
              <button type="button" className="text-blue-500 underline" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Create an account" : "Already have an account? Sign In"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Auth;
