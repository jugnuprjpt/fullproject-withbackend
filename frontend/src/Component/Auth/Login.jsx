import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { ShowErrorToast, ShowSuccessToast } from "../../ToastMeassage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPwd from "./ForgetPwd";
import { API_URL } from "../../config";

const Login = () => {
  const [inputvalue, setInputValue] = useState({ email: "", password: "" });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("authToken");
  if (isAuthenticated) {
    return <Navigate to="/login/navbar" replace />;
  }

  // ---------  Forget pwd   --------- //

  const forgetPwd = () => {
    setOpen(true);
  };

  // ---------  Forget pwd   --------- //

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = {
      email: inputvalue.email,
      password: inputvalue.password,
    };
    try {
      const response = await fetch(`${API_URL}/api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const dataFetch = await response.json();
        const token = dataFetch.data.accessToken;
        const userData = dataFetch.data.user;
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("authToken", token);
        ShowSuccessToast("Login Successfully");

        setTimeout(() => {
          navigate("navbar");
        }, 1000);
      } else {
        ShowErrorToast("User does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <section class="bg-gray-100 min-h-screen flex box-border justify-center items-center">
        <div class="bg-[#dfa674] rounded-2xl flex max-w-3xl p-5 items-center">
          <div class="md:w-1/2 px-8">
            <h2 class="font-bold text-3xl text-[#002D74]">Login</h2>
            <p class="text-sm mt-4 text-[#002D74]">
              If you already a member, easily log in now.
            </p>

            <form class="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                class="p-2 mt-8 rounded-xl border"
                type="email"
                name="email"
                placeholder="Email"
                value={inputvalue.email}
                onChange={handleChange}
              />
              <div class="relative">
                <input
                  class="p-2 rounded-xl border w-full"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={inputvalue.password}
                  onChange={handleChange}
                />
              </div>

              <button
                class="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
                type="submit"
              >
                Login
              </button>
            </form>

            <div
              class="mt-10 text-sm border-b border-gray-500 py-5 playfair tooltip cursor-pointer"
              onClick={forgetPwd}
            >
              Forget password ?
            </div>

            <div class="mt-4 text-sm flex justify-between items-center container-mr">
              <p class="mr-3 md:mr-0 ">If you don't have an account..</p>
              <Link to="register">
                <button class="hover:border register text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300">
                  Register
                </button>
              </Link>
            </div>
          </div>
          <div class="md:block hidden w-1/2">
            <img
              class="rounded-2xl max-h-[1600px]"
              src="https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmcmVzaHxlbnwwfDF8fHwxNzEyMTU4MDk0fDA&ixlib=rb-4.0.3&q=80&w=1080"
              alt="login form image"
            />
          </div>
        </div>
      </section>

      <ForgetPwd open={open} setOpen={setOpen} />
      <ToastContainer />
    </div>
  );
};

export default Login;
